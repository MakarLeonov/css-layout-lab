import React from 'react'
import { Trash2 } from 'lucide-react'
import { Select, Slider, SectionTitle, TextInput, Button } from '@/components/ui'
import { useGridStore } from '../store/gridStore'
import { useTranslation } from '@/hooks/useTranslation'

const COLUMN_PRESETS = [
  { label: '2 cols', value: '1fr 1fr' },
  { label: '3 cols', value: '1fr 1fr 1fr' },
  { label: '4 cols', value: '1fr 1fr 1fr 1fr' },
  { label: 'Sidebar', value: '240px 1fr' },
  { label: 'Holy Grail', value: '200px 1fr 200px' },
  { label: 'Auto fill', value: 'repeat(auto-fill, minmax(120px, 1fr))' },
]

export function GridControls() {
  const store = useGridStore()
  const { t } = useTranslation()
  const selectedItem = store.items.find((i) => i.id === store.selectedId) ?? null

  return (
    <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
      <SectionTitle>{t('container')}</SectionTitle>

      <TextInput
        label={t('gridColumns')}
        value={store.templateColumns}
        onChange={(v) => store.set({ templateColumns: v })}
      />

      <TextInput
        label={t('gridRows')}
        value={store.templateRows}
        onChange={(v) => store.set({ templateRows: v })}
      />

      <Slider label={t('gap')} value={store.gap} min={0} max={48} defaultValue={8} onChange={(v) => store.set({ gap: v })} />

      <Select
        label={t('justifyItems')}
        value={store.justifyItems}
        options={['stretch', 'start', 'center', 'end'].map((v) => ({ value: v, label: v }))}
        onChange={(v) => store.set({ justifyItems: v })}
      />

      <Select
        label={t('alignItems')}
        value={store.alignItems}
        options={['stretch', 'start', 'center', 'end'].map((v) => ({ value: v, label: v }))}
        onChange={(v) => store.set({ alignItems: v })}
      />

      {/* Remove button — only when item is selected */}
      {selectedItem && (
        <>
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 font-mono mb-2">
            Selected Item #{selectedItem.id}
          </div>
          <Button
            variant="soft-danger"
            size="sm"
            onClick={() => store.removeItem(selectedItem.id)}
            className="w-full justify-center"
          >
            <Trash2 size={11} /> {t('removeItem')}
          </Button>
        </>
      )}

      <div className="h-px bg-slate-100 dark:bg-slate-800 my-3" />
      <SectionTitle>{t('presetColumns')}</SectionTitle>

      <div className="flex flex-col gap-1">
        {COLUMN_PRESETS.map((p) => (
          <Button
            key={p.value}
            size="sm"
            onClick={() => store.set({ templateColumns: p.value })}
            className="w-full justify-start text-left"
          >
            {p.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
