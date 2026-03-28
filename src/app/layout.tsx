import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
    description: "KovanEats startup kariyer portalı. Kovanımıza katıl.",
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

            <Mascot />
            <Analytics />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
