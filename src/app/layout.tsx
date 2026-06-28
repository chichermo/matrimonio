import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { weddingConfig } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${weddingConfig.coupleNames} — Transmisión en vivo`,
  description: `Sigue nuestra boda en vivo desde ${weddingConfig.location}. ${weddingConfig.weddingDate}.`,
  openGraph: {
    title: `${weddingConfig.coupleNames} — En vivo`,
    description: `Transmisión en vivo de nuestra boda desde ${weddingConfig.location}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
