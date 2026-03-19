import React, { useState } from "react";
import { Sun, Moon, Share2, Download, Keyboard, Layers } from "lucide-react";
import { useUIStore } from "@/store/uiStore";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/Button";
import { useFlexboxStore } from "@/features/flexbox/store/flexboxStore";
import { buildShareUrl } from "@/hooks/useUrlState";
import clsx from "clsx";

interface HeaderProps {
  onShowExport: () => void;
  onShowKeyboard: () => void;
  currentPage: string;
}

const PAGE_LABELS: Record<string, string> = {
  flexbox: "Flexbox",
  grid: "Grid",
  position: "Position",
  "box-model": "Box Model",
  display: "Display",
  overflow: "Overflow",
  "z-index": "Z-Index",
  challenge: "Challenge",
  reverse: "Reverse CSS",
};

export function Header({
  onShowExport,
  onShowKeyboard,
  currentPage,
}: HeaderProps) {
  const { theme, toggleTheme, lang, setLang, toggleSidebar } = useUIStore();
  const { t } = useTranslation();
  const flexboxState = useFlexboxStore();
  const [shareCopied, setShareCopied] = useState(false);

  const share = async () => {
    const url = buildShareUrl(flexboxState);
    window.history.replaceState({}, "", url);
    await navigator.clipboard.writeText(url);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  return (
    <header className="h-13 flex items-center justify-between px-3 md:px-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0 z-50">
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors shrink-0"
          aria-label="Toggle sidebar"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="flex items-center gap-2 shrink-0">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #7c3aed, #06b6d4)" }}
          >
            <Layers size={12} color="white" />
          </div>
          <span className="font-mono font-extrabold text-[14px] text-slate-900 dark:text-slate-100 hidden sm:block">
            CSS Layout Lab
          </span>
        </div>

        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        <span className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 truncate">
          {PAGE_LABELS[currentPage] ?? currentPage}
        </span>
      </div>

      <div className="flex items-center gap-1.5 md:gap-2 shrink-0">
        <Button
          size="sm"
          variant="ghost"
          onClick={onShowKeyboard}
          className="hidden sm:flex"
        >
          <Keyboard size={13} />
        </Button>

        <Button size="sm" onClick={onShowExport} className="hidden sm:flex">
          <Download size={12} />
          <span className="hidden md:inline">{t("export")}</span>
        </Button>

        <Button size="sm" variant="primary" onClick={share}>
          <Share2 size={12} />
          <span className="hidden sm:inline">
            {shareCopied ? t("linkCopied") : t("share")}
          </span>
        </Button>

        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 hidden sm:block" />

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as "en" | "ru")}
          className="bg-transparent border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1
            text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 cursor-pointer
            focus:outline-none"
        >
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700
            bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700
            text-slate-700 dark:text-slate-300 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </div>
    </header>
  );
}
