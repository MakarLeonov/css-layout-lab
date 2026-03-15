import React from 'react'
import clsx from 'clsx'

type Variant = 'default' | 'primary' | 'ghost' | 'success' | 'danger' | 'soft-danger'
type Size = 'sm' | 'md'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  children: React.ReactNode
}

const variantClasses: Record<Variant, string> = {
  default:
    'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700',
  primary:
    'bg-brand-600 text-white hover:bg-brand-700 border border-brand-600',
  ghost:
    'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent',
  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 border border-emerald-600',
  danger:
    'bg-red-600 text-white hover:bg-red-700 border border-red-600',
  'soft-danger':
    'bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/40',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-2 py-1 text-[11px]',
  md: 'px-3 py-1.5 text-[12px]',
}

export function Button({
  variant = 'default',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-md font-mono font-semibold cursor-pointer',
        'transition-all duration-150 select-none',
        'focus:outline-none focus:ring-2 focus:ring-brand-500/40',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </button>
  )
}
