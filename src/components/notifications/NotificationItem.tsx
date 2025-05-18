import { useCallback } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { 
  Info, 
  CheckCircle, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/providers/NotificationsProvider';
import { Notification } from '@/types';

interface NotificationItemProps {
  notification: Notification;
  onClick?: () => void;
}

const NotificationItem = ({ notification, onClick }: NotificationItemProps) => {
  const { markAsRead } = useNotifications();
  
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-primary" />;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    return format(date, 'MMM d, p');
  };
  
  const handleClick = useCallback(() => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    if (onClick) {
      onClick();
    }
  }, [notification, markAsRead, onClick]);

  return (
    <div 
      className={cn(
        "flex items-start p-3 rounded-md transition-colors hover:bg-muted cursor-pointer",
        notification.read ? "opacity-75" : "bg-muted/40"
      )}
      onClick={handleClick}
    >
      <div className="mr-3 mt-0.5">{getIcon()}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-sm font-medium truncate">{notification.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDate(notification.createdAt)}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
      </div>
    </div>
  );
};

export default NotificationItem;