import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out]">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Selamat Datang! 👋
        </h1>
        <p className="text-[var(--color-muted-foreground)] mt-1">
          Mulai rekam atau upload audio untuk membuat catatan kuliah otomatis.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Total Catatan",
            value: "0",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
            ),
            color: "from-indigo-500 to-purple-500",
          },
          {
            label: "Durasi Audio",
            value: "0 menit",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            ),
            color: "from-cyan-500 to-blue-500",
          },
          {
            label: "Mata Kuliah",
            value: "0",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /></svg>
            ),
            color: "from-pink-500 to-rose-500",
          },
          {
            label: "Quiz Dibuat",
            value: "0",
            icon: (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
            ),
            color: "from-amber-500 to-orange-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-card p-5 group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[var(--color-muted-foreground)]">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg opacity-80 group-hover:opacity-100 transition-opacity`}
              >
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Record Card */}
        <button className="glass-card p-6 text-left group cursor-pointer hover:border-indigo-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Mulai Rekam</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-0.5">
                Rekam audio langsung dari browser
              </p>
            </div>
          </div>
        </button>

        {/* Upload Card */}
        <button className="glass-card p-6 text-left group cursor-pointer hover:border-cyan-500/30 transition-all">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Upload Audio</h3>
              <p className="text-sm text-[var(--color-muted-foreground)] mt-0.5">
                Upload file MP3, WAV, atau M4A
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Notes (Empty State) */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Catatan Terbaru</h2>
        <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[var(--color-muted)] flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-muted-foreground)]"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" /></svg>
          </div>
          <h3 className="font-semibold text-lg">Belum ada catatan</h3>
          <p className="text-sm text-[var(--color-muted-foreground)] mt-1 max-w-sm">
            Mulai dengan merekam audio atau upload file rekaman kuliah kamu untuk membuat catatan otomatis.
          </p>
        </div>
      </div>
    </div>
  );
}
