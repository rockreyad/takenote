'use client';
import { SessionProvider } from 'next-auth/react';
import { AudioProvider } from '@/context/AudioProvider';
import dynamic from 'next/dynamic';

const TopProgressBar = dynamic(
  () => {
    return import('@/components/top-progressbar');
  },
  { ssr: false }
);

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <TopProgressBar />
      <AudioProvider>{children}</AudioProvider>
    </SessionProvider>
  );
};

export default Provider;
