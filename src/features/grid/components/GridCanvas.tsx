import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGridStore } from '../store/gridStore'

export function GridCanvas() {
  const { templateColumns, templateRows, gap, justifyItems, alignItems, items, selectedId, set } = useGridStore()

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: templateColumns,
    gridTemplateRows: templateRows,
    gap,
    justifyItems: justifyItems as any,
    alignItems: alignItems as any,
    width: '100%',
    minHeight: 220,
    padding: 16,
    boxSizing: 'border-box',
    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      set({ selectedId: null })
    }
  }

  return (
    <div
      className="flex-1 min-h-[240px] rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-default"
      onClick={handleCanvasClick}
    >
      <div style={containerStyle} onClick={handleCanvasClick}>
        <AnimatePresence>
          {items.map((item) => {
            const selected = item.id === selectedId
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: selected ? 1.03 : 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={(e) => { e.stopPropagation(); set({ selectedId: item.id === selectedId ? null : item.id }) }}
                style={{ background: item.bg }}
                className="relative min-h-[56px] rounded-lg flex items-center justify-center
                  font-mono font-extrabold text-lg text-white cursor-pointer select-none"
              >
                {selected && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950" />
                )}
                {item.label}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
