"use client";

import React from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import {
  TaskFilters,
  FilterSummary,
  Pagination,
  DeleteTaskModal,
  TaskModal,
  TasksTable,
} from "@/components/tasks";
import { useTasksPage } from "../hooks/useTasksPage";

function TasksOverviewPage() {
  const {
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
  } = useTasksPage();

  if (isLoading) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12 overflow-auto">
          <div className="flex w-full items-center justify-center py-12">
            <span className="text-body font-body text-subtext-color">Loading tasks...</span>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  if (error) {
    return (
      <DefaultPageLayout>
        <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12 overflow-auto">
          <div className="flex w-full items-center justify-center py-12">
            <span className="text-body font-body text-error-600">Error loading tasks: {error.message}</span>
          </div>
        </div>
      </DefaultPageLayout>
    );
  }

  return (
    <DefaultPageLayout>
      <div className="container max-w-none flex h-full w-full flex-col items-start gap-6 bg-default-background py-12 overflow-auto">
        {/* Header */}
        <div className="flex w-full items-center justify-between px-6">
          <div className="flex flex-col items-start gap-1">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Tasks
            </span>
            <span className="text-body font-body text-subtext-color">
              Manage and track your team&#39;s tasks
            </span>
          </div>
          <Button
            size="large"
            icon={<FeatherPlus />}
            onClick={openCreateModal}
          >
            Create task
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex w-full flex-col items-start gap-4 px-6">
          {/* Filters */}
          <TaskFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={clearSearch}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onClearStatusFilter={clearFilter}
            sortField={sortConfig.field}
            onSortChange={handleSort}
          />
          
          {/* Filter Summary */}
          <FilterSummary
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            sortField={sortConfig.field}
            sortDirection={sortConfig.direction}
            totalTasks={tasks?.length || 0}
            filteredTasks={sortedTasks.length}
            currentPage={currentPage}
            totalPages={totalPages}
          />
          
          {/* Tasks Table */}
          <TasksTable
            tasks={paginatedTasks}
            sortConfig={sortConfig}
            onSort={handleSort}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            statusFilter={statusFilter}
            searchQuery={searchQuery}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalTasks={sortedTasks.length}
            startIndex={startIndex}
            endIndex={endIndex}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        open={isCreateModalOpen}
        mode="create"
        task={null}
        onSave={handleCreateTask}
        onClose={closeModal}
        loading={createTaskMutation.isPending}
        error={createTaskMutation.error?.message || null}
      />

      <TaskModal
        open={isEditModalOpen}
        mode="edit"
        task={selectedTask}
        onSave={handleEditTask}
        onClose={closeModal}
        loading={updateTaskMutation.isPending}
        error={updateTaskMutation.error?.message || null}
      />

      <TaskModal
        open={isViewModalOpen}
        mode="view"
        task={selectedTask}
        onSave={undefined}
        onClose={closeModal}
        loading={false}
        error={null}
      />

      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        task={selectedTask}
        onConfirm={handleDeleteConfirm}
        onClose={closeModal}
        isLoading={deleteTaskMutation.isPending}
        error={deleteTaskMutation.error?.message || null}
      />
    </DefaultPageLayout>
  );
}

export default TasksOverviewPage;
