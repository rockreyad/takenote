import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DashboardLayoutProvider from '@/context/DashboardLayout';
import { FunctionComponent } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = async ({
  children
}) => {
  const session = await getServerSession();
  if (!session) {
    redirect('/auth/signin?callbackUrl=/dashboard');
  }

  return (
    <>
      <DashboardLayoutProvider>
        <Sidebar />
        <div className="lg:pl-52">
          <Header />
          <main className="py-10" style={{minHeight: '100vh!important'}}>
            <div className="px-4 sm:px-6 lg:px-8 h-full">{children}</div>
          </main>
        </div>
        <Toaster />
      </DashboardLayoutProvider>
    </>
  );
};

export default DashboardLayout;
