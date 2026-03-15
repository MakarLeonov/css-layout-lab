import { useCallback } from 'react'

export function encodeState(state: object): string {
  try {
    return btoa(encodeURIComponent(JSON.stringify(state)))
  } catch {
    return ''
  }
}

export function decodeState<T>(str: string): T | null {
  try {
    return JSON.parse(decodeURIComponent(atob(str))) as T
  } catch {
    return null
  }
}

export function getUrlState<T>(): T | null {
  const params = new URLSearchParams(window.location.search)
  const s = params.get('s')
  return s ? decodeState<T>(s) : null
}

export function buildShareUrl(state: object): string {
  const encoded = encodeState(state)
  const url = new URL(window.location.href)
  url.searchParams.set('s', encoded)
  return url.toString()
}

export function useUrlState() {
  const share = useCallback((state: object): string => {
    const url = buildShareUrl(state)
    window.history.replaceState({}, '', url)
    return url
  }, [])

  return { share, getUrlState }
}
