import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import clsx from "clsx";
import { useTranslation } from "@/hooks/useTranslation";
import { useUIStore } from "@/store/uiStore";

const LAYOUT_PAGES = [
  { path: "/flexbox", key: "flexbox" },
  { path: "/grid", key: "grid" },
  { path: "/position", key: "position" },
  { path: "/box-model", key: "boxModel" },
  { path: "/display", key: "display" },
  { path: "/overflow", key: "overflow" },
  { path: "/z-index", key: "zIndex" },
];

const TOOL_PAGES = [
  { path: "/challenge", key: "challenge" },
  { path: "/reverse", key: "reverse" },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { setSidebarOpen } = useUIStore();

  const currentPath = location.pathname;

  const NavItem = ({ path, label }: { path: string; label: string }) => {
    const active = currentPath === path;
    return (
      <button
        onClick={() => navigate(path)}
        className={clsx(
          "w-full flex items-center gap-2 px-3 py-2 text-[12px] font-mono font-medium",
          "border-l-2 transition-all duration-150 text-left",
          active
            ? "border-brand-600 bg-brand-50 dark:bg-brand-950/30 text-brand-700 dark:text-brand-440 font-bold"
            : "border-transparent text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200",
        )}
      >
        {label}
      </button>
    );
  };

  return (
    <aside className="w-44 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col overflow-y-auto shrink-0">
      <div className="flex items-center justify-between px-3 pt-3 pb-1 md:hidden">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 font-mono">
          Menu
        </span>
        <button
          onClick={() => setSidebarOpen(false)}
          className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X size={13} />
        </button>
      </div>

      <div className="px-3 pt-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 font-mono hidden md:block">
        {t("layouts")}
      </div>
      <div className="md:hidden px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 font-mono">
        {t("layouts")}
      </div>

      {LAYOUT_PAGES.map((p) => (
        <NavItem key={p.path} path={p.path} label={t(p.key)} />
      ))}

      <div className="h-px bg-slate-100 dark:bg-slate-800 my-2" />

      <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-600 font-mono">
        {t("tools")}
      </div>
      {TOOL_PAGES.map((p) => (
        <NavItem key={p.path} path={p.path} label={t(p.key)} />
      ))}
    </aside>
  );
}
