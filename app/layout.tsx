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
  title: 'TakeNote | Next Generation Speech to Text AI',
  description:
    'Transform meetings into accurate transcriptions with exceptional accuracy.  Fast; Accurate; Secure Transcription and Sentiment Analysis.',
  icons:
    'https://uploads-ssl.webflow.com/640716069c07e6695feb6357/641f4218927bd57ccc106fcf_TakeNote_256.jpg',
  openGraph: {
    title: 'TakeNote | Next generation Speech to Text AI',
    description:
      'Precise Transcription; Generate Summarise; Sentiment Analysis; Speaker Identification'
  }
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
