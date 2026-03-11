export interface Notification {
  id: string;
  type: 'file' | 'email' | 'task';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export interface NotificationGroup {
  type: 'file' | 'email' | 'task';
  count: number;
  notifications: Notification[];
}
