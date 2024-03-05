import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/header';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/toaster';

const plus_jakarta_sans = Plus_Jakarta_Sans({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Algorizin',
  description:
    'We are on a mission to empower immigrants in the US by helping them land their first jobs. Learn hands-on technical skills by working with industry experts and navigating the US job market with the help of our career coaching.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${plus_jakarta_sans.className} bg-neutral-50`}>
        <div className="flex h-screen w-full flex-col">
          <div className="z-30">
            <Header />
          </div>
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
        <Suspense>
          <Toaster />
        </Suspense>
      </body>
    </html>
  );
}
