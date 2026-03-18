import React, { useState } from 'react'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, Button, SectionTitle } from '@/components/ui'
import { CHALLENGES, CHALLENGE_CATEGORIES, type Difficulty, type ChallengeCategory, type ChallengeAnswer } from '@/features/challenge/challenges'
import { ITEM_COLORS } from '@/features/flexbox/store/flexboxStore'
import { useTranslation } from '@/hooks/useTranslation'
import clsx from 'clsx'

const DIFF_COLORS: Record<Difficulty, string> = {
  easy: 'bg-emerald-500',
  medium: 'bg-amber-500',
  hard: 'bg-red-500',
}

// ── per-category answer state defaults and controls ─────────────────────────
const DEFAULT_ANSWER: ChallengeAnswer = {
  direction: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  templateColumns: '1fr 1fr 1fr',
  gap: 8,
  position: 'static',
  boxSizing: 'content-box',
  display: 'block',
  overflow: 'visible',
}

function FlexControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Select label="flex-direction" value={answer.direction ?? 'row'}
        options={['row','row-reverse','column','column-reverse'].map(v=>({value:v,label:v}))}
        onChange={(v) => onChange({ direction: v })} />
      <Select label="justify-content" value={answer.justifyContent ?? 'flex-start'}
        options={['flex-start','center','flex-end','space-between','space-around','space-evenly'].map(v=>({value:v,label:v}))}
        onChange={(v) => onChange({ justifyContent: v })} />
      <Select label="align-items" value={answer.alignItems ?? 'stretch'}
        options={['stretch','flex-start','center','flex-end','baseline'].map(v=>({value:v,label:v}))}
        onChange={(v) => onChange({ alignItems: v })} />
      <Select label="flex-wrap" value={answer.flexWrap ?? 'nowrap'}
        options={['nowrap','wrap','wrap-reverse'].map(v=>({value:v,label:v}))}
        onChange={(v) => onChange({ flexWrap: v })} />
    </div>
  )
}

function GridControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-500 font-mono">grid-template-columns</label>
        <input type="text" value={answer.templateColumns ?? '1fr 1fr 1fr'}
          onChange={(e) => onChange({ templateColumns: e.target.value })}
          className="w-full px-2 py-1.5 rounded-md text-[12px] font-mono border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
      </div>
      <div>
        <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-slate-500 font-mono">gap (px)</label>
        <input type="number" value={answer.gap ?? 8}
          onChange={(e) => onChange({ gap: Number(e.target.value) })}
          className="w-full px-2 py-1.5 rounded-md text-[12px] font-mono border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
      </div>
    </div>
  )
}

function PositionControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <Select label="position" value={answer.position ?? 'static'}
      options={['static','relative','absolute','fixed','sticky'].map(v=>({value:v,label:v}))}
      onChange={(v) => onChange({ position: v })} />
  )
}

function BoxModelControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <Select label="box-sizing" value={answer.boxSizing ?? 'content-box'}
      options={['content-box','border-box'].map(v=>({value:v,label:v}))}
      onChange={(v) => onChange({ boxSizing: v })} />
  )
}

function DisplayControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <Select label="display" value={answer.display ?? 'block'}
      options={['block','inline','inline-block','flex','grid','none'].map(v=>({value:v,label:v}))}
      onChange={(v) => onChange({ display: v })} />
  )
}

function OverflowControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <Select label="overflow" value={answer.overflow ?? 'visible'}
      options={['visible','hidden','scroll','auto'].map(v=>({value:v,label:v}))}
      onChange={(v) => onChange({ overflow: v })} />
  )
}

