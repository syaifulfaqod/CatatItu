"use client";

import { useState, useRef, useEffect } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const CHUNK_DURATION_MS = 3 * 60 * 1000; // 3 menit

export default function AppWorkspace() {
  const [isRecording, setIsRecording] = useState(false);
  const [status, setStatus] = useState<"IDLE" | "RECORDING" | "PROCESSING" | "DONE">("IDLE");
  const [noteId, setNoteId] = useState<string | null>(null);
  const [finalNote, setFinalNote] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [chunkCount, setChunkCount] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunkTimerRef = useRef<NodeJS.Timeout | null>(null);
  const markdownRef = useRef<HTMLDivElement>(null);

  const initNote = async () => {
    try {
      const res = await fetch("/api/notes/create", { method: "POST" });
      const json = await res.json();
      
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Gagal inisialisasi catatan dari server");
      }
      
      return json.data.id;
    } catch (error) {
      console.error("Failed to init note:", error);
      return null;
    }
  };

  const startRecording = async () => {
    setErrorMsg(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const newNoteId = await initNote();
      if (!newNoteId) {
        setErrorMsg("Gagal membuat sesi catatan.");
        return;
      }
      setNoteId(newNoteId);
      setChunkCount(0);
      setIsRecording(true);
      setStatus("RECORDING");

      startChunkRecorder(stream, newNoteId);
    } catch (err) {
      console.error(err);
      setErrorMsg("Tidak dapat mengakses mikrofon.");
    }
  };

  const startChunkRecorder = (stream: MediaStream, currentNoteId: string) => {
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    const chunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(chunks, { type: "audio/webm" });
      await sendChunkToBackend(audioBlob, currentNoteId);
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;

    chunkTimerRef.current = setTimeout(() => {
      if (mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        setChunkCount((prev) => prev + 1);
        startChunkRecorder(stream, currentNoteId);
      }
    }, CHUNK_DURATION_MS);
  };

  const sendChunkToBackend = async (audioBlob: Blob, targetNoteId: string) => {
    const formData = new FormData();
    const audioFile = new File([audioBlob], `chunk-${Date.now()}.webm`, { type: 'audio/webm' });
    formData.append("file", audioFile);
    formData.append("noteId", targetNoteId);

    try {
      const res = await fetch("/api/transcribe-chunk", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Transkripsi gagal di backend");
      }
    } catch (err) {
      console.error("Gagal mengirim chunk:", err);
      // We don't throw UI error here so recording doesn't fully break if one chunk drops, 
      // but in production we might want to retry.
    }
  };

  const stopRecording = async () => {
    if (chunkTimerRef.current) clearTimeout(chunkTimerRef.current);

    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    setIsRecording(false);
    setStatus("PROCESSING");

    // Wait slightly to ensure last chunk is processed
    setTimeout(async () => {
      await finalizeNote(noteId!);
    }, 5000);
  };

  const finalizeNote = async (id: string) => {
    try {
      const res = await fetch("/api/format-note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ noteId: id }),
      });
      
      const json = await res.json();
      if (json.success) {
        setFinalNote(json.data);
        setStatus("DONE");
      } else {
        setErrorMsg("AI gagal merapikan catatan. Mungkin transkrip kosong atau server sibuk.");
        setStatus("IDLE");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Terjadi kesalahan jaringan saat format AI.");
      setStatus("IDLE");
    }
  };

  // -------------------------
  // EXPORT FUNCTIONS
  // -------------------------
  
  const handleExportPDF = async () => {
    if (!markdownRef.current || !finalNote) return;
    setIsExporting(true);
    try {
      // Dynamically import to prevent window SSR issues
      const html2pdf = (await import("html2pdf.js")).default;
      const element = markdownRef.current;
      const opt = {
        margin:       15,
        filename:     `${finalNote.title.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      await html2pdf().from(element).set(opt).save();
    } catch (err) {
      console.error("PDF Export error:", err);
      alert("Gagal mengekspor PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportDOCX = async () => {
    if (!markdownRef.current || !finalNote) return;
    setIsExporting(true);
    try {
      // Get raw HTML from the rendered markdown ref
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body>
          <h1>${finalNote.title}</h1>
          ${markdownRef.current.innerHTML}
        </body>
        </html>
      `;

      const res = await fetch("/api/export-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: htmlContent, title: finalNote.title }),
      });

      if (!res.ok) throw new Error("Gagal generate DOCX");

      // Download Blob
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${finalNote.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      console.error("DOCX Export error:", err);
      alert("Gagal mengekspor DOCX.");
    } finally {
      setIsExporting(false);
    }
  };

  useEffect(() => {
    return () => {
      if (chunkTimerRef.current) clearTimeout(chunkTimerRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-16 border-b border-border glass px-6 flex items-center justify-between shrink-0 z-10 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs shadow-lg shadow-indigo-500/20">
            CI
          </div>
          <span className="font-semibold text-lg tracking-tight">CatatItu Workspace</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Panel: Audio Input */}
        <section className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-border p-6 flex flex-col items-center justify-center bg-card/30">
          <div className="text-center space-y-6 max-w-sm w-full">
            <div>
              <h2 className="text-2xl font-bold mb-2">Input Audio</h2>
              <p className="text-sm text-muted-foreground">
                Rekam audio kuliah. Sistem akan otomatis memproses setiap {CHUNK_DURATION_MS / 60000} menit.
              </p>
            </div>

            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-medium animate-in slide-in-from-top-4">
                {errorMsg}
              </div>
            )}

            {status === "IDLE" || status === "RECORDING" ? (
              <div className="glass-card p-8 space-y-8 animate-[scale-in_0.3s_ease-out]">
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  className={`relative flex items-center justify-center w-32 h-32 mx-auto rounded-full transition-all duration-300 ${
                    isRecording 
                      ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 scale-105" 
                      : "bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 shadow-xl shadow-indigo-500/10"
                  }`}
                >
                  {isRecording && (
                    <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-40" />
                  )}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill={isRecording ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={isRecording ? "animate-pulse" : ""}
                  >
                    {isRecording ? (
                      <rect width="12" height="12" x="6" y="6" rx="2" />
                    ) : (
                      <>
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </>
                    )}
                  </svg>
                </button>
                <div className="text-sm font-medium">
                  {isRecording ? (
                    <div className="flex flex-col items-center gap-2 text-red-500">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> Sedang Merekam
                      </span>
                      <span className="text-xs text-muted-foreground font-normal px-3 py-1 bg-secondary rounded-full">
                        AI Chunks: {chunkCount}
                      </span>
                    </div>
                  ) : "Klik untuk Merekam"}
                </div>
              </div>
            ) : status === "PROCESSING" ? (
              <div className="glass-card p-12 flex flex-col items-center justify-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="relative flex items-center justify-center w-24 h-24">
                  <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin-slow" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-pulse"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">Menyusun Catatan...</h3>
                  <p className="text-sm text-muted-foreground">
                    Memanggil keajaiban AI GPT-4o-mini.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        {/* Right Panel: Output Note */}
        <section className="flex-1 bg-card overflow-y-auto p-6 md:p-10 relative">
          
          {status === "PROCESSING" && (
            <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
              <div className="h-10 w-2/3 bg-muted rounded-xl skeleton" />
              <div className="h-4 w-1/3 bg-muted rounded-md skeleton" />
              <div className="pt-8 space-y-4">
                <div className="h-6 w-1/4 bg-muted rounded-md skeleton" />
                <div className="h-4 w-full bg-muted rounded-md skeleton" />
                <div className="h-4 w-5/6 bg-muted rounded-md skeleton" />
                <div className="h-4 w-4/6 bg-muted rounded-md skeleton" />
              </div>
              <div className="pt-6 space-y-4">
                <div className="h-6 w-1/3 bg-muted rounded-md skeleton" />
                <div className="h-4 w-full bg-muted rounded-md skeleton" />
                <div className="h-4 w-full bg-muted rounded-md skeleton" />
              </div>
            </div>
          )}

          {status === "DONE" && finalNote && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 fade-in duration-700">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-border pb-6 sticky top-0 bg-card/80 backdrop-blur-md z-10 pt-2 -mt-2">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">{finalNote.title}</h1>
                  <p className="text-muted-foreground mt-1 text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Diproses sukses oleh CatatItu AI
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button 
                    onClick={handleExportPDF}
                    disabled={isExporting}
                    className="px-4 py-2.5 text-sm font-semibold rounded-xl border border-border hover:bg-secondary transition-colors flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 18v-6"/><path d="M10 12h2.5a1.5 1.5 0 0 1 0 3H10"/></svg>
                    Simpan PDF
                  </button>
                  <button 
                    onClick={handleExportDOCX}
                    disabled={isExporting}
                    className="px-4 py-2.5 text-sm font-semibold rounded-xl gradient-bg text-white hover:opacity-90 transition-opacity shadow-md flex items-center gap-2 disabled:opacity-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 18v-6"/><path d="M10 12h3"/><path d="M10 18h3"/></svg>
                    Unduh DOCX
                  </button>
                </div>
              </div>

              {/* RENDER MARKDOWN WITH TYPOGRAPHY (Prose) */}
              <div 
                ref={markdownRef}
                className="prose prose-slate dark:prose-invert prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-a:text-primary hover:prose-a:text-primary/80 prose-li:marker:text-primary prose-blockquote:border-l-primary prose-img:rounded-xl max-w-none"
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {finalNote.formattedNote}
                </ReactMarkdown>
              </div>
              
              <div className="pt-10 border-t border-border mt-10">
                <button onClick={() => {
                  setStatus("IDLE");
                  setFinalNote(null);
                  setNoteId(null);
                  setChunkCount(0);
                }} className="text-sm text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
                  Buat Catatan Kuliah Baru
                </button>
              </div>
            </div>
          )}

          {status === "IDLE" && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40 pointer-events-none select-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <h2 className="text-xl font-bold">Area Catatan Kosong</h2>
              <p className="mt-2 text-sm max-w-xs">Catatan hasil olahan AI akan dirender dengan rapi di sini setelah proses selesai.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
