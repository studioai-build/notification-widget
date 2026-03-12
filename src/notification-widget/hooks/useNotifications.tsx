import { groupBy } from 'lodash';
import { useState } from 'react';
import { MOCK_NOTIFICATIONS } from '../constants/notifications';
import { Notification, NotificationGroup } from '../types/notification';

export type NotificationsState = {
  notifications: Notification[];
  notificationGroups: NotificationGroup[];
  unreadCount: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
};

export const useNotificationsState = (): NotificationsState => {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const notificationGroups: NotificationGroup[] = Object.entries(
    groupBy(notifications, 'type')
  ).map(([type, notifs]) => ({
    type: type as 'file' | 'email' | 'task',
    count: notifs.length,
    notifications: notifs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }));

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return {
    notifications,
    notificationGroups,
    unreadCount,
    isOpen,
    setIsOpen,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    addNotification
  };
};
