import React from 'react'

interface ToggleProps {
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center gap-2 mb-2 cursor-pointer bg-transparent border-0 p-0"
    >
      <div
        className="relative w-8 h-4 rounded-full transition-colors duration-200"
        style={{ background: value ? '#7c3aed' : '#d1d5db' }}
      >
        <div
          className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-200"
          style={{ left: value ? '18px' : '2px' }}
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-slate-500 dark:text-slate-400">
        {label}
      </span>
    </button>
  )
}
