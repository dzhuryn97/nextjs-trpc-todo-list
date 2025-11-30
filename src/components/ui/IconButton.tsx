import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'danger';
}

export function IconButton({
  children,
  variant = 'default',
  className = '',
  ...props
}: IconButtonProps) {
  const baseClasses = 'transition-colors';
  const variantClasses = {
    default: 'text-slate-400 hover:text-slate-600',
    danger: 'text-slate-400 hover:text-red-600',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
