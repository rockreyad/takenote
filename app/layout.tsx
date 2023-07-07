import DashboardLayoutProvider from '@/context/dashboardLayout';
import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import ThemeProviderWrapper from '@/context/ThemeProvider';
import { Inter } from 'next/font/google';

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata = {
  title: 'Next.js 13 + PlanetScale + NextAuth + Tailwind CSS',
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
        <body className="h-full font-sans">
          <DashboardLayoutProvider>
            <Sidebar />
            <div className="lg:pl-72">
              <Header />
              <main className="py-10">
                <div className="px-4 sm:px-6 lg:px-8">{children}</div>
              </main>
            </div>
          </DashboardLayoutProvider>
          <Analytics />
        </body>
      </ThemeProviderWrapper>
    </html>
  );
}
