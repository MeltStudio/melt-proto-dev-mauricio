export type SortField = 'title' | 'status' | 'dueDate' | 'assignee';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface StatusOption {
  value: string;
  label: string;
}

export interface SortOption {
  value: SortField;
  label: string;
} 