function ZIndexControls({ answer, onChange }: { answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  return (
    <Select label="position" value={answer.position ?? 'static'}
      options={['static','relative','absolute','fixed','sticky'].map(v=>({value:v,label:v}))}
      onChange={(v) => onChange({ position: v })} />
  )
}

function ChallengeControls({ category, answer, onChange }: { category: ChallengeCategory; answer: ChallengeAnswer; onChange: (a: Partial<ChallengeAnswer>) => void }) {
  switch (category) {
    case 'Flexbox':   return <FlexControls answer={answer} onChange={onChange} />
    case 'Grid':      return <GridControls answer={answer} onChange={onChange} />
    case 'Position':  return <PositionControls answer={answer} onChange={onChange} />
    case 'Box Model': return <BoxModelControls answer={answer} onChange={onChange} />
    case 'Display':   return <DisplayControls answer={answer} onChange={onChange} />
    case 'Overflow':  return <OverflowControls answer={answer} onChange={onChange} />
    case 'Z-Index':   return <ZIndexControls answer={answer} onChange={onChange} />
  }
}

// ── target canvas previews ─────────────────────────────────────────────────
const PREVIEW_ITEMS = [ITEM_COLORS[0], ITEM_COLORS[1], ITEM_COLORS[2]]

function FlexPreview({ target, user }: { target: ChallengeAnswer; user: ChallengeAnswer }) {
  const make = (a: ChallengeAnswer, dashed: boolean) => (
    <div style={{
      display: 'flex',
      flexDirection: (a.direction ?? 'row') as any,
      justifyContent: a.justifyContent ?? 'flex-start',
      alignItems: a.alignItems ?? 'stretch',
      flexWrap: (a.flexWrap ?? 'nowrap') as any,
      gap: 8, padding: 16, minHeight: 120, borderRadius: 8,
      border: dashed ? '2px dashed #e2e8f0' : '2px solid #7c3aed',
      background: dashed ? undefined : 'rgba(124,58,237,0.04)',
      transition: 'all 0.3s',
    }} className={dashed ? 'bg-slate-50 dark:bg-slate-950' : ''}>
      {PREVIEW_ITEMS.map((bg, i) => (
        <div key={i} style={{ background: bg, minWidth: 44, minHeight: 44 }}
          className="rounded-lg flex items-center justify-center font-mono font-extrabold text-white text-base">{i+1}</div>
      ))}
    </div>
  )
  return <TwoCanvases target={make(target, false)} user={make(user, true)} />
}

function GridPreview({ target, user }: { target: ChallengeAnswer; user: ChallengeAnswer }) {
  const make = (a: ChallengeAnswer, dashed: boolean) => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: a.templateColumns ?? '1fr 1fr 1fr',
      gap: a.gap ?? 8, padding: 16, borderRadius: 8,
      border: dashed ? '2px dashed #e2e8f0' : '2px solid #7c3aed',
      background: dashed ? undefined : 'rgba(124,58,237,0.04)',
      transition: 'all 0.3s',
    }} className={dashed ? 'bg-slate-50 dark:bg-slate-950' : ''}>
      {PREVIEW_ITEMS.map((bg, i) => (
        <div key={i} style={{ background: bg, minHeight: 44 }}
          className="rounded-lg flex items-center justify-center font-mono font-extrabold text-white text-base">{i+1}</div>
      ))}
    </div>
  )
  return <TwoCanvases target={make(target, false)} user={make(user, true)} />
}

function TextPreview({ label, field, target, user }: { label: string; field: keyof ChallengeAnswer; target: ChallengeAnswer; user: ChallengeAnswer }) {
  return (
    <TwoCanvases
      target={
        <div className="flex items-center justify-center min-h-[80px] rounded-lg border-2 border-brand-500 bg-brand-50 dark:bg-brand-950/20">
          <span className="font-mono font-bold text-brand-600 text-sm">{label}: {String(target[field])}</span>
        </div>
      }
      user={
        <div className="flex items-center justify-center min-h-[80px] rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 transition-all">
          <span className="font-mono font-bold text-slate-500 text-sm">{label}: {String(user[field] ?? '—')}</span>
        </div>
      }
    />
  )
}

function TwoCanvases({ target, user }: { target: React.ReactNode; user: React.ReactNode }) {
  return (
    <div className="grid grid-cols-2 gap-0 divide-x divide-slate-200 dark:divide-slate-800">
      <div className="p-4">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">🎯 Target</div>
        {target}
      </div>
      <div className="p-4">
        <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">✏️ Your Answer</div>
        {user}
      </div>
    </div>
  )
}

function ChallengePreview({ category, target, user }: { category: ChallengeCategory; target: ChallengeAnswer; user: ChallengeAnswer }) {
  switch (category) {
    case 'Flexbox':   return <FlexPreview target={target} user={user} />
    case 'Grid':      return <GridPreview target={target} user={user} />
    case 'Position':  return <TextPreview label="position"   field="position"  target={target} user={user} />
    case 'Box Model': return <TextPreview label="box-sizing" field="boxSizing" target={target} user={user} />
    case 'Display':   return <TextPreview label="display"    field="display"   target={target} user={user} />
    case 'Overflow':  return <TextPreview label="overflow"   field="overflow"  target={target} user={user} />
    case 'Z-Index':   return <TextPreview label="position"   field="position"  target={target} user={user} />
  }
}

