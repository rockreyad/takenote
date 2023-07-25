import './globals.css';
import ThemeProviderWrapper from '@/context/ThemeProvider';
import { Inter } from 'next/font/google';
import 'nprogress/nprogress.css';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';
import { AudioProvider } from '@/context/AudioProvider';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

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

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html
      lang="en"
      className={`h-full bg-gray-50 ${inter.className} scroll-smooth`}
    >
      <ThemeProviderWrapper>
        <body className="font-sans">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <TopProgressBar />
            <AudioProvider>{children}</AudioProvider>
          </NextIntlClientProvider>
        </body>
      </ThemeProviderWrapper>
    </html>
  );
}
