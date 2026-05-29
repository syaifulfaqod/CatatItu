import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent opacity-50" />
          
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Siap Mengubah Cara Anda Belajar?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Bergabunglah dengan mahasiswa lainnya yang telah menghemat puluhan jam setiap minggunya berkat AI.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full shadow-lg glow-primary" asChild>
                <Link href="/app">
                  Buka Workspace Sekarang
                </Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Tidak perlu kartu kredit. Mulai dengan paket gratis kami.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
