import React, { useState, useEffect } from "react";
import { DialogLayout } from "@/ui/layouts/DialogLayout";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherX } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { TextArea } from "@/ui/components/TextArea";
import { Select } from "@/ui/components/Select";
import { Avatar } from "@/ui/components/Avatar";
import { Button } from "@/ui/components/Button";
import { Task, TaskStatus } from "@/types/task";

interface TaskModalProps {
  open: boolean;
  mode: "view" | "edit" | "create";
  task: Task | null;
  onSave?: (task: Partial<Task>) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
}

const statusOptions = [
  { value: TaskStatus.InProgress, label: "In Progress" },
  { value: TaskStatus.Pending, label: "Pending" },
  { value: TaskStatus.Completed, label: "Completed" },
];

const assigneeOptions = [
  { name: "Alice", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" },
  { name: "John", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300" },
  { name: "Sarah", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
  { name: "Mike", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
  { name: "Emma", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" },
  { name: "David", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
  { name: "Lisa", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300" },
  { name: "Alex", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
  { name: "Rachel", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300" },
  { name: "Tom", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
  { name: "Sophie", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
  { name: "Chris", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
  { name: "Maria", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
  { name: "James", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
  { name: "Anna", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" },
  { name: "Daniel", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
  { name: "Nina", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300" },
  { name: "Kevin", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300" },
  { name: "Laura", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300" },
  { name: "Ryan", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300" },
  { name: "Grace", avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300" },
  { name: "Oliver", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300" },
  { name: "Zoe", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
];

export function TaskModal({ open, mode, task, onSave, onClose, loading, error }: TaskModalProps) {
  const [form, setForm] = useState<Task>(
    task || {
      id: "",
      title: "",
      description: "",
      status: TaskStatus.Pending,
      dueDate: "",
      assignee: { name: "", avatar: "" },
    }
  );
  const [validation, setValidation] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    if (task) {
      setForm(task);
    } else if (mode === "create") {
      setForm({
        id: "",
        title: "",
        description: "",
        status: TaskStatus.Pending,
        dueDate: "",
        assignee: { name: "", avatar: "" },
      });
    }
  }, [task, mode]);

  function validate() {
    const v: { [k: string]: string } = {};
    if (!form.title.trim()) v.title = "Title is required.";
    if (!form.description.trim()) v.description = "Description is required.";
    if (!form.dueDate) v.dueDate = "Due date is required.";
    if (!form.status) v.status = "Status is required.";
    if ((mode === "create" || mode === "edit") && !form.assignee.name) v.assignee = "Assignee is required.";
    setValidation(v);
    return Object.keys(v).length === 0;
  }

  function handleChange(field: keyof Task, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleAssigneeChange(assigneeName: string) {
    const assignee = assigneeOptions.find((a) => a.name === assigneeName);
    setForm((f) => ({ ...f, assignee: assignee || { name: assigneeName, avatar: "" } }));
  }

  function handleSave() {
    if (validate() && onSave) {
      onSave(form);
    }
  }

  const isReadOnly = mode === "view";
  const isCreate = mode === "create";
  const isEdit = mode === "edit";

  const statusValue = form.status;
  const assigneeValue = form.assignee.name;

  if (!open) return null;

  return (
    <DialogLayout open={open} onOpenChange={onClose}>
      <div className="flex h-full w-112 flex-col items-start gap-6 bg-default-background px-6 py-6">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-heading-2 font-heading-2 text-default-font">
              {isCreate ? "Create Task" : isEdit ? "Edit Task" : "Task Details"}
            </span>
          </div>
          <IconButton
            variant="neutral-secondary"
            icon={<FeatherX />}
            onClick={onClose}
          />
        </div>
        <div className="flex w-full flex-col items-start gap-6">
          <TextField className="h-auto w-full flex-none" label="Title" helpText={validation.title} error={!!validation.title}>
            <TextField.Input
              placeholder="Enter task title"
              value={form.title}
              onChange={e => handleChange('title', e.target.value)}
              disabled={isReadOnly}
            />
          </TextField>
          <TextArea
            className="h-auto w-full flex-none"
            label="Description"
            helpText={validation.description}
            error={!!validation.description}
          >
            <TextArea.Input
              placeholder="Enter task description"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              disabled={isReadOnly}
            />
          </TextArea>
          <div className="flex w-full items-start gap-4">
            <Select
              label="Status"
              placeholder="Select status"
              helpText={validation.status}
              error={!!validation.status}
              value={statusValue}
              onValueChange={value => handleChange('status', value)}
              disabled={isReadOnly}
            >
              {statusOptions.map(opt => (
                <Select.Item key={opt.value} value={opt.value}>
                  {opt.label}
                </Select.Item>
              ))}
            </Select>
            <TextField label="Due Date" helpText={validation.dueDate} error={!!validation.dueDate}>
              <TextField.Input
                type="date"
                placeholder="Select date"
                value={form.dueDate}
                onChange={e => handleChange('dueDate', e.target.value)}
                disabled={isReadOnly}
              />
            </TextField>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-body-bold font-body-bold text-default-font">Assignee</span>
            {(isCreate || isEdit) ? (
              <Select
                label="Assignee"
                placeholder="Select assignee"
                helpText={validation.assignee}
                error={!!validation.assignee}
                value={assigneeValue}
                onValueChange={handleAssigneeChange}
                disabled={isReadOnly}
              >
                {assigneeOptions.map(opt => (
                  <Select.Item key={opt.name} value={opt.name}>
                    <div className="flex items-center gap-2">
                      <Avatar image={opt.avatar} size="small">{opt.name.charAt(0)}</Avatar>
                      <span>{opt.name}</span>
                    </div>
                  </Select.Item>
                ))}
              </Select>
            ) : (
              <div className="flex items-center gap-2">
                <Avatar image={form.assignee.avatar} size="small">{form.assignee.name?.charAt(0) || '?'}</Avatar>
                <span className="text-body-bold font-body-bold text-default-font">{form.assignee.name}</span>
              </div>
            )}
          </div>
          {error && <div className="text-error-600 text-sm">{error}</div>}
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          {isReadOnly ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              <Button variant="neutral-tertiary" onClick={onClose} disabled={loading}>Cancel</Button>
              <Button onClick={handleSave} loading={loading} disabled={loading}>
                {isCreate ? 'Create Task' : 'Save Changes'}
              </Button>
            </>
          )}
        </div>
      </div>
    </DialogLayout>
  );
}