// ── main page ──────────────────────────────────────────────────────────────
export function ChallengePage() {
  const { t } = useTranslation()
  const [category, setCategory] = useState<ChallengeCategory | 'all'>('all')
  const [diff, setDiff] = useState<Difficulty | 'all'>('all')
  const [idx, setIdx] = useState(0)
  const [answer, setAnswer] = useState<ChallengeAnswer>(DEFAULT_ANSWER)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)

  const filtered = CHALLENGES.filter((c) => {
    if (category !== 'all' && c.category !== category) return false
    if (diff !== 'all' && c.difficulty !== diff) return false
    return true
  })
  const challenge = filtered[idx % Math.max(filtered.length, 1)]

  const updateAnswer = (patch: Partial<ChallengeAnswer>) =>
    setAnswer((a) => ({ ...a, ...patch }))

  const checkSolution = () => {
    if (!challenge) return
    const ok = challenge.check(answer)
    setResult(ok ? 'correct' : 'wrong')
    if (ok) setScore((s) => s + 1)
  }

  const nextChallenge = () => {
    setResult(null)
    setAnswer(DEFAULT_ANSWER)
    setShowHint(false)
    setIdx((i) => i + 1)
  }

  const reset = () => {
    setResult(null)
    setAnswer(DEFAULT_ANSWER)
    setShowHint(false)
  }

  const changeFilter = (newCat: typeof category, newDiff: typeof diff) => {
    setCategory(newCat)
    setDiff(newDiff)
    setIdx(0)
    reset()
  }

  if (!challenge) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 font-mono text-sm">
        No challenges match the selected filters.
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-mono font-extrabold text-xl text-slate-900 dark:text-slate-100">
              {t('challengeMode')}
            </h1>
            <p className="text-[12px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {t('challengeTitle')}
            </p>
          </div>
          <div className="font-mono text-[12px] text-slate-600 dark:text-slate-400">
            {t('score')}: <strong className="text-brand-600 dark:text-brand-400">{score}</strong>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {(['all', ...CHALLENGE_CATEGORIES] as const).map((cat) => {
            const count = cat === 'all' ? CHALLENGES.length : CHALLENGES.filter(c => c.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => changeFilter(cat, diff)}
                className={clsx(
                  'px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold transition-all border',
                  category === cat
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-brand-300 hover:text-brand-600'
                )}
              >
                {cat === 'all' ? 'All' : cat}
                <span className="ml-1.5 opacity-60">{count}</span>
              </button>
            )
          })}
        </div>

        {/* Difficulty filter */}
        <div className="flex gap-1.5">
          {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
            <Button
              key={d}
              size="sm"
              variant={diff === d ? 'primary' : 'default'}
              onClick={() => changeFilter(category, d)}
            >
              {t(d)}
            </Button>
          ))}
        </div>

        {/* Challenge card */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          {/* Card header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <span className={clsx('text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase', DIFF_COLORS[challenge.difficulty])}>
              {challenge.difficulty}
            </span>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
              {challenge.category}
            </span>
            <h2 className="font-mono font-bold text-[15px] text-slate-900 dark:text-slate-100">
              {challenge.title}
            </h2>
            <span className="ml-auto text-[11px] font-mono text-slate-400">
              {(idx % filtered.length) + 1} / {filtered.length}
            </span>
          </div>

          <p className="px-4 py-3 text-[12px] font-mono text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800">
            {challenge.description}
          </p>

          {/* Preview canvases */}
          <ChallengePreview category={challenge.category} target={challenge.target} user={answer} />

          {/* Controls */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <ChallengeControls category={challenge.category} answer={answer} onChange={updateAnswer} />
          </div>

          {/* Result */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={clsx(
                  'mx-4 mb-3 px-4 py-3 rounded-lg flex items-center gap-3 font-mono font-bold text-[14px]',
                  result === 'correct'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
                )}
              >
                {result === 'correct'
                  ? <><CheckCircle2 size={18} /> {t('correct')}</>
                  : <><XCircle size={18} /> {t('tryAgain')}</>
                }
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hint */}
          {showHint && challenge.hint && (
            <div className="mx-4 mb-3 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-[11px] font-mono text-amber-700 dark:text-amber-300">
              💡 {challenge.hint}
            </div>
          )}

          {/* Actions */}
          <div className="px-4 pb-4 flex gap-2 flex-wrap">
            <Button variant="primary" onClick={checkSolution}>
              <CheckCircle2 size={13} /> {t('checkSolution')}
            </Button>
            {result === 'correct' && (
              <Button variant="success" onClick={nextChallenge}>
                {t('nextChallenge')} <ChevronRight size={13} />
              </Button>
            )}
            <Button onClick={reset}>
              <RotateCcw size={12} /> {t('reset')}
            </Button>
            {challenge.hint && (
              <Button variant="ghost" onClick={() => setShowHint((s) => !s)}>
                <Lightbulb size={12} /> Hint
              </Button>
            )}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center flex-wrap">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); reset() }}
              className={clsx(
                'h-2 rounded-full transition-all',
                i === idx % filtered.length
                  ? 'bg-brand-600 w-4'
                  : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
