import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Car, 
  User, 
  MessageSquare, 
  BarChart3,
  PlusCircle,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

const NavItem = ({ href, label, icon, isActive }: NavItemProps) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start gap-2",
      isActive && "bg-secondary font-medium"
    )}
    asChild
  >
    <Link to={href}>
      {icon}
      {label}
    </Link>
  </Button>
);

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  const pathname = location.pathname;

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      <div className="flex flex-col flex-1 gap-2 p-4">
        <div className="py-2">
          <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
            Main
          </h2>
          <div className="space-y-1">
            <NavItem
              href="/"
              label="Dashboard"
              icon={<Home className="h-5 w-5" />}
              isActive={pathname === '/'}
            />
            <NavItem
              href="/rides"
              label="My Rides"
              icon={<Car className="h-5 w-5" />}
              isActive={pathname.startsWith('/rides') && 
                !pathname.includes('/offer') && 
                !pathname.includes('/find')}
            />
            <NavItem
              href="/rides/offer"
              label="Offer Ride"
              icon={<PlusCircle className="h-5 w-5" />}
              isActive={pathname === '/rides/offer'}
            />
            <NavItem
              href="/rides/find"
              label="Find Ride"
              icon={<Search className="h-5 w-5" />}
              isActive={pathname === '/rides/find'}
            />
            <NavItem
              href="/messages"
              label="Messages"
              icon={<MessageSquare className="h-5 w-5" />}
              isActive={pathname === '/messages'}
            />
            <NavItem
              href="/profile"
              label="Profile"
              icon={<User className="h-5 w-5" />}
              isActive={pathname === '/profile'}
            />
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Admin
            </h2>
            <div className="space-y-1">
              <NavItem
                href="/admin"
                label="RSE Dashboard"
                icon={<BarChart3 className="h-5 w-5" />}
                isActive={pathname === '/admin'}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <h3 className="font-medium text-sm">Reduce Your Carbon Footprint</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Share rides with colleagues and help your organization meet sustainability goals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;