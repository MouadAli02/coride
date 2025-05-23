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
  onClick?: () => void;
}

const NavItem = ({ href, label, icon, isActive, onClick }: NavItemProps) => (
  <Button
    variant={isActive ? "secondary" : "ghost"}
    className={cn(
      "w-full justify-start gap-2",
      isActive && "bg-secondary font-medium"
    )}
    asChild
    onClick={onClick}
  >
    <Link to={href}>
      {icon}
      {label}
    </Link>
  </Button>
);

interface MobileSidebarProps {
  onNavigate: () => void;
}

const MobileSidebar = ({ onNavigate }: MobileSidebarProps) => {
  const location = useLocation();
  const { user } = useAuth();
  const pathname = location.pathname;

  return (
    <div className="flex h-full w-full flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b">
        <Link to="/" className="flex items-center gap-2" onClick={onNavigate}>
          <div className="font-bold text-xl flex items-center">
            <span className="text-primary">Co</span>
            <span>Ride</span>
            <div className="w-12 h-1 bg-primary/20 rounded-full ml-1" />
          </div>
        </Link>
      </div>
      
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
              onClick={onNavigate}
            />
            <NavItem
              href="/rides"
              label="Mes trajets"
              icon={<Car className="h-5 w-5" />}
              isActive={pathname.startsWith('/rides') && 
                !pathname.includes('/offer') && 
                !pathname.includes('/find')}
              onClick={onNavigate}
            />
            <NavItem
              href="/rides/offer"
              label="Proposer un trajet"
              icon={<PlusCircle className="h-5 w-5" />}
              isActive={pathname === '/rides/offer'}
              onClick={onNavigate}
            />
            <NavItem
              href="/rides/find"
              label="Rechercher un trajet"
              icon={<Search className="h-5 w-5" />}
              isActive={pathname === '/rides/find'}
              onClick={onNavigate}
            />
            <NavItem
              href="/messages"
              label="Messages"
              icon={<MessageSquare className="h-5 w-5" />}
              isActive={pathname === '/messages'}
              onClick={onNavigate}
            />
            <NavItem
              href="/profile"
              label="Mon profil"
              icon={<User className="h-5 w-5" />}
              isActive={pathname === '/profile'}
              onClick={onNavigate}
            />
              <NavItem              href="/chatbot"
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
                onClick={onNavigate}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto p-4">
        <div className="rounded-lg bg-primary/10 p-3">
          <h3 className="font-medium text-sm">Réduisez votre empreinte carbone</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Partagez vos trajets avec vos collègues et aidez votre organisation à atteindre ses objectifs de développement durable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;