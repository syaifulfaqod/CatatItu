import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

const SYSTEM_PROMPT = `Anda adalah asisten AI profesional untuk mencatat materi kuliah ("AI Lecture Note Generator"). 
Tugas Anda adalah menerima transkrip mentah dari rekaman dosen dan mengubahnya menjadi catatan kuliah yang sangat rapi, terstruktur, dan komprehensif dalam format Markdown.

Gunakan format struktur berikut:
# [Judul Materi yang Relevan]

## Ringkasan Eksekutif
(Satu atau dua paragraf singkat yang merangkum keseluruhan inti kuliah)

## Poin Penting (Key Takeaways)
- (Gunakan bullet points untuk hal-hal krusial)
- (Minimal 3 poin)

## Catatan Detail
(Bagi menjadi sub-heading "###" yang logis berdasarkan topik-topik yang dibahas dalam transkrip)
(Gunakan paragraf, bold, italic, dan bullet points secukupnya agar mudah dibaca)

## Daftar Istilah (Glosarium)
(Jika ada istilah teknis yang disebutkan, tuliskan beserta definisinya secara singkat)

Pastikan output HANYA berisi Markdown murni, tanpa ada teks intro/outro dari AI. Gunakan Bahasa Indonesia yang baku dan akademis namun mudah dipahami.
Jika transkrip terlihat terpotong atau tidak nyambung (karena hasil speech-to-text), cobalah untuk memperbaiki konteksnya secara logis tanpa menambahkan informasi palsu (hallucination).`;

export async function POST(request: Request) {
  try {
    const { noteId } = await request.json();

    if (!noteId) {
      return NextResponse.json(
        { success: false, error: "Missing noteId" },
        { status: 400 }
      );
    }

    // Ambil full transcript dari database
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note || !note.transcript) {
      return NextResponse.json(
        { success: false, error: "Note not found or empty transcript" },
        { status: 404 }
      );
    }

    // Update status to FORMATTING
    await prisma.note.update({
      where: { id: noteId },
      data: { status: "FORMATTING" },
    });

    // Panggil GPT-4o-mini
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `Berikut adalah transkrip kuliahnya:\n\n${note.transcript}` }
      ],
      temperature: 0.3, // Rendah agar lebih faktual dan tidak berhalusinasi
    });

    const formattedNote = completion.choices[0].message.content || "";

    // Simpan hasil formatting ke database
    const finalNote = await prisma.note.update({
      where: { id: noteId },
      data: {
        formattedNote: formattedNote,
        status: "COMPLETED",
      },
    });

    return NextResponse.json({ success: true, data: finalNote });
  } catch (error: any) {
    console.error("Error formatting note:", error);
    
    // Fallback status if failed
    try {
      const { noteId } = await request.json().catch(() => ({}));
      if (noteId) {
        await prisma.note.update({
          where: { id: noteId },
          data: { status: "FAILED" },
        });
      }
    } catch (e) {}

    return NextResponse.json(
      { success: false, error: "Failed to format note" },
      { status: 500 }
    );
  }
}
