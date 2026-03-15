import React, { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Select, Slider, CodeBlock, SectionTitle, Button } from '@/components/ui'
import { ITEM_COLORS } from '@/features/flexbox/store/flexboxStore'

interface OverflowItem {
  id: number
  label: string
  bg: string
}

const makeItem = (id: number): OverflowItem => ({
  id,
  label: `Overflow item ${id}`,
  bg: ITEM_COLORS[(id - 1) % ITEM_COLORS.length],
})

const INITIAL_ITEMS: OverflowItem[] = Array.from({ length: 8 }, (_, i) => makeItem(i + 1))

export function OverflowPage() {
  const [overflow, setOverflow] = useState<string>('visible')
  const [containerW, setContainerW] = useState(220)
  const [containerH, setContainerH] = useState(140)
  const [items, setItems] = useState<OverflowItem[]>(INITIAL_ITEMS)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const addItem = () => {
    const id = Math.max(0, ...items.map((i) => i.id)) + 1
    setItems((prev) => [...prev, makeItem(id)])
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    if (selectedId === id) setSelectedId(null)
  }

  const css = `.container {
  width: ${containerW}px;
  height: ${containerH}px;
  overflow: ${overflow};
}`

  const OVERFLOW_DESCRIPTIONS: Record<string, string> = {
    visible: 'Content renders outside the box. No clipping.',
    hidden:  'Content is clipped. No scrollbar. Overflow is invisible.',
    scroll:  'Scrollbars always shown, content scrollable.',
    auto:    'Scrollbars appear only when needed.',
  }

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* Controls */}
      <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        <SectionTitle>Overflow Controls</SectionTitle>

        <Select
          label="overflow"
          value={overflow}
          options={['visible', 'hidden', 'scroll', 'auto'].map((v) => ({ value: v, label: v }))}
          onChange={setOverflow}
        />

        <Slider label="container width"  value={containerW} min={100} max={380} defaultValue={220} onChange={setContainerW} />
        <Slider label="container height" value={containerH} min={60}  max={280} defaultValue={140} onChange={setContainerH} />

        <div className="mt-1 mb-3 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
          {OVERFLOW_DESCRIPTIONS[overflow]}
        </div>

        {/* Item management */}
        <SectionTitle>Items ({items.length})</SectionTitle>
        <div className="flex gap-2 mb-3">
          <Button size="sm" onClick={addItem} className="flex-1 justify-center">
            <Plus size={11} /> Add
          </Button>
          <Button
            size="sm"
            variant="soft-danger"
            disabled={items.length === 0}
            onClick={() => {
              if (items.length === 0) return
              const last = items[items.length - 1]
              removeItem(last.id)
            }}
            className="flex-1 justify-center"
          >
            <Trash2 size={11} /> Remove
          </Button>
        </div>

        <CodeBlock code={css} />
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
        <div className="flex flex-col items-center gap-3">
          {/* Label above */}
          <div className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
            {containerW}px × {containerH}px · overflow:{' '}
            <span className="text-brand-600 dark:text-brand-400 font-bold">{overflow}</span>
            {' '}· {items.length} items
          </div>

          <div
            style={{
              width: containerW,
              height: containerH,
              overflow: overflow as any,
              transition: 'width 0.25s, height 0.25s',
            }}
            className="rounded-xl border-2 border-brand-500 bg-white dark:bg-slate-900 p-2 shadow-md"
          >
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedId(item.id === selectedId ? null : item.id)}
                style={{ background: item.bg }}
                className={`rounded-md px-3 py-2 mb-1.5 text-white text-[11px] font-mono font-bold whitespace-nowrap cursor-pointer select-none transition-all ${
                  item.id === selectedId
                    ? 'ring-2 ring-amber-400 ring-offset-1 ring-offset-white dark:ring-offset-slate-900 opacity-100'
                    : 'opacity-90 hover:opacity-100'
                }`}
              >
                {item.label}
              </div>
            ))}
          </div>

          {selectedId && (
            <p className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Item #{selectedId} selected · click Remove in the panel to delete it
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
