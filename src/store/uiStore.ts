import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'
type Lang = 'en' | 'ru'

interface UIState {
  theme: Theme
  lang: Lang
  sidebarOpen: boolean
  toggleTheme: () => void
  setLang: (lang: Lang) => void
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      lang: 'en',
      sidebarOpen: true,

      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },

      setLang: (lang) => set({ lang }),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: 'csslab-ui',
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark')
        }
      },
    }
  )
)
