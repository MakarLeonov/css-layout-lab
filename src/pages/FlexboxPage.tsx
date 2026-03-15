import React, { useEffect, useCallback } from 'react'
import { Plus, RotateCcw } from 'lucide-react'
import { FlexControls } from '@/features/flexbox/components/FlexControls'
import { FlexCanvas } from '@/features/flexbox/components/FlexCanvas'
import { FlexCSSPanel } from '@/features/flexbox/components/FlexCSSPanel'
import { useFlexboxStore } from '@/features/flexbox/store/flexboxStore'
import { Button } from '@/components/ui'
import { useTranslation } from '@/hooks/useTranslation'
import { getUrlState } from '@/hooks/useUrlState'
import { useGlobalDeselect } from '@/hooks/useGlobalDeselect'
import type { FlexboxState } from '@/features/flexbox/store/flexboxStore'

export function FlexboxPage() {
  const store = useFlexboxStore()
  const { t } = useTranslation()

  // Global deselect — clicking anywhere outside controls clears selection
  const deselect = useCallback(() => store.set({ selectedId: null }), [store])
  useGlobalDeselect(deselect, !!store.selectedId)

  useEffect(() => {
    const urlState = getUrlState<Partial<FlexboxState>>()
    if (urlState) store.loadState(urlState)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(tag)) return
      switch (e.key.toLowerCase()) {
        case 'a': store.addItem(); break
        case 'd': if (store.selectedId) store.removeItem(store.selectedId); break
        case 'r': store.reset(); break
        case 'c':
          import('@/features/flexbox/utils/cssGen').then(({ generateFlexCSS }) => {
            const sel = store.items.find((i) => i.id === store.selectedId) ?? null
            navigator.clipboard.writeText(generateFlexCSS(store, sel))
          })
          break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [store])

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      <FlexControls />

      <div className="flex-1 flex flex-col gap-3 p-4 overflow-auto min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" onClick={store.addItem}>
            <Plus size={12} /> {t('addItem')}
          </Button>
          <Button size="sm" onClick={store.reset}>
            <RotateCcw size={12} /> {t('reset')}
          </Button>
        </div>

        <FlexCanvas />

        {store.showAxes && (
          <div className="flex gap-4 px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 shrink-0 text-[11px] font-mono font-semibold flex-wrap">
            <span className="text-brand-700 dark:text-brand-300">
              ■ Main axis: {store.direction.includes('column') ? 'vertical (top → bottom)' : 'horizontal (left → right)'}
            </span>
            <span className="text-cyan-700 dark:text-cyan-300">
              ■ Cross axis: {store.direction.includes('column') ? 'horizontal' : 'vertical'}
            </span>
          </div>
        )}
      </div>

      <FlexCSSPanel />
    </div>
  )
}
