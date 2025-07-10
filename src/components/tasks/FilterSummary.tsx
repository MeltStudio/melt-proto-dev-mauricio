import React from "react";
import { Badge } from "@/ui/components/Badge";
import { TaskStatus } from "@/types/task";
import { getStatusBadgeVariant, getStatusLabel, sortOptions } from "./utils";

interface FilterSummaryProps {
  statusFilter: string;
  searchQuery: string;
  sortField: string;
  sortDirection: string;
  totalTasks: number;
  filteredTasks: number;
  currentPage: number;
  totalPages: number;
}

export function FilterSummary({
  statusFilter,
  searchQuery,
  sortField,
  sortDirection,
  totalTasks,
  filteredTasks,
  currentPage,
  totalPages,
}: FilterSummaryProps) {
  const hasActiveFilters = statusFilter || searchQuery || sortField !== 'dueDate' || sortDirection !== 'asc';

  if (!hasActiveFilters) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-subtext-color">
      {statusFilter && (
        <>
          <span>Filtered by:</span>
          <Badge variant={getStatusBadgeVariant(statusFilter as TaskStatus)}>
            {getStatusLabel(statusFilter as TaskStatus)}
          </Badge>
        </>
      )}
      {searchQuery && (
        <>
          {statusFilter && <span>•</span>}
          <span>Searched for:</span>
          <Badge variant="neutral">
            &quot;{searchQuery}&quot;
          </Badge>
        </>
      )}
      {(sortField !== 'dueDate' || sortDirection !== 'asc') && (
        <>
          {(statusFilter || searchQuery) && <span>•</span>}
          <span>Sorted by:</span>
          <Badge variant="neutral">
            {sortOptions.find(opt => opt.value === sortField)?.label} 
            {sortDirection === 'asc' ? ' ↑' : ' ↓'}
          </Badge>
        </>
      )}
      <span>({filteredTasks} of {totalTasks} tasks)</span>
      {totalPages > 1 && (
        <span>• Page {currentPage} of {totalPages}</span>
      )}
    </div>
  );
} 