import { create } from 'zustand'

export const ITEM_COLORS = [
  '#6366f1', '#8b5cf6', '#06b6d4', '#10b981',
  '#f59e0b', '#ef4444', '#ec4899', '#84cc16',
]

export interface FlexItem {
  id: number
  label: string
  grow: number
  shrink: number
  basis: string
  order: number
  alignSelf: string
  bg: string
}

export interface FlexboxState {
  direction: string
  justifyContent: string
  alignItems: string
  flexWrap: string
  gap: number
  items: FlexItem[]
  selectedId: number | null
  animate: boolean
  showAxes: boolean
}

const DEFAULTS: FlexboxState = {
  direction: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  flexWrap: 'nowrap',
  gap: 8,
  animate: true,
  showAxes: false,
  selectedId: null,
  items: [
    { id: 1, label: '1', grow: 0, shrink: 1, basis: 'auto', order: 0, alignSelf: 'auto', bg: '#6366f1' },
    { id: 2, label: '2', grow: 0, shrink: 1, basis: 'auto', order: 0, alignSelf: 'auto', bg: '#8b5cf6' },
    { id: 3, label: '3', grow: 0, shrink: 1, basis: 'auto', order: 0, alignSelf: 'auto', bg: '#a78bfa' },
  ],
}

interface FlexboxStore extends FlexboxState {
  set: (patch: Partial<FlexboxState>) => void
  setItem: (id: number, patch: Partial<FlexItem>) => void
  addItem: () => void
  removeItem: (id: number) => void
  reset: () => void
  loadState: (state: Partial<FlexboxState>) => void
}

export const useFlexboxStore = create<FlexboxStore>((set, get) => ({
  ...DEFAULTS,

  set: (patch) => set(patch),

  setItem: (id, patch) =>
    set((s) => ({ items: s.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) })),

  addItem: () =>
    set((s) => {
      const id = Math.max(0, ...s.items.map((i) => i.id)) + 1
      const bg = ITEM_COLORS[(id - 1) % ITEM_COLORS.length]
      return {
        items: [
          ...s.items,
          { id, label: String(id), grow: 0, shrink: 1, basis: 'auto', order: 0, alignSelf: 'auto', bg },
        ],
      }
    }),

  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),

  reset: () => set({ ...DEFAULTS }),

  loadState: (state) => set(state),
}))
