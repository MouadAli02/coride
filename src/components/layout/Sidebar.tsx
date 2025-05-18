import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Car, 
  User, 
  MessageSquare, 
  BarChart3,
  PlusCircle,
  Search,
  Bot
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
      isActive && "bg-blue-100 text-blue-700 font-medium"
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
            Principal
          </h2>
          <div className="space-y-1">
            <NavItem
              href="/"
              label="Tableau de bord"
              icon={<Home className="h-5 w-5" />}
              isActive={pathname === '/'}
            />
            <NavItem
              href="/rides"
              label="Mes trajets"
              icon={<Car className="h-5 w-5" />}
              isActive={pathname.startsWith('/rides') && 
                !pathname.includes('/offer') && 
                !pathname.includes('/find')}
            />
            <NavItem
              href="/rides/offer"
              label="Proposer un trajet"
              icon={<PlusCircle className="h-5 w-5" />}
              isActive={pathname === '/rides/offer'}
            />
            <NavItem
              href="/rides/find"
              label="Rechercher un trajet"
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
              label="Profil"
              icon={<User className="h-5 w-5" />}
              isActive={pathname === '/profile'}
            />              <NavItem
              href="/chatbot"
              label="Ask Coride"
              icon={<Bot className="h-5 w-5" />}
              isActive={pathname === '/chatbot'}
            />
          </div>
        </div>

        {user?.role === 'admin' && (
          <div className="py-2">
            <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
              Administration
            </h2>
            <div className="space-y-1">
              <NavItem
                href="/admin"
                label="Tableau RSE"
                icon={<BarChart3 className="h-5 w-5" />}
                isActive={pathname === '/admin'}
              />
            </div>
          </div>
        )}

        <div className="mt-auto p-4">
          <div className="rounded-lg bg-primary/10 p-3">
            <h3 className="font-medium text-sm">Réduisez votre empreinte carbone</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Partagez vos trajets avec vos collègues et aidez votre organisation à atteindre ses objectifs de développement durable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileSidebar = ({ onNavigate }: { onNavigate: () => void }) => {
  return (
    <div className="flex h-full flex-col py-4">
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold">Menu principal</h2>
      </div>
      <div className="mt-auto p-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <h3 className="font-medium text-sm">Réduisez votre impact</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Partagez vos trajets et contribuez au développement durable.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;