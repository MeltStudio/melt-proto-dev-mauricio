import React from "react";
import { TextField } from "@/ui/components/TextField";
import { Select } from "@/ui/components/Select";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherSearch, FeatherX } from "@subframe/core";
import { SortField } from "./types";
import { statusOptions, sortOptions } from "./utils";

interface TaskFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onClearStatusFilter: () => void;
  sortField: SortField;
  onSortChange: (field: SortField) => void;
}

export function TaskFilters({
  searchQuery,
  onSearchChange,
  onClearSearch,
  statusFilter,
  onStatusFilterChange,
  onClearStatusFilter,
  sortField,
  onSortChange,
}: TaskFiltersProps) {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <TextField
        variant="filled"
        label=""
        helpText=""
        icon={<FeatherSearch />}
      >
        <TextField.Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => onSearchChange(event.target.value)}
        />
      </TextField>
      {searchQuery && (
        <IconButton
          icon={<FeatherX />}
          onClick={onClearSearch}
          className="text-neutral-400 hover:text-neutral-600"
        />
      )}
      <div className="flex items-center gap-2">
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
          placeholder="All Statuses"
        >
          {statusOptions
            .filter(option => option.value !== "")
            .map(option => (
              <Select.Item key={option.value} value={option.value}>
                {option.label}
              </Select.Item>
            ))}
        </Select>
        {statusFilter && (
          <IconButton
            icon={<FeatherX />}
            onClick={onClearStatusFilter}
            className="text-neutral-400 hover:text-neutral-600"
          />
        )}
      </div>
      <Select
        value={sortField}
        onValueChange={(value) => onSortChange(value as SortField)}
      >
        {sortOptions.map(option => (
          <Select.Item key={option.value} value={option.value}>
            {option.label}
          </Select.Item>
        ))}
      </Select>
    </div>
  );
} 