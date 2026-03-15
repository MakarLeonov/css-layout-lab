import React from 'react'

interface SectionTitleProps {
  children: React.ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="text-[10px] font-bold uppercase tracking-[0.12em] mb-2 mt-1 text-slate-400 dark:text-slate-500 font-mono">
      {children}
    </h3>
  )
}
