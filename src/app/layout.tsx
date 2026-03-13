import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KovanEats Kariyer",
  description: "KovanEats startup kariyer portalı. Kovanımıza katıl!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased bg-white text-neutral-900`}>
        {/* Main Content */}
        <main className="flex-1 flex flex-col pt-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-neutral-100 py-8 text-center text-sm text-neutral-400">
          <p>© {new Date().getFullYear()} KovanEats. Tüm hakları saklıdır.</p>
        </footer>
      </body>
    </html>
  );
}
