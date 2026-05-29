import Link from "next/link";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Preview } from "@/components/landing/preview";
import { Cta } from "@/components/landing/cta";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== LANDING NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 md:px-8 glass bg-background/50 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm">
            CI
          </div>
          <span className="text-lg font-bold gradient-text">CatatItu</span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl gradient-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            Daftar Gratis
          </Link>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1">
        <Hero />
        <Features />
        <Preview />
        <Cta />
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-border py-8 px-4 md:px-8 bg-card">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs">
              CI
            </div>
            <span className="text-sm font-semibold gradient-text">CatatItu</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privasi</Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 CatatItu. Dibuat untuk mahasiswa Indonesia.
          </p>
        </div>
      </footer>
    </div>
  );
}
