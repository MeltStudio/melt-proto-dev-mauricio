import React from "react";
import { TaskStatus } from "@/types/task";
import { SortField, SortDirection } from "./types";
import { FeatherArrowUpDown, FeatherArrowUp, FeatherArrowDown } from "@subframe/core";

export const getStatusBadgeVariant = (status: TaskStatus) => {
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

export const getStatusLabel = (status: TaskStatus) => {
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

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getSortIcon = (field: SortField, sortConfig: { field: SortField; direction: SortDirection }) => {
  if (sortConfig.field !== field) {
    return <FeatherArrowUpDown className="w-4 h-4" />;
  }
  return sortConfig.direction === 'asc' ? 
    <FeatherArrowUp className="w-4 h-4" /> : 
    <FeatherArrowDown className="w-4 h-4" />;
};

export const statusOptions = [
  { value: "", label: "All Statuses" },
  { value: TaskStatus.InProgress, label: "In Progress" },
  { value: TaskStatus.Pending, label: "Pending" },
  { value: TaskStatus.Completed, label: "Completed" },
];

export const sortOptions = [
  { value: 'title' as SortField, label: 'Title' },
  { value: 'status' as SortField, label: 'Status' },
  { value: 'dueDate' as SortField, label: 'Due Date' },
  { value: 'assignee' as SortField, label: 'Assignee' },
]; 