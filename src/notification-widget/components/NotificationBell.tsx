import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationDropdown } from './NotificationDropdown';

export const NotificationBell = () => {
  const { unreadCount, isOpen, setIsOpen } = useNotifications();

  return (
    <div className="relative">
      <button
        data-name="notification-bell-button"
        data-description="Toggle notification dropdown to view all notifications"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-text hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-error text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && <NotificationDropdown />}
    </div>
  );
};