import { useState, useEffect } from "react";
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from "@/hooks/useMockTasks";
import { Task } from "@/types/task";
import { SortField, SortConfig } from "../components/tasks/types";
import { getStatusLabel } from "../components/tasks/utils";

export function useTasksPage() {
  const { data: tasks, isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const deleteTaskMutation = useDeleteTask();

  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Filter and sort states
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ field: 'dueDate', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 10;

  // Reset pagination when filters change
  const resetPagination = () => setCurrentPage(1);

  const clearFilter = () => {
    setStatusFilter("");
    resetPagination();
  };

  const clearSearch = () => {
    setSearchQuery("");
    resetPagination();
  };

  const handleSort = (field: SortField) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
    resetPagination();
  };

  // Filter tasks
  const filteredTasks = tasks?.filter(task => {
    // Filter by status
    if (statusFilter && task.status !== statusFilter) return false;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDescription = task.description.toLowerCase().includes(query);
      const matchesAssignee = task.assignee.name.toLowerCase().includes(query);
      const matchesStatus = getStatusLabel(task.status).toLowerCase().includes(query);
      
      if (!matchesTitle && !matchesDescription && !matchesAssignee && !matchesStatus) {
        return false;
      }
    }
    
    return true;
  }) || [];

  // Sort filtered tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const { field, direction } = sortConfig;
    const multiplier = direction === 'asc' ? 1 : -1;

    switch (field) {
      case 'title':
        return a.title.localeCompare(b.title) * multiplier;
      case 'status':
        return a.status.localeCompare(b.status) * multiplier;
      case 'dueDate':
        return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * multiplier;
      case 'assignee':
        return a.assignee.name.localeCompare(b.assignee.name) * multiplier;
      default:
        return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const paginatedTasks = sortedTasks.slice(startIndex, endIndex);

  // Reset to first page when total pages changes and current page is out of bounds
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  // Task handlers
  const handleCreateTask = (taskData: Partial<Task>) => {
    createTaskMutation.mutate(taskData as Omit<Task, 'id'>, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
      },
    });
  };

  const handleEditTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      updateTaskMutation.mutate({ ...selectedTask, ...taskData } as Task, {
        onSuccess: () => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        },
      });
    }
  };

  const handleViewClick = (task: Task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedTask) {
      deleteTaskMutation.mutate(selectedTask.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        },
      });
    }
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTask(null);
  };

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  return {
    // Data
    tasks,
    paginatedTasks,
    sortedTasks,
    isLoading,
    error,
    
    // Modal states
    isCreateModalOpen,
    isEditModalOpen,
    isViewModalOpen,
    isDeleteModalOpen,
    selectedTask,
    
    // Filter states
    statusFilter,
    searchQuery,
    sortConfig,
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    
    // Mutations
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
    
    // Handlers
    handleCreateTask,
    handleEditTask,
    handleViewClick,
    handleEditClick,
    handleDeleteClick,
    handleDeleteConfirm,
    closeModal,
    openCreateModal,
    
    // Filter handlers
    setStatusFilter,
    setSearchQuery,
    handleSort,
    clearFilter,
    clearSearch,
    setCurrentPage,
  };
} 