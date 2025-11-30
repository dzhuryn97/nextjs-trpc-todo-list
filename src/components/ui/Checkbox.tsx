import { InputHTMLAttributes } from 'react';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  className?: string;
}

export function Checkbox({ className = '', ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={`mt-1 h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 ${className}`}
      {...props}
    />
  );
}
