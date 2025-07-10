import React from "react";
import { Button } from "@/ui/components/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalTasks: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  totalTasks,
  startIndex,
  endIndex,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex w-full items-center justify-between px-6 py-4 border-t border-neutral-border">
      <div className="flex items-center gap-2 text-sm text-subtext-color">
        <span>
          Showing {startIndex + 1} to {Math.min(endIndex, totalTasks)} of {totalTasks} tasks
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="neutral-tertiary"
          size="small"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          First
        </Button>
        
        <Button
          variant="neutral-tertiary"
          size="small"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNumber}
                variant={currentPage === pageNumber ? "brand-primary" : "neutral-tertiary"}
                size="small"
                onClick={() => onPageChange(pageNumber)}
                className="min-w-[32px]"
              >
                {pageNumber}
              </Button>
            );
          })}
        </div>
        
        <Button
          variant="neutral-tertiary"
          size="small"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
        
        <Button
          variant="neutral-tertiary"
          size="small"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
} 