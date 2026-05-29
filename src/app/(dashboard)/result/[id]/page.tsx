export default function ResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hasil Proses AI ✨</h1>
        <p className="text-[var(--color-muted-foreground)] mt-1">
          Hasil transkripsi dan catatan AI akan ditampilkan di sini.
        </p>
      </div>
      <div className="glass-card p-8 text-center text-[var(--color-muted-foreground)]">
        Hasil transkripsi, catatan terstruktur, ringkasan, dan tombol download akan diimplementasikan di Phase 6-8.
      </div>
    </div>
  );
}
