import React from 'react'
import { CodeBlock, SectionTitle } from '@/components/ui'
import { useGridStore } from '../store/gridStore'

export function GridCSSPanel() {
  const store = useGridStore()

  const css = `.container {
  display: grid;
  grid-template-columns: ${store.templateColumns};
  grid-template-rows: ${store.templateRows};
  gap: ${store.gap}px;
  justify-items: ${store.justifyItems};
  align-items: ${store.alignItems};
}`

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 p-3">
      <SectionTitle>Generated CSS</SectionTitle>
      <CodeBlock code={css} />
    </div>
  )
}
