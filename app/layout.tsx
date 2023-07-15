import './globals.css';
import ThemeProviderWrapper from '@/context/ThemeProvider';
import { Inter } from 'next/font/google';
import 'nprogress/nprogress.css';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { AudioProvider } from '@/context/AudioProvider';

const TopProgressBar = dynamic(
  () => {
    return import('@/components/top-progressbar');
  },
  { ssr: false }
);

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal'],
  weight: ['400', '500', '600', '700', '800']
});

export const metadata: Metadata = {
  title: 'Home - TakeNote',
  description:
    'A user admin dashboard configured with Next.js, PlanetScale, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full bg-gray-50 ${inter.className}`}>
      <ThemeProviderWrapper>
        <body className="font-sans">
          <TopProgressBar />
          <AudioProvider>{children}</AudioProvider>
        </body>
      </ThemeProviderWrapper>
    </html>
  );
}
