import React from 'react'
import clsx from 'clsx'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  label: string
  value: string
  options: Option[]
  onChange: (value: string) => void
}

export function Select({ label, value, options, onChange }: SelectProps) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-500 dark:text-slate-400 font-mono">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          'w-full px-2 py-1.5 rounded-md text-[12px] font-mono font-medium',
          'border border-slate-200 dark:border-slate-700',
          'bg-white dark:bg-slate-800',
          'text-slate-800 dark:text-slate-100',
          'focus:outline-none focus:ring-2 focus:ring-brand-500/40',
          'transition-colors cursor-pointer'
        )}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}
