import React, { useState } from 'react'
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Lightbulb } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Select, Button, SectionTitle } from '@/components/ui'
import { CHALLENGES, type Difficulty } from '@/features/challenge/challenges'
import { ITEM_COLORS } from '@/features/flexbox/store/flexboxStore'
import { useTranslation } from '@/hooks/useTranslation'
import clsx from 'clsx'

const DIFF_COLORS: Record<Difficulty, string> = {
  easy: 'bg-emerald-500',
  medium: 'bg-amber-500',
  hard: 'bg-red-500',
}

interface UserState {
  direction: string
  justifyContent: string
  alignItems: string
  flexWrap: string
}

const DEFAULT_STATE: UserState = {
  direction: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
}

export function ChallengePage() {
  const { t } = useTranslation()
  const [diff, setDiff] = useState<'all' | Difficulty>('all')
  const [idx, setIdx] = useState(0)
  const [userState, setUserState] = useState<UserState>(DEFAULT_STATE)
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [score, setScore] = useState(0)

  const filtered = diff === 'all' ? CHALLENGES : CHALLENGES.filter((c) => c.difficulty === diff)
  const challenge = filtered[idx % filtered.length]

  const checkSolution = () => {
    const ok = challenge.check(userState as any)
    setResult(ok ? 'correct' : 'wrong')
    if (ok) setScore((s) => s + 1)
  }

  const nextChallenge = () => {
    setResult(null)
    setUserState(DEFAULT_STATE)
    setShowHint(false)
    setIdx((i) => i + 1)
  }

  const reset = () => {
    setResult(null)
    setUserState(DEFAULT_STATE)
    setShowHint(false)
  }

  const previewItems = [
    { bg: ITEM_COLORS[0] },
    { bg: ITEM_COLORS[1] },
    { bg: ITEM_COLORS[2] },
  ]

  return (
    <div className="flex-1 overflow-auto p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-5">
        {/* Header row */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-mono font-extrabold text-xl text-slate-900 dark:text-slate-100">
              {t('challengeMode')}
            </h1>
            <p className="text-[12px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
              {t('challengeTitle')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              {(['all', 'easy', 'medium', 'hard'] as const).map((d) => (
                <Button
                  key={d}
                  size="sm"
                  variant={diff === d ? 'primary' : 'default'}
                  onClick={() => { setDiff(d); setIdx(0); reset() }}
                >
                  {t(d)}
                </Button>
              ))}
            </div>
            <div className="font-mono text-[12px] text-slate-600 dark:text-slate-400">
              {t('score')}: <strong className="text-brand-600 dark:text-brand-400">{score}</strong>
            </div>
          </div>
        </div>

        {/* Challenge card */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <span className={clsx('text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full uppercase', DIFF_COLORS[challenge.difficulty])}>
              {challenge.difficulty}
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

          {/* Two canvases */}
          <div className="grid grid-cols-2 gap-0 divide-x divide-slate-200 dark:divide-slate-800">
            {/* Target */}
            <div className="p-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">
                🎯 Target Layout
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: (challenge.target.direction ?? 'row') as any,
                  justifyContent: challenge.target.justifyContent ?? 'flex-start',
                  alignItems: challenge.target.alignItems ?? 'stretch',
                  flexWrap: (challenge.target.flexWrap ?? 'nowrap') as any,
                  gap: 8,
                  padding: 16,
                  minHeight: 120,
                  borderRadius: 8,
                  border: '2px solid #7c3aed',
                  background: 'rgba(124,58,237,0.04)',
                }}
              >
                {previewItems.map((item, i) => (
                  <div
                    key={i}
                    style={{ background: item.bg, minWidth: 48, minHeight: 48 }}
                    className="rounded-lg flex items-center justify-center font-mono font-extrabold text-white text-lg"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* User canvas */}
            <div className="p-4">
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400 mb-2">
                ✏️ Your Layout
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: userState.direction as any,
                  justifyContent: userState.justifyContent,
                  alignItems: userState.alignItems,
                  flexWrap: userState.flexWrap as any,
                  gap: 8,
                  padding: 16,
                  minHeight: 120,
                  borderRadius: 8,
                  border: '2px dashed #e2e8f0',
                  transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                }}
                className="dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
              >
                {previewItems.map((item, i) => (
                  <div
                    key={i}
                    style={{ background: item.bg, minWidth: 48, minHeight: 48 }}
                    className="rounded-lg flex items-center justify-center font-mono font-extrabold text-white text-lg"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Select
              label="flex-direction"
              value={userState.direction}
              options={['row', 'row-reverse', 'column', 'column-reverse'].map((v) => ({ value: v, label: v }))}
              onChange={(v) => setUserState((s) => ({ ...s, direction: v }))}
            />
            <Select
              label="justify-content"
              value={userState.justifyContent}
              options={['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((v) => ({ value: v, label: v }))}
              onChange={(v) => setUserState((s) => ({ ...s, justifyContent: v }))}
            />
            <Select
              label="align-items"
              value={userState.alignItems}
              options={['stretch', 'flex-start', 'center', 'flex-end', 'baseline'].map((v) => ({ value: v, label: v }))}
              onChange={(v) => setUserState((s) => ({ ...s, alignItems: v }))}
            />
            <Select
              label="flex-wrap"
              value={userState.flexWrap}
              options={['nowrap', 'wrap', 'wrap-reverse'].map((v) => ({ value: v, label: v }))}
              onChange={(v) => setUserState((s) => ({ ...s, flexWrap: v }))}
            />
          </div>

          {/* Result feedback */}
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
        <div className="flex gap-1.5 justify-center">
          {filtered.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIdx(i); reset() }}
              className={clsx(
                'w-2 h-2 rounded-full transition-all',
                i === idx % filtered.length
                  ? 'bg-brand-600 w-4'
                  : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
