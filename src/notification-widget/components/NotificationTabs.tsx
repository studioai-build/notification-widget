import { useState } from 'react';
import { File, Mail, CheckSquare } from 'lucide-react';
import { NotificationGroup } from '../types/notification';
import { NotificationItem } from './NotificationItem';
import { NOTIFICATION_TYPES } from '../constants/notifications';

interface NotificationTabsProps {
  groups: NotificationGroup[];
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
}

export const NotificationTabs = ({ groups, markAsRead, deleteNotification }: NotificationTabsProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'file' | 'email' | 'task'>('all');

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return <File className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'task': return <CheckSquare className="w-4 h-4" />;
      default: return null;
    }
  };

  const allNotifications = groups.flatMap(group => group.notifications)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const filteredNotifications = activeTab === 'all' 
    ? allNotifications
    : allNotifications.filter(n => n.type === activeTab);

  const getUnreadCount = (type: 'all' | 'file' | 'email' | 'task') => {
    const notifications = type === 'all' ? allNotifications : allNotifications.filter(n => n.type === type);
    return notifications.filter(n => !n.isRead).length;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-border bg-surface overflow-x-auto">
        <button
          data-name="all-notifications-tab"
          data-description="View all notifications regardless of type"
          onClick={() => setActiveTab('all')}
          className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'all'
              ? 'text-primary border-b-2 border-primary bg-accent'
              : 'text-textSecondary hover:text-text hover:bg-accent'
          }`}
        >
          All
          {getUnreadCount('all') > 0 && (
            <span className="ml-2 bg-error text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
              {getUnreadCount('all')}
            </span>
          )}
        </button>
        
        {groups.map(group => (
          <button
            key={group.type}
            data-name={`${group.type}-notifications-tab`}
            data-description={`View only ${group.type} notifications`}
            onClick={() => setActiveTab(group.type)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative flex items-center justify-center gap-2 ${
              activeTab === group.type
                ? 'text-primary border-b-2 border-primary bg-accent'
                : 'text-textSecondary hover:text-text hover:bg-accent'
            }`}
          >
            {getIcon(group.type)}
            <span className="hidden sm:inline">{NOTIFICATION_TYPES[group.type].label}</span>
            {getUnreadCount(group.type) > 0 && (
              <span className="bg-error text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                {getUnreadCount(group.type)}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4">
            <p className="text-textSecondary text-sm">No notifications in this category</p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
