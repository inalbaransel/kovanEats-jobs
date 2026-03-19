import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jobs.kovaneats.com"),
  title: "KovanEats Kariyer | Gelecek Burada Şekilleniyor",
  description:
    "Geleceği hayal edenlerden değil, onu kodlayanlardan olmak için Kovanımıza katıl. Startup ruhunu yakala!",
  keywords:
    "KovanEats, kariyer, iş ilanları, startup, yazılım, frontend, backend, tasarım, pazarlama, iş başvuru",
  authors: [{ name: "inalbaransel" }],
  openGraph: {
    title: "KovanEats Kariyer Portalına Katıl",
    description: "KovanEats startup kariyer portalı. Kovanımıza katıl ve geleceği birlikte kodlayalım!",
    url: "https://jobs.kovaneats.com",
    siteName: "KovanEats Kariyer",
    images: [
      {
        url: "/kovaneats-siyah-logo.png", // Larger image for better preview
        width: 1200,
        height: 630,
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
    images: ["/kovaneats-siyah-logo.png"],
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

            <footer className="w-full py-12 flex flex-col items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-6">
                <span className="text-[10px] font-bold tracking-[0.4em] text-neutral-400 dark:text-neutral-500 uppercase">
                  YAPIM
                </span>

                <div className="flex items-center gap-8 md:gap-12">
                  {/* Kulüp Logo */}
                  <a
                    href="https://www.instagram.com/bilgisayar_kulubu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                  >
                    <img
                      src="/kulüp_logo.png"
                      alt="Bilgisayar Kulübü"
                      className="h-14 w-auto object-contain transition-all duration-500 md:opacity-80 md:group-hover:opacity-100 md:grayscale md:group-hover:grayscale-0 md:scale-95 group-hover:scale-100"
                    />
                  </a>

                  {/* Vertical Divider */}
                  <div className="w-px h-10 bg-neutral-200 dark:bg-neutral-800 rotate-12" />

                  {/* GitHub Profile */}
                  <a
                    href="https://github.com/inalbaransel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div className="relative">
                      <img
                        src="https://github.com/inalbaransel.png"
                        alt="inalbaransel GitHub"
                        className="h-12 w-12 rounded-xl object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-500 border border-neutral-200 dark:border-neutral-800 group-hover:border-neutral-300 dark:group-hover:border-neutral-700 shadow-sm group-hover:shadow-md"
                      />
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900 group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-200 transition-colors">
                        inalbaransel
                      </span>
                      <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
                        Developer
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </footer>
            <Mascot />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
