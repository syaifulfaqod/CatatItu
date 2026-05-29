import { Mic, FileText, Sparkles, Download, LayoutList, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Rekam & Transkrip",
    description: "Rekam langsung dari browser atau unggah file audio. AI akan mengubahnya menjadi teks dengan akurasi tinggi.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Sparkles,
    title: "Format Otomatis",
    description: "Transkrip mentah disulap menjadi catatan terstruktur dengan judul, poin-poin penting, dan pemformatan rapi.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    icon: LayoutList,
    title: "Ringkasan Cerdas",
    description: "Dapatkan inti dari materi kuliah panjang hanya dalam hitungan detik untuk memudahkan belajar (review).",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    icon: Zap,
    title: "Kuis & Flashcard",
    description: "AI secara otomatis membuatkan soal latihan dan flashcard dari catatan Anda untuk menguji pemahaman.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "Manajemen Materi",
    description: "Kelompokkan catatan berdasarkan mata kuliah. Pencarian pintar membantu menemukan materi lama dengan cepat.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Download,
    title: "Ekspor PDF & DOCX",
    description: "Unduh catatan Anda dalam format PDF atau DOCX untuk dicetak atau dibagikan ke teman kelas.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-secondary/30 relative">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Satu Alat untuk Semua Kebutuhan Belajar
          </h2>
          <p className="text-lg text-muted-foreground">
            CatatItu dilengkapi dengan fitur berbasis AI yang dirancang khusus untuk meningkatkan produktivitas mahasiswa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
