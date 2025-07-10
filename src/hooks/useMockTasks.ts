import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskStatus } from '../types/task';


let mockTasks: Task[] = [
  {
    id: '1',
    title: 'Homepage Redesign',
    description: 'Update the landing page with new branding',
    status: TaskStatus.InProgress,
    dueDate: '2024-08-15',
    assignee: {
      name: 'Alice',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    },
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Implement new payment gateway API',
    status: TaskStatus.Pending,
    dueDate: '2024-08-20',
    assignee: {
      name: 'John',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300',
    },
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing sessions',
    status: TaskStatus.Completed,
    dueDate: '2024-08-10',
    assignee: {
      name: 'Sarah',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    },
  },
  {
    id: '4',
    title: 'Database Optimization',
    description: 'Optimize database queries for better performance',
    status: TaskStatus.InProgress,
    dueDate: '2024-08-25',
    assignee: {
      name: 'Mike',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    },
  },
  {
    id: '5',
    title: 'Mobile App Development',
    description: 'Build iOS and Android mobile applications',
    status: TaskStatus.Pending,
    dueDate: '2024-09-05',
    assignee: {
      name: 'Emma',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    },
  },
  {
    id: '6',
    title: 'Security Audit',
    description: 'Conduct comprehensive security review',
    status: TaskStatus.Completed,
    dueDate: '2024-08-12',
    assignee: {
      name: 'David',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    },
  },
  {
    id: '7',
    title: 'Content Management System',
    description: 'Develop CMS for easy content updates',
    status: TaskStatus.InProgress,
    dueDate: '2024-08-30',
    assignee: {
      name: 'Lisa',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
    },
  },
  {
    id: '8',
    title: 'Email Marketing Campaign',
    description: 'Design and launch email marketing campaign',
    status: TaskStatus.Pending,
    dueDate: '2024-08-18',
    assignee: {
      name: 'Alex',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    },
  },
  {
    id: '9',
    title: 'Analytics Dashboard',
    description: 'Create analytics dashboard for business metrics',
    status: TaskStatus.Completed,
    dueDate: '2024-08-08',
    assignee: {
      name: 'Rachel',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300',
    },
  },
  {
    id: '10',
    title: 'Customer Support Portal',
    description: 'Build customer support ticket system',
    status: TaskStatus.InProgress,
    dueDate: '2024-09-01',
    assignee: {
      name: 'Tom',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    },
  },
  {
    id: '11',
    title: 'Social Media Integration',
    description: 'Integrate social media sharing features',
    status: TaskStatus.Pending,
    dueDate: '2024-08-22',
    assignee: {
      name: 'Sophie',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    },
  },
  {
    id: '12',
    title: 'Performance Testing',
    description: 'Run load testing and performance optimization',
    status: TaskStatus.Completed,
    dueDate: '2024-08-05',
    assignee: {
      name: 'Chris',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    },
  },
  {
    id: '13',
    title: 'E-commerce Platform',
    description: 'Develop online shopping platform',
    status: TaskStatus.InProgress,
    dueDate: '2024-09-10',
    assignee: {
      name: 'Maria',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    },
  },
  {
    id: '14',
    title: 'Documentation Update',
    description: 'Update technical documentation and user guides',
    status: TaskStatus.Pending,
    dueDate: '2024-08-28',
    assignee: {
      name: 'James',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    },
  },
  {
    id: '15',
    title: 'Backup System Implementation',
    description: 'Set up automated backup and recovery system',
    status: TaskStatus.Completed,
    dueDate: '2024-08-03',
    assignee: {
      name: 'Anna',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    },
  },
  {
    id: '16',
    title: 'UI/UX Redesign',
    description: 'Redesign user interface and improve user experience',
    status: TaskStatus.InProgress,
    dueDate: '2024-09-15',
    assignee: {
      name: 'Daniel',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    },
  },
  {
    id: '17',
    title: 'API Documentation',
    description: 'Create comprehensive API documentation',
    status: TaskStatus.Pending,
    dueDate: '2024-08-25',
    assignee: {
      name: 'Nina',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300',
    },
  },
  {
    id: '18',
    title: 'Data Migration',
    description: 'Migrate data from legacy system to new platform',
    status: TaskStatus.Completed,
    dueDate: '2024-08-01',
    assignee: {
      name: 'Kevin',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    },
  },
  {
    id: '19',
    title: 'Multi-language Support',
    description: 'Implement internationalization and localization',
    status: TaskStatus.InProgress,
    dueDate: '2024-09-20',
    assignee: {
      name: 'Laura',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
    },
  },
  {
    id: '20',
    title: 'Automated Testing Suite',
    description: 'Develop comprehensive automated test suite',
    status: TaskStatus.Pending,
    dueDate: '2024-08-30',
    assignee: {
      name: 'Ryan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    },
  },
  {
    id: '21',
    title: 'Cloud Infrastructure Setup',
    description: 'Set up cloud infrastructure and deployment pipeline',
    status: TaskStatus.Completed,
    dueDate: '2024-07-28',
    assignee: {
      name: 'Grace',
      avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300',
    },
  },
  {
    id: '22',
    title: 'Payment Gateway Integration',
    description: 'Integrate multiple payment gateways',
    status: TaskStatus.InProgress,
    dueDate: '2024-09-25',
    assignee: {
      name: 'Oliver',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300',
    },
  },
  {
    id: '23',
    title: 'SEO Optimization',
    description: 'Optimize website for search engines',
    status: TaskStatus.Pending,
    dueDate: '2024-08-27',
    assignee: {
      name: 'Zoe',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300',
    },
  },
];

// Simulate async fetch
const fetchTasks = async () => {
  await new Promise((res) => setTimeout(res, 400));
  return [...mockTasks];
};

export function useTasks() {
  return useQuery({ queryKey: ['tasks'], queryFn: fetchTasks });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: Omit<Task, 'id'>) => {
      await new Promise((res) => setTimeout(res, 400));
      const newTask: Task = { ...task, id: Date.now().toString() };
      mockTasks = [newTask, ...mockTasks];
      return newTask;
    },
    onMutate: async (newTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Task[] = []) => [
        { ...newTask, id: 'optimistic-' + Date.now() },
        ...old,
      ]);
      return { previousTasks };
    },
    onError: (err, newTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (task: Task) => {
      await new Promise((res) => setTimeout(res, 400));
      mockTasks = mockTasks.map((t) => (t.id === task.id ? task : t));
      return task;
    },
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      return { previousTasks };
    },
    onError: (err, updatedTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await new Promise((res) => setTimeout(res, 400));
      mockTasks = mockTasks.filter((t) => t.id !== id);
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (old: Task[] = []) =>
        old.filter((t) => t.id !== id)
      );
      return { previousTasks };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
} 