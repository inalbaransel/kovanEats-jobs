import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jobs.kovaneats.com"),
  title: "KovanEats Kariyer - Geleceğin Yemek Teknolojisini İnşa Et",
  description:
    "KovanEats startup kariyer portalı. Sen de geleceği hayal edenlerden değil, onu kodlayanlardan olmak istiyorsan ekibimize ve Kovanımıza katıl!",
  keywords:
    "KovanEats, kariyer, iş ilanları, startup, yazılım, frontend, backend, tasarım, pazarlama, iş başvuru",
  openGraph: {
    title: "KovanEats Kariyer",
    description: "KovanEats startup kariyer portalı. Kovanımıza katıl!",
    url: "https://jobs.kovaneats.com",
    siteName: "KovanEats Kariyer",
    images: [
      {
        url: "/kovan_favicon.png",
        alt: "KovanEats Kariyer Logo",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "KovanEats Kariyer",
    description: "KovanEats startup kariyer portalı. Kovanımıza katıl!",
    images: ["/kovan_favicon.png"],
  },
  icons: {
    icon: "/kovan_favicon.png",
  },
};

import ConsoleSignature from "@/components/ConsoleSignature";
import Mascot from "@/components/Mascot";
import { ThemeProvider } from "@/components/ThemeProvider";
import FloatingMenu from "@/components/FloatingMenu";
import { LanguageProvider } from "@/lib/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Anti-flash script: runs before render to apply correct theme class */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'system';var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t==='system'&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased text-neutral-900 dark:text-neutral-100`}
      >
        <LanguageProvider>
        <ThemeProvider>
          <FloatingMenu />
          <ConsoleSignature />
          {/* Main Content */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Footer */}
          <footer className="w-full py-12 flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-3">
              <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                Powered By
              </span>
              <img
                src="/kulüp_logo.png"
                alt="Bilgisayar Kulübü"
                className="h-16 w-auto object-contain hover:scale-105 transition-transform duration-500 opacity-90 hover:opacity-100 grayscale-20 hover:grayscale-0"
              />
            </div>
          </footer>
          <Mascot />
        </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
