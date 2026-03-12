import { Bell } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { NotificationsState } from '../hooks/useNotifications';
import { NotificationDropdown } from './NotificationDropdown';

type NotificationBellProps = Pick<
  NotificationsState,
  'unreadCount' | 'isOpen' | 'setIsOpen' | 'notifications' | 'markAsRead' | 'markAllAsRead' | 'deleteNotification'
>;

export const NotificationBell = (props: NotificationBellProps) => {
  const {
    unreadCount,
    isOpen,
    setIsOpen,
    notifications,
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (target && containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div className="relative" ref={containerRef}>
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

      {isOpen && (
        <NotificationDropdown
          notifications={notifications}
          setIsOpen={setIsOpen}
          markAsRead={markAsRead}
          markAllAsRead={markAllAsRead}
          deleteNotification={deleteNotification}
          unreadCount={unreadCount}
        />
      )}
    </div>
  );
};
