import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskStatus } from '../types/task';

// In-memory mock data
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