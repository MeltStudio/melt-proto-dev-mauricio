import React from 'react';

interface SelectProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  error?: string;
  children: React.ReactNode;
}

interface SelectOptionProps {
  value: string;
  children: React.ReactNode;
}

export function Select({ label, value, onChange, disabled, error, children }: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-default-font">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        className="flex h-10 w-full items-center justify-between rounded-md border border-solid border-neutral-border bg-default-background px-3 py-2 text-sm text-default-font placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {children}
      </select>
      {error && (
        <span className="text-sm text-error-600">{error}</span>
      )}
    </div>
  );
}

Select.Option = function SelectOption({ value, children }: SelectOptionProps) {
  return (
    <option value={value}>
      {children}
    </option>
  );
}; 