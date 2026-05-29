export default function NoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="space-y-6 animate-[fade-in-up_0.5s_ease-out]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Detail Catatan</h1>
        <p className="text-[var(--color-muted-foreground)] mt-1">
          Editor catatan akan tersedia di Phase 7.
        </p>
      </div>
      <div className="glass-card p-8 text-center text-[var(--color-muted-foreground)]">
        TipTap editor dan AI tools akan diimplementasikan di sini.
      </div>
    </div>
  );
}
