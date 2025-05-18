import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/providers/AuthProvider';

const AppLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-muted/40">
          <Outlet />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;