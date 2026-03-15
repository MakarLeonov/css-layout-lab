import React, { useState } from 'react'
import { Zap, ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, SectionTitle, CodeBlock } from '@/components/ui'
import { parseCSS, cssToFlexboxState, getParsedDisplay } from '@/utils/cssParser'
import { useFlexboxStore } from '@/features/flexbox/store/flexboxStore'
import { useTranslation } from '@/hooks/useTranslation'
import { useNavigate } from 'react-router-dom'

const EXAMPLES = [
  {
    label: 'Centered flex',
    css: `display: flex;\njustify-content: center;\nalign-items: center;`,
  },
  {
    label: 'Navbar',
    css: `display: flex;\nflex-direction: row;\njustify-content: space-between;\nalign-items: center;\nflex-wrap: nowrap;\ngap: 16px;`,
  },
  {
    label: 'Column stack',
    css: `display: flex;\nflex-direction: column;\njustify-content: flex-start;\nalign-items: stretch;\ngap: 12px;`,
  },
  {
    label: 'Wrap grid',
    css: `display: flex;\nflex-direction: row;\nflex-wrap: wrap;\njustify-content: flex-start;\nalign-items: flex-start;\ngap: 8px;`,
  },
]

export function ReversePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { loadState } = useFlexboxStore()

  const [cssInput, setCssInput] = useState('')
  const [parsed, setParsed] = useState<Record<string, string> | null>(null)
  const [applied, setApplied] = useState(false)

  const handleParse = () => {
    const raw = parseCSS(cssInput)
    setParsed(getParsedDisplay(raw))
    const flexState = cssToFlexboxState(cssInput)
    if (Object.keys(flexState).length > 0) {
      loadState(flexState)
      setApplied(true)
      setTimeout(() => setApplied(false), 3000)
    }
  }

  const loadExample = (css: string) => {
    setCssInput(css)
    setParsed(null)
    setApplied(false)
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div>
          <h1 className="font-mono font-extrabold text-xl text-slate-900 dark:text-slate-100">
            {t('reverseMode')}
          </h1>
          <p className="text-[12px] font-mono text-slate-500 dark:text-slate-400 mt-1">
            Paste any CSS snippet — the tool parses it and applies the relevant controls to the Flexbox playground automatically.
          </p>
        </div>

        {/* Info banner */}
        <div className="flex gap-3 p-4 rounded-xl bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 text-[12px] font-mono text-brand-700 dark:text-brand-300">
          <Zap size={16} className="shrink-0 mt-0.5" />
          <span>{t('reverseHint')}</span>
        </div>

        {/* Examples */}
        <div>
          <SectionTitle>Quick Examples</SectionTitle>
          <div className="flex gap-2 flex-wrap">
            {EXAMPLES.map((ex) => (
              <Button key={ex.label} size="sm" onClick={() => loadExample(ex.css)}>
                {ex.label}
              </Button>
            ))}
          </div>
        </div>

        {/* CSS Input */}
        <div>
          <SectionTitle>Paste CSS</SectionTitle>
          <textarea
            value={cssInput}
            onChange={(e) => setCssInput(e.target.value)}
            placeholder={t('reversePlaceholder')}
            rows={9}
            className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700
              bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100
              font-mono text-[12px] leading-relaxed resize-y
              focus:outline-none focus:ring-2 focus:ring-brand-500/40
              placeholder-slate-400 dark:placeholder-slate-600"
          />
        </div>

        {/* Parse button */}
        <div className="flex gap-3 items-center">
          <Button variant="primary" onClick={handleParse} disabled={!cssInput.trim()}>
            <Zap size={13} /> {t('parseCSS')}
          </Button>

          <AnimatePresence>
            {applied && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 text-[12px] font-mono font-semibold text-emerald-600 dark:text-emerald-400"
              >
                <CheckCircle2 size={14} />
                {t('controlsApplied')}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Parsed properties */}
        {parsed && Object.keys(parsed).length > 0 && (
          <div>
            <SectionTitle>{t('parsedProps')}</SectionTitle>
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.entries(parsed).map(([k, v]) => (
                <div
                  key={k}
                  className="px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 font-mono text-[11px]"
                >
                  <span className="text-slate-500 dark:text-slate-400">{k}: </span>
                  <span className="text-brand-700 dark:text-brand-300 font-bold">{v}</span>
                </div>
              ))}
            </div>

            <Button onClick={() => navigate('/flexbox')}>
              <ArrowRight size={13} /> {t('goToFlexbox')}
            </Button>
          </div>
        )}

        {parsed && Object.keys(parsed).length === 0 && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-[12px] font-mono text-amber-700 dark:text-amber-300">
            No recognizable CSS layout properties found. Try adding flex, grid, or position rules.
          </div>
        )}
      </div>
    </div>
  )
}
