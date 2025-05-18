import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import UserMenu from '@/components/layout/UserMenu';
import NotificationsPopover from '@/components/notifications/NotificationsPopover';
import MobileSidebar from '@/components/layout/MobileSidebar';
import { useNotifications } from '@/providers/NotificationsProvider';

const Navbar = () => {
  const { unreadCount } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <MobileSidebar onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <div className="font-bold text-xl flex items-center">
              <span className="text-primary">Co</span>
              <span>Ride</span>
              <div className="w-12 h-1 bg-primary/20 rounded-full ml-1" />
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <NotificationsPopover />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;