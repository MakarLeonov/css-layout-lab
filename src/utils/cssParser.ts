import type { FlexboxState } from '@/features/flexbox/store/flexboxStore'

function camelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

export function parseCSS(cssText: string): Record<string, string> {
  const result: Record<string, string> = {}
  const cleaned = cssText.replace(/\/\*[\s\S]*?\*\//g, '').replace(/[{}]/g, '')
  const rules = cleaned.split(';')
  for (const rule of rules) {
    const colonIdx = rule.indexOf(':')
    if (colonIdx === -1) continue
    const prop = rule.slice(0, colonIdx).trim()
    const val = rule.slice(colonIdx + 1).trim()
    if (!prop || !val) continue
    result[prop] = val
    result[camelCase(prop)] = val
  }
  return result
}

export function cssToFlexboxState(cssText: string): Partial<FlexboxState> {
  const parsed = parseCSS(cssText)
  const state: Partial<FlexboxState> = {}

  const dir = parsed['flex-direction'] ?? parsed['flexDirection']
  if (dir && ['row', 'row-reverse', 'column', 'column-reverse'].includes(dir)) {
    state.direction = dir
  }

  const jc = parsed['justify-content'] ?? parsed['justifyContent']
  if (jc && ['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].includes(jc)) {
    state.justifyContent = jc
  }

  const ai = parsed['align-items'] ?? parsed['alignItems']
  if (ai && ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'].includes(ai)) {
    state.alignItems = ai
  }

  const fw = parsed['flex-wrap'] ?? parsed['flexWrap']
  if (fw && ['nowrap', 'wrap', 'wrap-reverse'].includes(fw)) {
    state.flexWrap = fw
  }

  const gap = parsed['gap']
  if (gap) {
    const num = parseInt(gap)
    if (!isNaN(num)) state.gap = num
  }

  return state
}

export function getParsedDisplay(parsed: Record<string, string>): Record<string, string> {
  const display: Record<string, string> = {}
  const relevant = [
    'flex-direction', 'justify-content', 'align-items', 'flex-wrap',
    'gap', 'display', 'grid-template-columns', 'grid-template-rows',
    'position', 'top', 'left', 'right', 'bottom',
  ]
  for (const key of relevant) {
    if (parsed[key]) display[key] = parsed[key]
  }
  return display
}
