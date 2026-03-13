import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KovanEats Kariyer - Geleceğin Yemek Teknolojisini İnşa Et",
  description: "KovanEats startup kariyer portalı. Sen de geleceği hayal edenlerden değil, onu kodlayanlardan olmak istiyorsan ekibimize ve Kovanımıza katıl!",
  keywords: "KovanEats, kariyer, iş ilanları, startup, yazılım, frontend, backend, tasarım, pazarlama, iş başvuru",
  openGraph: {
    title: "KovanEats Kariyer",
    description: "KovanEats startup kariyer portalı. Kovanımıza katıl!",
    type: "website",
    locale: "tr_TR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${inter.className} min-h-screen flex flex-col antialiased text-neutral-900`}
      >
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
      </body>
    </html>
  );
}
