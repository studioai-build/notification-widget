import { CheckCheck, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { NotificationTabs } from './NotificationTabs';

export const NotificationDropdown = () => {
  const { 
    notificationGroups, 
    unreadCount, 
    setIsOpen, 
    markAllAsRead 
  } = useNotifications();
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [setIsOpen]);

  const totalNotifications = notificationGroups.reduce((sum, group) => sum + group.count, 0);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-12 w-96 bg-surface border border-border rounded-xl shadow-lg z-50 max-h-[600px] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-text">Notifications</h3>
          <p className="text-sm text-textSecondary">
            {totalNotifications} total, {unreadCount} unread
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              data-name="mark-all-read-button"
              data-description="Mark all notifications as read"
              onClick={markAllAsRead}
              className="p-1.5 text-textSecondary hover:text-primary transition-colors rounded-lg hover:bg-accent"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
          )}
          <button
            data-name="close-notifications-button"
            data-description="Close the notifications dropdown"
            onClick={() => setIsOpen(false)}
            className="p-1.5 text-textSecondary hover:text-text transition-colors rounded-lg hover:bg-accent"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {totalNotifications === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
              <CheckCheck className="w-8 h-8 text-primary" />
            </div>
            <h4 className="font-medium text-text mb-2">All caught up!</h4>
            <p className="text-sm text-textSecondary text-center">
              No new notifications at the moment.
            </p>
          </div>
        ) : (
          <NotificationTabs groups={notificationGroups} />
        )}
      </div>
    </div>
  );
};
