import type { Metadata } from 'next';
import { Inter, Karla } from 'next/font/google';
import './globals.css';
import ProvidersLayout from './Providers';
import Link from 'next/link';

const karla = Karla({
  weight: ['400', '700'],
  subsets: ['latin'],
});
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Santou Pro',
  description:
    'Santou pro est un logiciel de facturation pour les petites et moyennes entreprises',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={karla.className}>
        <ProvidersLayout>{children}</ProvidersLayout>
      </body>
    </html>
  );
}
