import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { ExportModal } from '@/components/layout/ExportModal'
import { KeyboardModal } from '@/components/layout/KeyboardModal'
import { useUIStore } from '@/store/uiStore'

import { FlexboxPage } from '@/pages/FlexboxPage'
import { GridPage } from '@/pages/GridPage'
import { PositionPage } from '@/pages/PositionPage'
import { BoxModelPage } from '@/pages/BoxModelPage'
import { DisplayPage } from '@/pages/DisplayPage'
import { OverflowPage } from '@/pages/OverflowPage'
import { ZIndexPage } from '@/pages/ZIndexPage'
import { ChallengePage } from '@/pages/ChallengePage'
import { ReversePage } from '@/pages/ReversePage'

// Route → page key map for header subtitle
const ROUTE_KEYS: Record<string, string> = {
  '/flexbox': 'flexbox',
  '/grid': 'grid',
  '/position': 'position',
  '/box-model': 'box-model',
  '/display': 'display',
  '/overflow': 'overflow',
  '/z-index': 'z-index',
  '/challenge': 'challenge',
  '/reverse': 'reverse',
}

export default function App() {
  const { theme, sidebarOpen } = useUIStore()
  const location = useLocation()
  const [showExport, setShowExport] = useState(false)
  const [showKeyboard, setShowKeyboard] = useState(false)

  // Apply dark class on mount and when theme changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  const currentPage = ROUTE_KEYS[location.pathname] ?? 'flexbox'

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <Header
        onShowExport={() => setShowExport(true)}
        onShowKeyboard={() => setShowKeyboard(true)}
        currentPage={currentPage}
      />

      <div className="flex flex-1 overflow-hidden min-h-0">
        {sidebarOpen && <Sidebar />}

        <main className="flex flex-1 overflow-hidden min-h-0">
          <Routes>
            <Route path="/" element={<Navigate to="/flexbox" replace />} />
            <Route path="/flexbox" element={<FlexboxPage />} />
            <Route path="/grid" element={<GridPage />} />
            <Route path="/position" element={<PositionPage />} />
            <Route path="/box-model" element={<BoxModelPage />} />
            <Route path="/display" element={<DisplayPage />} />
            <Route path="/overflow" element={<OverflowPage />} />
            <Route path="/z-index" element={<ZIndexPage />} />
            <Route path="/challenge" element={<ChallengePage />} />
            <Route path="/reverse" element={<ReversePage />} />
            <Route path="*" element={<Navigate to="/flexbox" replace />} />
          </Routes>
        </main>
      </div>

      {showExport && <ExportModal onClose={() => setShowExport(false)} />}
      {showKeyboard && <KeyboardModal onClose={() => setShowKeyboard(false)} />}
    </div>
  )
}
