export enum TaskStatus {
  InProgress = 'in_progress',
  Pending = 'pending',
  Completed = 'completed',
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string; 
  assignee: {
    name: string;
    avatar: string;
  };
} 