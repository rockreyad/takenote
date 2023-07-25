import Header from '@/components/dashboard/header';
import Sidebar from '@/components/dashboard/sidebar';
import DashboardLayoutProvider from '@/context/DashboardLayout';
import { FunctionComponent } from 'react';
import { Toaster } from '@/components/ui/toaster';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children
}) => {
  return (
    <>
      <DashboardLayoutProvider>
        <Sidebar />
        <div className="lg:pl-52">
          <Header />
          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8 h-full">{children}</div>
          </main>
        </div>
        <Toaster />
      </DashboardLayoutProvider>
    </>
  );
};

export default DashboardLayout;
