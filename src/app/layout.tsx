import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ProvidersLayout from "./Providers";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Santu Pro",
  description: "Santu pro est un logiciel de facturation pour les petites et moyennes entreprises",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersLayout>
          {children}
        </ProvidersLayout>
      </body>
    </html>
  );
}
