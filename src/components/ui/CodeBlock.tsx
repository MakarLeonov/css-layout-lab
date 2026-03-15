import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CodeBlockProps {
  code: string
  language?: string
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={copy}
        className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono font-semibold
          bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400
          hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
      >
        {copied ? <><Check size={10} /> Copied!</> : <><Copy size={10} /> Copy</>}
      </button>
      <pre
        className="m-0 p-3 pr-16 rounded-lg text-[11px] leading-relaxed overflow-x-auto font-mono
          bg-slate-950 dark:bg-slate-950 text-cyan-300
          border border-slate-800"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}
      >
        {code}
      </pre>
    </div>
  )
}
