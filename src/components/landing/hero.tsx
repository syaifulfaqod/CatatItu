import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
      
      <div className="container px-4 mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            V1.0 Sekarang Tersedia
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-foreground">
            Ubah Kuliah Jadi <br className="hidden sm:block" />
            <span className="gradient-text">Catatan Sempurna.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Fokus mendengarkan dosen, biarkan AI yang mencatat. Rekam suara, dapatkan transkrip akurat, dan nikmati ringkasan materi yang rapi secara otomatis.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 rounded-full shadow-lg glow-primary group" asChild>
              <Link href="/app">
                Buka Workspace
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="pt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <span>Rekaman Akurat</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/20 text-[10px] text-primary font-bold">AI</span>
              <span>Ringkasan Cerdas</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
