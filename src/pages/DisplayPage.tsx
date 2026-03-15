import React, { useState } from 'react'
import { Select, CodeBlock, SectionTitle } from '@/components/ui'
import { ITEM_COLORS } from '@/features/flexbox/store/flexboxStore'

const DISPLAY_VALUES = ['block', 'inline', 'inline-block', 'flex', 'grid', 'none']

const DISPLAY_DESCRIPTIONS: Record<string, string> = {
  block: 'Takes full width, starts on a new line. Width/height fully respected.',
  inline: 'Flows inline with text. Width/height ignored. No vertical margin.',
  'inline-block': 'Inline flow but respects width/height and all box model properties.',
  flex: 'Creates a flex formatting context. Children become flex items.',
  grid: 'Creates a grid formatting context. Children become grid items.',
  none: 'Element is removed from layout entirely (not just invisible).',
}

export function DisplayPage() {
  const [display, setDisplay] = useState('block')

  const css = `.element {
  display: ${display};
}`

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* Controls */}
      <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        <SectionTitle>Display Value</SectionTitle>

        <Select
          label="display"
          value={display}
          options={DISPLAY_VALUES.map((v) => ({ value: v, label: v }))}
          onChange={setDisplay}
        />

        <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
          {DISPLAY_DESCRIPTIONS[display]}
        </div>

        <div className="mt-4">
          <CodeBlock code={css} />
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-8">
        <div className="w-full max-w-[480px] min-h-[200px] p-5 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-widest">parent container</div>

          {/* Some text context */}
          <p className="text-[12px] font-mono text-slate-500 dark:text-slate-400 mb-2">
            Text before elements →{' '}
            {[1, 2, 3].map((n, i) => (
              <span
                key={n}
                style={{
                  display,
                  background: ITEM_COLORS[i],
                  color: '#fff',
                  padding: display === 'grid' ? 0 : '8px 14px',
                  borderRadius: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800,
                  fontSize: 14,
                  minWidth: 52,
                  minHeight: display === 'grid' ? 52 : undefined,
                  margin: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.25s',
                }}
              >
                {n}
              </span>
            ))}
            {' '}← Text after
          </p>
        </div>
      </div>
    </div>
  )
}
