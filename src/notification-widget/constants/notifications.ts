import { Notification } from '../types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'file',
    title: 'Document uploaded',
    message: 'New document "Project Report.pdf" has been uploaded',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false
  },
  {
    id: '2',
    type: 'email',
    title: 'New email received',
    message: 'You have a new email from john@example.com',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false
  },
  {
    id: '3',
    type: 'task',
    title: 'Task completed',
    message: 'Document processing task has been completed',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: true
  },
  {
    id: '4',
    type: 'file',
    title: 'File processed',
    message: 'Invoice_2024.pdf has been successfully processed',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isRead: true
  },
  {
    id: '5',
    type: 'email',
    title: 'Email notification',
    message: 'Weekly report is ready for review',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false
  }
];
