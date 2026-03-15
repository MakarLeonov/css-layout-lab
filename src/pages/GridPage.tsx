import React, { useCallback } from 'react'
import { Plus, RotateCcw } from 'lucide-react'
import { GridControls } from '@/features/grid/components/GridControls'
import { GridCanvas } from '@/features/grid/components/GridCanvas'
import { GridCSSPanel } from '@/features/grid/components/GridCSSPanel'
import { useGridStore } from '@/features/grid/store/gridStore'
import { Button } from '@/components/ui'
import { useTranslation } from '@/hooks/useTranslation'
import { useGlobalDeselect } from '@/hooks/useGlobalDeselect'

export function GridPage() {
  const store = useGridStore()
  const { t } = useTranslation()

  const deselect = useCallback(() => store.set({ selectedId: null }), [store])
  useGlobalDeselect(deselect, !!store.selectedId)

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      <GridControls />

      <div className="flex-1 flex flex-col gap-3 p-4 overflow-auto min-w-0">
        <div className="flex gap-2 flex-wrap shrink-0">
          <Button size="sm" onClick={store.addItem}>
            <Plus size={12} /> {t('addItem')}
          </Button>
          <Button size="sm" onClick={store.reset}>
            <RotateCcw size={12} /> {t('reset')}
          </Button>
        </div>
        <GridCanvas />
      </div>

      <GridCSSPanel />
    </div>
  )
}
