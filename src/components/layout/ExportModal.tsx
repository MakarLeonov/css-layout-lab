import React from 'react'
import { X, ExternalLink } from 'lucide-react'
import { Button, CodeBlock, SectionTitle } from '@/components/ui'
import { useFlexboxStore } from '@/features/flexbox/store/flexboxStore'
import { generateFlexCSS, generateExportHTML } from '@/features/flexbox/utils/cssGen'
import { exportToCodeSandbox, exportToStackBlitz } from '@/utils/export'

interface ExportModalProps {
  onClose: () => void
}

export function ExportModal({ onClose }: ExportModalProps) {
  const state = useFlexboxStore()
  const selectedItem = state.items.find((i) => i.id === state.selectedId) ?? null
  const css = generateFlexCSS(state, selectedItem)
  const html = generateExportHTML(state)

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-mono font-extrabold text-lg text-slate-900 dark:text-slate-100">
            Export Layout
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 flex flex-col gap-5">
          <div>
            <SectionTitle>Export to Sandbox</SectionTitle>
            <div className="flex gap-2">
              <Button onClick={() => exportToCodeSandbox(state)}>
                <ExternalLink size={12} /> CodeSandbox
              </Button>
              <Button onClick={() => exportToStackBlitz(state)}>
                <ExternalLink size={12} /> StackBlitz
              </Button>
            </div>
          </div>

          <div>
            <SectionTitle>CSS</SectionTitle>
            <CodeBlock code={css} />
          </div>

          <div>
            <SectionTitle>HTML</SectionTitle>
            <CodeBlock code={html} />
          </div>
        </div>
      </div>
    </div>
  )
}
