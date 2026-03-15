import React from 'react'
import { X } from 'lucide-react'
import { useTranslation } from '@/hooks/useTranslation'

interface KeyboardModalProps {
  onClose: () => void
}

export function KeyboardModal({ onClose }: KeyboardModalProps) {
  const { t } = useTranslation()

  const shortcuts = [
    { key: 'A', desc: t('kbAdd') },
    { key: 'D', desc: t('kbDelete') },
    { key: 'R', desc: t('kbReset') },
    { key: 'C', desc: t('kbCopy') },
  ]

  return (
    <div
      className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-80"
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-mono font-extrabold text-base text-slate-900 dark:text-slate-100">
            {t('keyboard')}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded">
            <X size={14} />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {shortcuts.map(({ key, desc }) => (
            <div key={key} className="flex items-center justify-between py-1">
              <span className="font-mono text-[12px] text-slate-600 dark:text-slate-400">{desc}</span>
              <kbd className="px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700
                bg-slate-100 dark:bg-slate-800
                font-mono font-bold text-[12px] text-slate-800 dark:text-slate-200">
                {key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
