import React, { useState } from 'react'
import { Slider, CodeBlock, SectionTitle } from '@/components/ui'
import clsx from 'clsx'

export function BoxModelPage() {
  const [margin, setMargin] = useState(24)
  const [padding, setPadding] = useState(20)
  const [border, setBorder] = useState(4)
  const [width, setWidth] = useState(160)
  const [height, setHeight] = useState(80)
  const [boxSizing, setBoxSizing] = useState<'content-box' | 'border-box'>('content-box')

  const isBorderBox = boxSizing === 'border-box'

  const totalRenderedW = isBorderBox ? width : width + border * 2 + padding * 2
  const totalRenderedH = isBorderBox ? height : height + border * 2 + padding * 2
  const contentW = isBorderBox ? Math.max(0, width - border * 2 - padding * 2) : width
  const contentH = isBorderBox ? Math.max(0, height - border * 2 - padding * 2) : height

  const css = `.element {
  width: ${width}px;
  height: ${height}px;
  margin: ${margin}px;
  padding: ${padding}px;
  border: ${border}px solid #6366f1;
  box-sizing: ${boxSizing};
}`

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* Controls */}
      <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        <SectionTitle>Box Model Controls</SectionTitle>
        <Slider label="margin"  value={margin}  min={0}  max={60}  defaultValue={24}  onChange={setMargin} />
        <Slider label="padding" value={padding} min={0}  max={60}  defaultValue={20}  onChange={setPadding} />
        <Slider label="border"  value={border}  min={0}  max={24}  defaultValue={4}   onChange={setBorder} />
        <Slider label="width"   value={width}   min={40} max={280} defaultValue={160} onChange={setWidth} />
        <Slider label="height"  value={height}  min={40} max={200} defaultValue={80}  onChange={setHeight} />

        {/* box-sizing toggle */}
        <div className="mt-3 mb-3">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-1.5 text-slate-500 dark:text-slate-400 font-mono">
            box-sizing
          </div>
          <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700">
            {(['content-box', 'border-box'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setBoxSizing(v)}
                className={clsx(
                  'flex-1 py-1.5 text-[10px] font-mono font-bold transition-all',
                  boxSizing === v
                    ? 'bg-brand-600 text-white'
                    : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                )}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-2">
          <SectionTitle>Computed size</SectionTitle>
          <div className="text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-400">
            <div>declared: <span className="text-brand-600">{width} × {height}px</span></div>
            <div>content: <span className="text-brand-600">{contentW} × {contentH}px</span></div>
            <div>+ border: <span className="text-indigo-500">+{border * 2}px</span></div>
            <div>+ padding: <span className="text-emerald-500">+{padding * 2}px</span></div>
            <div>+ margin: <span className="text-amber-500">+{margin * 2}px</span></div>
            <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
              rendered: <span className="text-slate-800 dark:text-slate-200 font-bold">{totalRenderedW} × {totalRenderedH}px</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock code={css} />
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-auto p-8 gap-6">
        <div className="flex flex-col items-center gap-6">

          {/* MARGIN layer */}
          <div
            style={{ padding: margin, transition: 'all 0.2s', isolation: 'isolate' }}
            className="relative border-2 border-dashed border-amber-400 rounded"
          >
            {margin > 0 && (
              <span className="absolute top-1 left-2 text-[10px] font-mono font-bold text-amber-500 select-none" style={{ zIndex: 10 }}>
                margin: {margin}px
              </span>
            )}

            {/* BORDER layer */}
            <div
              style={{ padding: border, background: '#6366f1', borderRadius: 6, transition: 'all 0.2s', isolation: 'isolate' }}
              className="relative"
            >
              {border > 0 && (
                <span className="absolute top-1 right-2 text-[10px] font-mono font-bold text-white select-none" style={{ zIndex: 10 }}>
                  border: {border}px
                </span>
              )}

              {/* PADDING layer */}
              <div
                style={{ padding: padding, background: 'rgb(52 211 153 / 0.6)', borderRadius: 4, transition: 'all 0.2s', isolation: 'isolate' }}
                className="relative"
              >
                {padding > 0 && (
                  <span className="absolute top-1 left-2 text-[10px] font-mono font-bold text-white select-none" style={{ zIndex: 10 }}>
                    padding: {padding}px
                  </span>
                )}

                {/* CONTENT */}
                <div
                  style={{
                    width: contentW,
                    height: contentH,
                    background: '#7c3aed',
                    borderRadius: 4,
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: 4,
                    minWidth: 40,
                    minHeight: 32,
                  }}
                  className="text-white font-mono font-bold text-[12px]"
                >
                  <span>content</span>
                  <span className="text-[10px] opacity-70">{contentW}×{contentH}px</span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border-2 border-dashed border-amber-400 inline-block" /> margin</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" /> border</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-emerald-400/60 inline-block" /> padding</div>
            <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-brand-600 inline-block" /> content</div>
          </div>
        </div>

        {/* box-sizing explainer */}
        <div className="w-full max-w-lg rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden text-[11px] font-mono">
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 font-bold text-[10px] uppercase tracking-widest text-slate-400">
            box-sizing: {boxSizing}
          </div>
          <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800">
            <div className={clsx('p-3 flex flex-col gap-1', !isBorderBox && 'bg-brand-50 dark:bg-brand-950/20')}>
              <span className={clsx('font-bold mb-1', !isBorderBox ? 'text-brand-600' : 'text-slate-400')}>content-box</span>
              <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                <code className="text-brand-600">width</code> = content only.
                Border + padding are added <strong>outside</strong> — the element grows beyond the declared size.
              </span>
              <span className="text-slate-400 mt-1">rendered = {!isBorderBox ? totalRenderedW : '?'}px wide</span>
            </div>
            <div className={clsx('p-3 flex flex-col gap-1', isBorderBox && 'bg-brand-50 dark:bg-brand-950/20')}>
              <span className={clsx('font-bold mb-1', isBorderBox ? 'text-brand-600' : 'text-slate-400')}>border-box</span>
              <span className="text-slate-500 dark:text-slate-400 leading-relaxed">
                <code className="text-brand-600">width</code> = content + padding + border.
                The element <strong>stays</strong> at the declared size — content shrinks to fit.
              </span>
              <span className="text-slate-400 mt-1">rendered = {isBorderBox ? totalRenderedW : '?'}px wide</span>
            </div>
          </div>
          <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-slate-400 leading-relaxed">
            💡 Most modern CSS resets apply <code className="text-brand-600">{'* { box-sizing: border-box }'}</code> globally — it makes sizing predictable.
          </div>
        </div>
      </div>
    </div>
  )
}
