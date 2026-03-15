import React from 'react'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  defaultValue?: number
  onChange: (value: number) => void
}

export function Slider({ label, value, min, max, step = 1, defaultValue, onChange }: SliderProps) {
  const handleDoubleClick = () => {
    if (defaultValue !== undefined) {
      onChange(defaultValue)
    }
  }

  const isModified = defaultValue !== undefined && value !== defaultValue

  return (
    <div className="mb-3">
      <label className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1 font-mono text-slate-500 dark:text-slate-400">
        <span className="flex items-center gap-1">
          {label}
          {isModified && (
            <span
              title="Double-click slider to reset"
              className="w-1.5 h-1.5 rounded-full bg-brand-500 inline-block"
            />
          )}
        </span>
        <span
          className="text-brand-600 dark:text-brand-400 cursor-pointer select-none"
          title={defaultValue !== undefined ? `Double-click to reset to ${defaultValue}` : undefined}
          onDoubleClick={handleDoubleClick}
        >
          {value}
        </span>
      </label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onDoubleClick={handleDoubleClick}
        className="w-full h-1.5 rounded accent-brand-600 cursor-pointer"
        title={defaultValue !== undefined ? `Double-click to reset to ${defaultValue}` : undefined}
      />
    </div>
  )
}
