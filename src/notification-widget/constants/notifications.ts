import { Notification } from '../types/notification';

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'file',
    title: 'New Document Uploaded',
    message: 'Project_Report_Q4.pdf has been uploaded to the shared folder',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    isRead: false,
    priority: 'high',
    metadata: {
      fileName: 'Project_Report_Q4.pdf',
      fileSize: '2.4 MB'
    }
  },
  {
    id: '2',
    type: 'email',
    title: 'New Email from Sarah Johnson',
    message: 'Meeting agenda for tomorrow\'s quarterly review',
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    isRead: false,
    priority: 'medium',
    metadata: {
      sender: 'sarah.johnson@company.com'
    }
  },
  {
    id: '3',
    type: 'task',
    title: 'Task Assigned',
    message: 'Review and approve marketing campaign materials',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    isRead: false,
    priority: 'high',
    metadata: {
      taskDueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      taskAssignee: 'John Smith'
    }
  },
  {
    id: '4',
    type: 'file',
    title: 'File Shared',
    message: 'Budget_2024.xlsx has been shared with you',
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    isRead: true,
    priority: 'medium',
    metadata: {
      fileName: 'Budget_2024.xlsx',
      fileSize: '1.2 MB'
    }
  },
  {
    id: '5',
    type: 'email',
    title: 'New Email from IT Support',
    message: 'System maintenance scheduled for this weekend',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: true,
    priority: 'low',
    metadata: {
      sender: 'it-support@company.com'
    }
  }
];

export const NOTIFICATION_TYPES = {
  file: {
    label: 'Files',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  email: {
    label: 'Emails',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  task: {
    label: 'Tasks',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  }
} as const;