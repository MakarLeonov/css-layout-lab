import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFlexboxStore } from '../store/flexboxStore'

export function FlexCanvas() {
  const { direction, justifyContent, alignItems, flexWrap, gap, items, selectedId, animate, showAxes, set } = useFlexboxStore()

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction as any,
    justifyContent,
    alignItems,
    flexWrap: flexWrap as any,
    gap,
    width: '100%',
    height: '100%',
    minHeight: 220,
    padding: 16,
    position: 'relative',
    borderRadius: 8,
    boxSizing: 'border-box',
  }

  const isColumn = direction.includes('column')

  // Deselect when clicking the canvas background (not on items)
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      set({ selectedId: null })
    }
  }

  return (
    <div
      className="relative flex-1 min-h-[240px] rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 overflow-hidden cursor-default"
      onClick={handleCanvasClick}
    >
      {/* Axis Labels */}
      {showAxes && (
        <>
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="bg-brand-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
              {isColumn ? 'Cross →' : 'Main →'}
            </span>
          </div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
            style={{ transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}>
            <span className="bg-cyan-500 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              {isColumn ? 'Main ↓' : 'Cross ↓'}
            </span>
          </div>
        </>
      )}

      <div style={containerStyle} onClick={handleCanvasClick}>
        <AnimatePresence>
          {items.map((item) => {
            const selected = item.id === selectedId
            const itemStyle: React.CSSProperties = {
              flexGrow: item.grow,
              flexShrink: item.shrink,
              flexBasis: item.basis,
              order: item.order,
              alignSelf: item.alignSelf as any,
              background: item.bg,
              minWidth: 52,
              minHeight: 52,
            }

            return (
              <motion.div
                key={item.id}
                layout={animate}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: selected ? 1.05 : 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onClick={(e) => { e.stopPropagation(); set({ selectedId: item.id === selectedId ? null : item.id }) }}
                style={itemStyle}
                className="flex items-center justify-center rounded-lg cursor-pointer select-none
                  font-mono font-extrabold text-lg text-white relative"
              >
                {/* Selection ring */}
                {selected && (
                  <div className="absolute inset-0 rounded-lg ring-2 ring-amber-400 ring-offset-2 ring-offset-slate-50 dark:ring-offset-slate-950" />
                )}
                {/* Item number */}
                {item.label}
                {/* Selected dot */}
                {selected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-400 block" />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
