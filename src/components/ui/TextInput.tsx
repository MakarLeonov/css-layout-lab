import React from 'react'

interface TextInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function TextInput({ label, value, onChange, placeholder }: TextInputProps) {
  return (
    <div className="mb-3">
      <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-500 dark:text-slate-400 font-mono">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 rounded-md text-[12px] font-mono font-medium
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-brand-500/40
          transition-colors"
      />
    </div>
  )
}
