import React from "react";
import { Table } from "@/ui/components/Table";
import { Badge } from "@/ui/components/Badge";
import { Avatar } from "@/ui/components/Avatar";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherEye, FeatherEdit2, FeatherTrash, FeatherMoreHorizontal } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { Task } from "@/types/task";
import { SortField, SortConfig } from "./types";
import { getStatusBadgeVariant, getStatusLabel, formatDate, getSortIcon } from "./utils";

interface TasksTableProps {
  tasks: Task[];
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  statusFilter: string;
  searchQuery: string;
}

export function TasksTable({
  tasks,
  sortConfig,
  onSort,
  onView,
  onEdit,
  onDelete,
  statusFilter,
  searchQuery,
}: TasksTableProps) {
  const getEmptyStateMessage = () => {
    if (statusFilter && searchQuery) {
      return `No tasks found with status "${getStatusLabel(statusFilter as any)}" and matching "${searchQuery}"`;
    } else if (statusFilter) {
      return `No tasks found with status "${getStatusLabel(statusFilter as any)}"`;
    } else if (searchQuery) {
      return `No tasks found matching "${searchQuery}"`;
    }
    return "No tasks found";
  };

  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
      <Table
        header={
          <Table.HeaderRow>
            <Table.HeaderCell>
              <button
                onClick={() => onSort('title')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors w-full justify-start"
              >
                <span>Title</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {getSortIcon('title', sortConfig)}
                </div>
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>
              <button
                onClick={() => onSort('status')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors w-full justify-start"
              >
                <span>Status</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {getSortIcon('status', sortConfig)}
                </div>
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                onClick={() => onSort('dueDate')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors w-full justify-start"
              >
                <span>Due Date</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {getSortIcon('dueDate', sortConfig)}
                </div>
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <button
                onClick={() => onSort('assignee')}
                className="flex items-center gap-1 hover:text-primary-600 transition-colors w-full justify-start"
              >
                <span>Assignee</span>
                <div className="w-4 h-4 flex items-center justify-center">
                  {getSortIcon('assignee', sortConfig)}
                </div>
              </button>
            </Table.HeaderCell>
            <Table.HeaderCell />
          </Table.HeaderRow>
        }
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
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
                      <div className="flex items-center gap-2">
                        <Avatar
                          size="small"
                          image={task.assignee.avatar}
                        >
                          {task.assignee.name.charAt(0)}
                        </Avatar>
                        <span className="text-body font-body text-default-font">
                          {task.assignee.name}
                        </span>
                      </div>
                    </Table.Cell>
              <Table.Cell>
                <div className="flex items-center justify-end gap-2">
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <IconButton
                        icon={<FeatherMoreHorizontal />}
                        onClick={() => {}}
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
                            onClick={() => onView(task)}
                          >
                            View
                          </DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem 
                            icon={<FeatherEdit2 />}
                            onClick={() => onEdit(task)}
                          >
                            Edit
                          </DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownDivider />
                          <DropdownMenu.DropdownItem 
                            icon={<FeatherTrash />}
                            onClick={() => onDelete(task)}
                          >
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
                  {getEmptyStateMessage()}
                </span>
              </div>
            </Table.Cell>
          </Table.Row>
        )}
      </Table>
    </div>
  );
} 