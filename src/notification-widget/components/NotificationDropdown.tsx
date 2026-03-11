import { X, FileText, Mail, CheckSquare, Trash2 } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'file':
      return <FileText className="w-4 h-4" />;
    case 'email':
      return <Mail className="w-4 h-4" />;
    case 'task':
      return <CheckSquare className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

export const NotificationDropdown = () => {
  const { 
    notifications, 
    setIsOpen, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification,
    unreadCount 
  } = useNotifications();

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-surface border border-border rounded-lg shadow-lg z-50">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text">Notifications</h3>
          <button
            data-name="close-notifications-button"
            data-description="Close notification dropdown"
            onClick={() => setIsOpen(false)}
            className="text-textSecondary hover:text-text transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {unreadCount > 0 && (
          <button
            data-name="mark-all-read-button"
            data-description="Mark all notifications as read"
            onClick={markAllAsRead}
            className="text-sm text-primary hover:text-primary/80 transition-colors mt-2"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-textSecondary">
            No notifications
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-border hover:bg-surface/50 transition-colors ${
                !notification.isRead ? 'bg-primary/5' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className={`p-2 rounded-full ${
                    notification.type === 'file' ? 'bg-blue-100 text-blue-600' :
                    notification.type === 'email' ? 'bg-green-100 text-green-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${!notification.isRead ? 'font-semibold text-text' : 'text-textSecondary'}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-textSecondary mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-textSecondary mt-1">
                      {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  {!notification.isRead && (
                    <button
                      data-name="mark-notification-read-button"
                      data-description="Mark this notification as read"
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-primary hover:text-primary/80 transition-colors"
                      title="Mark as read"
                    >
                      <CheckSquare className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    data-name="delete-notification-button"
                    data-description="Delete this notification"
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-error hover:text-error/80 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="p-4 border-t border-border">
          <button
            data-name="view-all-notifications-button"
            data-description="View all notifications in dedicated page"
            className="w-full text-center text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};
