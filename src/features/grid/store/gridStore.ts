import { create } from 'zustand'
import { ITEM_COLORS } from '@/features/flexbox/store/flexboxStore'

export interface GridItem {
  id: number
  label: string
  bg: string
  colSpan?: number
  rowSpan?: number
}

export interface GridState {
  templateColumns: string
  templateRows: string
  gap: number
  justifyItems: string
  alignItems: string
  items: GridItem[]
  selectedId: number | null
}

const DEFAULTS: GridState = {
  templateColumns: '1fr 1fr 1fr',
  templateRows: 'auto',
  gap: 8,
  justifyItems: 'stretch',
  alignItems: 'stretch',
  selectedId: null,
  items: Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    label: String(i + 1),
    bg: ITEM_COLORS[i % ITEM_COLORS.length],
  })),
}

interface GridStore extends GridState {
  set: (patch: Partial<GridState>) => void
  addItem: () => void
  removeItem: (id: number) => void
  reset: () => void
}

export const useGridStore = create<GridStore>((set) => ({
  ...DEFAULTS,

  set: (patch) => set(patch),

  addItem: () =>
    set((s) => {
      const id = Math.max(0, ...s.items.map((i) => i.id)) + 1
      return {
        items: [...s.items, { id, label: String(id), bg: ITEM_COLORS[(id - 1) % ITEM_COLORS.length] }],
      }
    }),

  removeItem: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
      selectedId: s.selectedId === id ? null : s.selectedId,
    })),

  reset: () => set({ ...DEFAULTS }),
}))
