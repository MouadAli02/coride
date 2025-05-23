import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/sharemob.png';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import UserMenu from '@/components/layout/UserMenu';
import NotificationsPopover from '@/components/notifications/NotificationsPopover';
import MobileSidebar from '@/components/layout/MobileSidebar';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <MobileSidebar onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <img
                src={logo}
                alt="Logo CoRide"
                className="h-auto w-auto object-contain"
              />
            </div>
          </Link>
        </div>

        <div className="absolute right-3 flex items-center gap-3 pr-4">
          < NotificationsPopover />
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Navbar;