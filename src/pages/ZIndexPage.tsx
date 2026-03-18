import React, { useState, useCallback } from 'react'
import { Slider, Select, SectionTitle, CodeBlock } from '@/components/ui'
import { useGlobalDeselect } from '@/hooks/useGlobalDeselect'

interface ZItem {
  id: number
  label: string
  z: number
  x: number
  y: number
  bg: string
}

const INITIAL_ITEMS: ZItem[] = [
  { id: 1, label: 'A', z: 1, x: 30, y: 30, bg: '#6366f1' },
  { id: 2, label: 'B', z: 2, x: 80, y: 60, bg: '#8b5cf6' },
  { id: 3, label: 'C', z: 3, x: 130, y: 90, bg: '#06b6d4' },
]

export function ZIndexPage() {
  const [items, setItems] = useState<ZItem[]>(INITIAL_ITEMS)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const selected = items.find((i) => i.id === selectedId)
  const deselect = useCallback(() => setSelectedId(null), [])
  useGlobalDeselect(deselect, selectedId !== null)

  const updateItem = (id: number, patch: Partial<ZItem>) =>
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...patch } : it)))

  const css = selected
    ? `.element-${selected.label.toLowerCase()} {\n  position: absolute;\n  z-index: ${selected.z};\n  top: ${selected.y}px;\n  left: ${selected.x}px;\n}`
    : '/* Click an element to inspect it */'

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* Controls */}
      <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        <SectionTitle>Z-Index Controls</SectionTitle>

        {selected ? (
          <>
            <div className="mb-3 px-2 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300">
              Selected: Element {selected.label}
            </div>

            <Slider
              label="z-index"
              value={selected.z}
              min={0}
              max={20}
              onChange={(v) => updateItem(selected.id, { z: v })}
            />
            <Slider
              label="x (left)"
              value={selected.x}
              min={0}
              max={260}
              onChange={(v) => updateItem(selected.id, { x: v })}
            />
            <Slider
              label="y (top)"
              value={selected.y}
              min={0}
              max={180}
              onChange={(v) => updateItem(selected.id, { y: v })}
            />
          </>
        ) : (
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-600 italic">
            Click an element on the canvas to select and adjust it
          </p>
        )}

        <div className="mt-4">
          <SectionTitle>All z-index values</SectionTitle>
          <div className="flex flex-col gap-1">
            {items
              .slice()
              .sort((a, b) => b.z - a.z)
              .map((it) => (
                <div
                  key={it.id}
                  className="flex items-center gap-2 text-[11px] font-mono cursor-pointer"
                  onClick={() => setSelectedId(it.id)}
                >
                  <span
                    className="w-4 h-4 rounded"
                    style={{ background: it.bg }}
                  />
                  <span className="text-slate-600 dark:text-slate-400">
                    {it.label}
                  </span>
                  <span className="ml-auto text-brand-600 font-bold">
                    z: {it.z}
                  </span>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock code={css} />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
        <div
          className="relative w-[380px] h-[280px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden cursor-default"
          onClick={(e) => {
            // Deselect only if clicking the canvas background itself
            if (e.target === e.currentTarget) setSelectedId(null)
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              onClick={(e) => { e.stopPropagation(); setSelectedId(item.id === selectedId ? null : item.id) }}
              style={{
                position: 'absolute',
                left: item.x,
                top: item.y,
                zIndex: item.z,
                background: item.bg,
                transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
              }}
              className="w-20 h-20 rounded-xl flex flex-col items-center justify-center
                cursor-pointer select-none shadow-lg text-white font-mono font-extrabold text-2xl"
            >
              {item.id === selectedId && (
                <div className="absolute inset-0 rounded-xl ring-2 ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900" />
              )}
              {item.label}
              <span className="text-[10px] opacity-70 font-normal">z:{item.z}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
