import React, { useState } from 'react';
import { Dialog } from '@subframe/core';
import { Button } from '@/ui/components/Button';
import { TextField } from '@/ui/components/TextField';
import { Select } from '@/ui/components/Select';
import { Task, TaskStatus } from '@/types/task';

interface TaskModalProps {
  open: boolean;
  mode: 'view' | 'edit';
  task: Task | null;
  onSave?: (task: Partial<Task>) => void;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
}

const statusOptions = [
  { value: TaskStatus.InProgress, label: 'In Progress' },
  { value: TaskStatus.Pending, label: 'Pending' },
  { value: TaskStatus.Completed, label: 'Completed' },
];

export function TaskModal({ open, mode, task, onSave, onClose, loading, error }: TaskModalProps) {
  const [form, setForm] = useState(() => task || {
    id: '',
    title: '',
    description: '',
    status: TaskStatus.Pending,
    dueDate: '',
    assignee: { name: '', avatar: '' },
  });
  const [touched, setTouched] = useState(false);
  const [validation, setValidation] = useState<{ [k: string]: string }>({});

  React.useEffect(() => {
    if (task) setForm(task);
  }, [task]);

  function validate() {
    const v: { [k: string]: string } = {};
    if (!form.title.trim()) v.title = 'Title is required.';
    if (!form.description.trim()) v.description = 'Description is required.';
    if (!form.dueDate) v.dueDate = 'Due date is required.';
    if (!form.status) v.status = 'Status is required.';
    setValidation(v);
    return Object.keys(v).length === 0;
  }

  function handleChange(field: keyof Task, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
    setTouched(true);
  }

  function handleSave() {
    if (validate() && onSave) {
      onSave(form);
    }
  }

  const isReadOnly = mode === 'view';

  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>{mode === 'view' ? 'Task Details' : 'Edit Task'}</Dialog.Title>
      <div className="flex flex-col gap-4 p-4">
        <TextField
          label="Title"
          value={form.title}
          onChange={value => handleChange('title', value)}
          disabled={isReadOnly}
          error={validation.title}
        />
        <TextField
          label="Description"
          value={form.description}
          onChange={value => handleChange('description', value)}
          disabled={isReadOnly}
          error={validation.description}
        />
        <Select
          label="Status"
          value={form.status}
          onChange={value => handleChange('status', value)}
          disabled={isReadOnly}
          error={validation.status}
        >
          {statusOptions.map(opt => (
            <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
          ))}
        </Select>
        <TextField
          label="Due Date"
          type="date"
          value={form.dueDate}
          onChange={value => handleChange('dueDate', value)}
          disabled={isReadOnly}
          error={validation.dueDate}
        />
        <div>
          <label className="block text-sm font-medium mb-1">Assignee</label>
          <div className="flex items-center gap-2">
            <img src={form.assignee.avatar} alt={form.assignee.name} className="w-8 h-8 rounded-full" />
            <span>{form.assignee.name}</span>
          </div>
        </div>
        {error && <div className="text-error-600 text-sm">{error}</div>}
      </div>
      <div className="flex justify-end gap-2 p-4 border-t border-neutral-200">
        {isReadOnly ? (
          <Button onClick={onClose}>Close</Button>
        ) : (
          <>
            <Button variant="neutral-tertiary" onClick={onClose} disabled={loading}>Cancel</Button>
            <Button onClick={handleSave} loading={loading} disabled={loading}>Save</Button>
          </>
        )}
      </div>
    </Dialog>
  );
} 