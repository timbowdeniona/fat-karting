import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RAGCorpusSidebar } from "@/components/ai/RAGCorpusSidebar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAT Karting League | Electro-Powered Racing",
  description: "The ultimate karting league experience. High-performance racing, real-time leaderboards, and exclusive driver insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} font-body bg-asphalt text-slate-50 min-h-screen flex flex-col selection:bg-race-red/30`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <RAGCorpusSidebar />
      </body>
    </html>
  );
}
