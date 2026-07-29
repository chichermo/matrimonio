import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { weddingConfig, getVivoPageUrl } from "@/lib/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { I18nProvider } from "@/components/I18nProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

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
  title: `${weddingConfig.coupleNames} — Live`,
  description: `Live wedding stream from ${weddingConfig.location}. ${weddingConfig.weddingDate}.`,
  openGraph: {
    title: `${weddingConfig.coupleNames} — Live`,
    description: `Live stream of our wedding from ${weddingConfig.location}`,
    type: "website",
    url: getVivoPageUrl(),
    images: [
      {
        url: `${weddingConfig.siteUrl.replace(/\/$/, "")}${weddingConfig.thumbnailUrl}`,
        width: 1200,
        height: 675,
        alt: `${weddingConfig.coupleNames}`,
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: weddingConfig.coupleNames,
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#c9a962",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { locale, dict } = await getDictionary();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col safe-px safe-pb">
        <I18nProvider locale={locale} dict={dict}>
          <div className="fixed top-3 right-3 z-[70] sm:top-4 sm:right-4">
            <LanguageSwitcher />
          </div>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
