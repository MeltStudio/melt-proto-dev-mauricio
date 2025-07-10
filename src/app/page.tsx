"use client";

import React, { useState } from "react";
import { DefaultPageLayout } from "@/ui/layouts/DefaultPageLayout";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherSearch } from "@subframe/core";
import { FeatherListFilter } from "@subframe/core";
import { FeatherArrowUpDown } from "@subframe/core";
import { FeatherX } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherEye } from "@subframe/core";
import { FeatherEdit2 } from "@subframe/core";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";
import { useTasks, useCreateTask, useUpdateTask } from "@/hooks/useMockTasks";
import { TaskStatus, Task } from "@/types/task";
import { TaskModal } from "@/ui/components/tasks/TaskModal";
import { Select } from "@/ui/components/Select";

function TasksOverviewPage() {
  const { data: tasks, isLoading, error } = useTasks();
  const createTaskMutation = useCreateTask();
  const updateTaskMutation = useUpdateTask();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");

  const getStatusBadgeVariant = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.InProgress:
        return undefined; 
      case TaskStatus.Pending:
        return "warning";
      case TaskStatus.Completed:
        return "success";
      default:
        return undefined;
    }
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.InProgress:
        return "In Progress";
      case TaskStatus.Pending:
        return "Pending";
      case TaskStatus.Completed:
        return "Completed";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

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

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsViewModalOpen(false);
    setSelectedTask(null);
  };

  const clearFilter = () => {
    setStatusFilter("");
  };

  // Filter tasks based on selected status
  const filteredTasks = tasks?.filter(task => {
    if (!statusFilter) return true; // Show all tasks if no filter is selected
    return task.status === statusFilter;
  }) || [];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: TaskStatus.InProgress, label: "In Progress" },
    { value: TaskStatus.Pending, label: "Pending" },
    { value: TaskStatus.Completed, label: "Completed" },
  ];

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
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create task
          </Button>
        </div>
        <div className="flex w-full flex-col items-start gap-4 px-6">
          <div className="flex w-full flex-wrap items-center gap-2">
            <TextField
              variant="filled"
              label=""
              helpText=""
              icon={<FeatherSearch />}
            >
              <TextField.Input
                placeholder="Search tasks..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <div className="flex items-center gap-2">
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
              >
                {statusOptions.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select>
              {statusFilter && (
                <IconButton
                  icon={<FeatherX />}
                  onClick={clearFilter}
                  className="text-neutral-400 hover:text-neutral-600"
                />
              )}
            </div>
            <Button
              variant="neutral-tertiary"
              icon={<FeatherArrowUpDown />}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Sort
            </Button>
          </div>
          
          {/* Filter summary */}
          {statusFilter && (
            <div className="flex items-center gap-2 text-sm text-subtext-color">
              <span>Showing tasks with status:</span>
              <Badge variant={getStatusBadgeVariant(statusFilter as TaskStatus)}>
                {getStatusLabel(statusFilter as TaskStatus)}
              </Badge>
              <span>({filteredTasks.length} of {tasks?.length || 0} tasks)</span>
            </div>
          )}
          
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
            <Table
              header={
                <Table.HeaderRow>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Description</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Due Date</Table.HeaderCell>
                  <Table.HeaderCell>Assignee</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.HeaderRow>
              }
            >
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <Table.Row key={task.id}>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                        {task.title}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {task.description}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={getStatusBadgeVariant(task.status)}>
                        {getStatusLabel(task.status)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <span className="whitespace-nowrap text-body font-body text-neutral-500">
                        {formatDate(task.dueDate)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Avatar
                        size="small"
                        image={task.assignee.avatar}
                      >
                        {task.assignee.name.charAt(0)}
                      </Avatar>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center justify-end gap-2">
                        <SubframeCore.DropdownMenu.Root>
                          <SubframeCore.DropdownMenu.Trigger asChild={true}>
                            <IconButton
                              icon={<FeatherMoreHorizontal />}
                              onClick={(
                                event: React.MouseEvent<HTMLButtonElement>
                              ) => {}}
                            />
                          </SubframeCore.DropdownMenu.Trigger>
                          <SubframeCore.DropdownMenu.Portal>
                            <SubframeCore.DropdownMenu.Content
                              side="bottom"
                              align="end"
                              sideOffset={4}
                              asChild={true}
                            >
                              <DropdownMenu>
                                <DropdownMenu.DropdownItem 
                                  icon={<FeatherEye />}
                                  onClick={() => handleViewClick(task)}
                                >
                                  View
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownItem 
                                  icon={<FeatherEdit2 />}
                                  onClick={() => handleEditClick(task)}
                                >
                                  Edit
                                </DropdownMenu.DropdownItem>
                                <DropdownMenu.DropdownDivider />
                                <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
                                  Delete
                                </DropdownMenu.DropdownItem>
                              </DropdownMenu>
                            </SubframeCore.DropdownMenu.Content>
                          </SubframeCore.DropdownMenu.Portal>
                        </SubframeCore.DropdownMenu.Root>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={6}>
                    <div className="flex items-center justify-center py-8">
                      <span className="text-body font-body text-subtext-color">
                        {statusFilter ? `No tasks found with status "${getStatusLabel(statusFilter as TaskStatus)}"` : "No tasks found"}
                      </span>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table>
          </div>
        </div>
      </div>

      <TaskModal
        open={isCreateModalOpen}
        mode="create"
        task={null}
        onSave={handleCreateTask}
        onClose={() => setIsCreateModalOpen(false)}
        loading={createTaskMutation.isPending}
        error={createTaskMutation.error?.message || null}
      />

      <TaskModal
        open={isEditModalOpen}
        mode="edit"
        task={selectedTask}
        onSave={handleEditTask}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        loading={updateTaskMutation.isPending}
        error={updateTaskMutation.error?.message || null}
      />

      <TaskModal
        open={isViewModalOpen}
        mode="view"
        task={selectedTask}
        onSave={undefined}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedTask(null);
        }}
        loading={false}
        error={null}
      />
    </DefaultPageLayout>
  );
}

export default TasksOverviewPage;
