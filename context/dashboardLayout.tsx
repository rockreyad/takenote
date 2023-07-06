'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState
} from 'react';

interface DashboardLayoutContextProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}
const DashboardLayoutContext =
  createContext<DashboardLayoutContextProps | null>(null);
DashboardLayoutContext.displayName = 'DashboardLayoutContext';
export const useDashboardLayout = () => {
  const context = useContext(
    DashboardLayoutContext
  ) as DashboardLayoutContextProps;
  if (!context) {
    throw new Error(
      'useDashboardLayout must be used within a DashboardLayoutProvider'
    );
  }
  return context;
};

const DashboardLayoutProvider = ({ ...props }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <DashboardLayoutContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen
      }}
      {...props}
    />
  );
};

export default DashboardLayoutProvider;
