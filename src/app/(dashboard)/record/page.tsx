import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rekam Audio",
};

export default function RecordPage() {
  return (
    <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out]">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Rekam Audio 🎙️
        </h1>
        <p className="text-[var(--color-muted-foreground)] mt-1">
          Rekam suara kuliah langsung dari browser kamu.
        </p>
      </div>

      {/* Recording Area - Placeholder */}
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-red-500/30 hover:scale-105 transition-transform cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
        </div>
        <h3 className="text-lg font-semibold">Klik untuk Mulai Merekam</h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-2 max-w-md">
          Fitur perekaman akan tersedia di Phase 5. Timer, waveform, dan kontrol pause/resume akan ditampilkan di sini.
        </p>
      </div>
    </div>
  );
}
