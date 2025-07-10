import React from "react";
import { Button } from "@/ui/components/Button";
import { Task } from "@/types/task";

interface DeleteTaskModalProps {
  isOpen: boolean;
  task: Task | null;
  onConfirm: () => void;
  onClose: () => void;
  isLoading: boolean;
  error: string | null;
}

export function DeleteTaskModal({
  isOpen,
  task,
  onConfirm,
  onClose,
  isLoading,
  error,
}: DeleteTaskModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-default-font">
            Delete Task
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-body font-body text-default-font mb-4">
            Are you sure you want to delete this task? This action cannot be undone. The task will be permanently removed from your team&apos;s tasks.
          </p>
          {error && (
            <div className="text-error-600 text-sm mb-4">
              Error: {error}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t border-neutral-200">
          <Button 
            variant="neutral-tertiary" 
            onClick={onClose} 
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            variant="destructive-primary" 
            onClick={onConfirm} 
            loading={isLoading}
            disabled={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
} 