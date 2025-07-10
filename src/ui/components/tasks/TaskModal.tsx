import React, { useState } from 'react';
import { Button } from '@/ui/components/Button';
import { TextField } from '@/ui/components/TextField';
import { Select } from '@/ui/components/Select';
import { Task, TaskStatus } from '@/types/task';

interface TaskModalProps {
  open: boolean;
  mode: 'view' | 'edit' | 'create';
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

// Mock assignee options for demo
const assigneeOptions = [
  { name: 'Alice', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300' },
  { name: 'John', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300' },
  { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300' },
  { name: 'Mike', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300' },
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
    if (task) {
      setForm(task);
    } else if (mode === 'create') {
      setForm({
        id: '',
        title: '',
        description: '',
        status: TaskStatus.Pending,
        dueDate: '',
        assignee: { name: '', avatar: '' },
      });
    }
  }, [task, mode]);

  function validate() {
    const v: { [k: string]: string } = {};
    if (!form.title.trim()) v.title = 'Title is required.';
    if (!form.description.trim()) v.description = 'Description is required.';
    if (!form.dueDate) v.dueDate = 'Due date is required.';
    if (!form.status) v.status = 'Status is required.';
    if ((mode === 'create' || mode === 'edit') && !form.assignee.name) v.assignee = 'Assignee is required.';
    setValidation(v);
    return Object.keys(v).length === 0;
  }

  function handleChange(field: keyof Task, value: any) {
    setForm((f) => ({ ...f, [field]: value }));
    setTouched(true);
  }

  function handleAssigneeChange(assigneeName: string) {
    const assignee = assigneeOptions.find(a => a.name === assigneeName);
    setForm((f) => ({ 
      ...f, 
      assignee: assignee || { name: assigneeName, avatar: '' } 
    }));
    setTouched(true);
  }

  function handleSave() {
    if (validate() && onSave) {
      onSave(form);
    }
  }

  const isReadOnly = mode === 'view';
  const isCreate = mode === 'create';
  const isEdit = mode === 'edit';

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold text-default-font">
            {mode === 'view' ? 'Task Details' : mode === 'edit' ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
          >
            ✕
          </button>
        </div>
        
        <div className="flex flex-col gap-4 p-4">
          <TextField
            label="Title"
            error={!!validation.title}
            helpText={validation.title}
          >
            <TextField.Input
              value={form.title}
              onChange={(e) => handleChange('title', e.target.value)}
              disabled={isReadOnly}
              placeholder="Enter task title"
            />
          </TextField>
          
          <TextField
            label="Description"
            error={!!validation.description}
            helpText={validation.description}
          >
            <TextField.Input
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              disabled={isReadOnly}
              placeholder="Enter task description"
            />
          </TextField>
          
          <Select
            label="Status"
            value={form.status}
            onChange={(value) => handleChange('status', value)}
            disabled={isReadOnly}
            error={validation.status}
          >
            {statusOptions.map(opt => (
              <Select.Option key={opt.value} value={opt.value}>{opt.label}</Select.Option>
            ))}
          </Select>
          
          <TextField
            label="Due Date"
            error={!!validation.dueDate}
            helpText={validation.dueDate}
          >
            <TextField.Input
              type="date"
              value={form.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              disabled={isReadOnly}
            />
          </TextField>
          
          {(isCreate || isEdit) ? (
            <Select
              label="Assignee"
              value={form.assignee.name}
              onChange={handleAssigneeChange}
              error={validation.assignee}
            >
              <Select.Option value="">Select an assignee</Select.Option>
              {assigneeOptions.map(assignee => (
                <Select.Option key={assignee.name} value={assignee.name}>
                  {assignee.name}
                </Select.Option>
              ))}
            </Select>
          ) : (
            <div>
              <label className="block text-sm font-medium mb-1">Assignee</label>
              <div className="flex items-center gap-2">
                <img src={form.assignee.avatar} alt={form.assignee.name} className="w-8 h-8 rounded-full" />
                <span>{form.assignee.name}</span>
              </div>
            </div>
          )}
          
          {error && <div className="text-error-600 text-sm">{error}</div>}
        </div>
        
        <div className="flex justify-end gap-2 p-4 border-t border-neutral-200">
          {isReadOnly ? (
            <Button onClick={onClose}>Close</Button>
          ) : (
            <>
              <Button variant="neutral-tertiary" onClick={onClose} disabled={loading}>Cancel</Button>
              <Button onClick={handleSave} loading={loading} disabled={loading}>
                {isCreate ? 'Create' : 'Save'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 