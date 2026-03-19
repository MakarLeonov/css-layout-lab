import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { ExportModal } from "@/components/layout/ExportModal";
import { KeyboardModal } from "@/components/layout/KeyboardModal";
import { useUIStore } from "@/store/uiStore";

import { FlexboxPage } from "@/pages/FlexboxPage";
import { GridPage } from "@/pages/GridPage";
import { PositionPage } from "@/pages/PositionPage";
import { BoxModelPage } from "@/pages/BoxModelPage";
import { DisplayPage } from "@/pages/DisplayPage";
import { OverflowPage } from "@/pages/OverflowPage";
import { ZIndexPage } from "@/pages/ZIndexPage";
import { ChallengePage } from "@/pages/ChallengePage";
import { ReversePage } from "@/pages/ReversePage";

const ROUTE_KEYS: Record<string, string> = {
  "/flexbox": "flexbox",
  "/grid": "grid",
  "/position": "position",
  "/box-model": "box-model",
  "/display": "display",
  "/overflow": "overflow",
  "/z-index": "z-index",
  "/challenge": "challenge",
  "/reverse": "reverse",
};

export default function App() {
  const { theme, sidebarOpen, setSidebarOpen } = useUIStore();
  const location = useLocation();
  const [showExport, setShowExport] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const currentPage = ROUTE_KEYS[location.pathname] ?? "flexbox";

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <Header
        onShowExport={() => setShowExport(true)}
        onShowKeyboard={() => setShowKeyboard(true)}
        currentPage={currentPage}
      />

      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div
              key="sidebar-desktop"
              className="hidden md:flex"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 176, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <Sidebar />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                key="sidebar-backdrop"
                className="fixed inset-0 z-30 md:hidden bg-black/40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSidebarOpen(false)}
              />
              <motion.div
                key="sidebar-mobile"
                className="fixed top-0 left-0 h-full z-40 md:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <Sidebar />
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
  );
}
