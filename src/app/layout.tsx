import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CatatItu — Catatan Kuliah Otomatis dengan AI",
    template: "%s | CatatItu",
  },
  description:
    "Ubah rekaman suara dosen menjadi catatan kuliah yang rapi dan terstruktur secara otomatis menggunakan AI. Hemat waktu, tingkatkan pemahaman.",
  keywords: [
    "catatan kuliah",
    "AI",
    "speech to text",
    "mahasiswa",
    "transkripsi",
    "rekaman",
    "catatan otomatis",
  ],
  authors: [{ name: "CatatItu" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "CatatItu",
    title: "CatatItu — Catatan Kuliah Otomatis dengan AI",
    description:
      "Ubah rekaman suara dosen menjadi catatan kuliah yang rapi dan terstruktur secara otomatis menggunakan AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.variable} min-h-screen font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
