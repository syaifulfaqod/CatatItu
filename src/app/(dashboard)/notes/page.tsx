import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catatan Saya",
};

export default function NotesPage() {
  return (
    <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Catatan Saya 📝
          </h1>
          <p className="text-[var(--color-muted-foreground)] mt-1">
            Kelola semua catatan kuliah kamu.
          </p>
        </div>
      </div>

      {/* Search & Filter - Placeholder */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="Cari catatan..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white/5 text-sm placeholder:text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent transition-all"
          />
        </div>
        <select className="px-4 py-2.5 rounded-xl border border-[var(--color-border)] bg-white/5 text-sm text-[var(--color-muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-ring)] focus:border-transparent transition-all">
          <option value="">Semua Mata Kuliah</option>
        </select>
      </div>

      {/* Empty State */}
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--color-muted)] flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-muted-foreground)]"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
        </div>
        <h3 className="font-semibold text-lg">Belum ada catatan</h3>
        <p className="text-sm text-[var(--color-muted-foreground)] mt-1 max-w-sm">
          Catatan yang sudah dibuat akan muncul di sini. Mulai dengan merekam atau upload audio.
        </p>
      </div>
    </div>
  );
}
