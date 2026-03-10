import { File, Mail, CheckSquare, Trash2, Clock } from 'lucide-react';
import { Notification } from '../types/notification';
import { useNotifications } from '../hooks/useNotifications';
import { formatTimeAgo } from '../utils/dateUtils';
import { NOTIFICATION_TYPES } from '../constants/notifications';

interface NotificationItemProps {
  notification: Notification;
}

export const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { markAsRead, deleteNotification } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case 'file': return <File className="w-5 h-5" />;
      case 'email': return <Mail className="w-5 h-5" />;
      case 'task': return <CheckSquare className="w-5 h-5" />;
    }
  };

  const getPriorityColor = () => {
    switch (notification.priority) {
      case 'high': return 'border-l-error';
      case 'medium': return 'border-l-warning';
      case 'low': return 'border-l-success';
    }
  };

  const typeConfig = NOTIFICATION_TYPES[notification.type];

  return (
    <div
      className={`p-4 hover:bg-accent transition-colors border-l-4 ${getPriorityColor()} ${
        !notification.isRead ? 'bg-accent/30' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${typeConfig.bgColor} ${typeConfig.color} flex-shrink-0`}>
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h4 className={`font-medium text-sm ${!notification.isRead ? 'text-text' : 'text-textSecondary'}`}>
                {notification.title}
              </h4>
              <p className="text-sm text-textSecondary mt-1 line-clamp-2">
                {notification.message}
              </p>
              
              {/* Metadata */}
              {notification.metadata && (
                <div className="mt-2 text-xs text-textSecondary">
                  {notification.metadata.fileName && (
                    <span className="inline-flex items-center gap-1">
                      <File className="w-3 h-3" />
                      {notification.metadata.fileName}
                      {notification.metadata.fileSize && ` (${notification.metadata.fileSize})`}
                    </span>
                  )}
                  {notification.metadata.sender && (
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {notification.metadata.sender}
                    </span>
                  )}
                  {notification.metadata.taskDueDate && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Due {formatTimeAgo(notification.metadata.taskDueDate)}
                    </span>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-1 flex-shrink-0">
              {!notification.isRead && (
                <button
                  data-name="mark-notification-read-button"
                  data-description="Mark this notification as read"
                  onClick={() => markAsRead(notification.id)}
                  className="p-1 text-textSecondary hover:text-primary transition-colors rounded"
                  title="Mark as read"
                >
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </button>
              )}
              <button
                data-name="delete-notification-button"
                data-description="Delete this notification permanently"
                onClick={() => deleteNotification(notification.id)}
                className="p-1 text-textSecondary hover:text-error transition-colors rounded"
                title="Delete notification"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-textSecondary">
              {formatTimeAgo(notification.timestamp)}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full ${typeConfig.bgColor} ${typeConfig.color}`}>
              {typeConfig.label.slice(0, -1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};