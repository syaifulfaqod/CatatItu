import Image from "next/image";

export function Preview() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-secondary/30 rounded-full blur-[100px] -z-10" />
      
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Desain Simpel, Hasil Maksimal
          </h2>
          <p className="text-lg text-muted-foreground">
            Antarmuka yang bersih dan intuitif, dirancang agar Anda bisa fokus pada belajar, bukan pada cara menggunakan aplikasinya.
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Dashboard Preview Mockup */}
          <div className="relative rounded-2xl border border-border bg-card/50 shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Window header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="mx-auto text-xs text-muted-foreground font-medium">app.catatitu.id</div>
            </div>
            
            {/* Inner Content Mockup */}
            <div className="p-6 md:p-8 bg-card flex flex-col md:flex-row gap-6">
              {/* Sidebar Mockup */}
              <div className="hidden md:flex flex-col w-48 shrink-0 gap-4">
                <div className="h-8 w-24 bg-primary/20 rounded skeleton mb-4" />
                <div className="h-8 w-full bg-muted rounded skeleton" />
                <div className="h-8 w-full bg-muted/50 rounded skeleton" />
                <div className="h-8 w-full bg-muted/50 rounded skeleton" />
              </div>
              
              {/* Main Content Mockup */}
              <div className="flex-1 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-8 w-48 bg-muted rounded skeleton mb-2" />
                    <div className="h-4 w-32 bg-muted/50 rounded skeleton" />
                  </div>
                  <div className="h-10 w-24 bg-primary/80 rounded-lg skeleton" />
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-muted/30 rounded-xl border border-border p-4 flex flex-col justify-between">
                      <div className="h-4 w-12 bg-muted rounded skeleton" />
                      <div className="h-6 w-20 bg-muted/80 rounded skeleton" />
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-4">
                  <div className="h-6 w-32 bg-muted rounded skeleton mb-4" />
                  <div className="h-16 bg-muted/20 rounded-xl border border-border" />
                  <div className="h-16 bg-muted/20 rounded-xl border border-border" />
                  <div className="h-16 bg-muted/20 rounded-xl border border-border" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative gradients around mockup */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-2xl -z-10 rounded-3xl opacity-50" />
        </div>
      </div>
    </section>
  );
}
