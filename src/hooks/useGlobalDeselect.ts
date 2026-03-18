import { useEffect } from 'react'

/**
 * Calls `onDeselect` when the user clicks anywhere in the document
 * that is NOT inside an element matching `keepSelector`.
 *
 * Default keepSelector covers: inputs, selects, textareas, buttons,
 * range sliders, labels, and any element with data-keep-selection.
 */
export function useGlobalDeselect(
  onDeselect: () => void,
  enabled: boolean = true,
  keepSelector: string = 'input, select, textarea, button, label, [data-keep-selection]'
) {
  useEffect(() => {
    if (!enabled) return

    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // If the click lands on or inside a control — do nothing
      if (target.closest(keepSelector)) return
      onDeselect()
    }

    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onDeselect, enabled, keepSelector])
}
