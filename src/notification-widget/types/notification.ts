export interface Notification {
  id: string;
  type: 'file' | 'email' | 'task';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high';
  metadata?: {
    fileName?: string;
    fileSize?: string;
    sender?: string;
    taskDueDate?: Date;
    taskAssignee?: string;
  };
}

export interface NotificationGroup {
  type: 'file' | 'email' | 'task';
  count: number;
  notifications: Notification[];
}