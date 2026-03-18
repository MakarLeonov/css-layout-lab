import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { CodeBlock, SectionTitle, Button } from '@/components/ui'
import { useFlexboxStore } from '../store/flexboxStore'
import { generateFlexCSS, generateTailwind } from '../utils/cssGen'
import { useTranslation } from '@/hooks/useTranslation'
import clsx from 'clsx'

export function FlexCSSPanel() {
  const store = useFlexboxStore()
  const { t } = useTranslation()
  const [tab, setTab] = useState<'css' | 'tailwind'>('css')
  const [twCopied, setTwCopied] = useState(false)

  const selectedItem = store.items.find((i) => i.id === store.selectedId) ?? null
  const css = generateFlexCSS(store, selectedItem)
  const tw = generateTailwind(store)

  const copyTailwind = async () => {
    await navigator.clipboard.writeText(tw)
    setTwCopied(true)
    setTimeout(() => setTwCopied(false), 2000)
  }

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        {(['css', 'tailwind'] as const).map((t_) => (
          <button
            key={t_}
            onClick={() => setTab(t_)}
            className={clsx(
              'flex-1 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest transition-colors',
              tab === t_
                ? 'text-brand-600 dark:text-brand-400 border-b-2 border-brand-600'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 border-b-2 border-transparent'
            )}
          >
            {t_ === 'css' ? 'CSS' : 'Tailwind'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {tab === 'css' ? (
          <>
            <CodeBlock code={css} />
          </>
        ) : (
          <>
            <div className="rounded-lg bg-slate-950 border border-slate-800 p-3">
              <p className="font-mono text-[11px] text-cyan-300 leading-relaxed break-all">{tw}</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={copyTailwind}
              className="w-full justify-center"
            >
              {twCopied ? <><Check size={11} /> {t('copied')}</> : <><Copy size={11} /> {t('copyTailwind')}</>}
            </Button>
          </>
        )}

        {/* Axis info strip */}
        {store.showAxes && (
          <div className="rounded-lg bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 p-2 flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-brand-500 inline-block" />
              <span className="font-mono text-[10px] text-brand-700 dark:text-brand-300 font-semibold">
                Main: {store.direction.includes('column') ? 'vertical' : 'horizontal'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-cyan-500 inline-block" />
              <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-300 font-semibold">
                Cross: {store.direction.includes('column') ? 'horizontal' : 'vertical'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
