import React, { useEffect, useCallback, useState } from "react";
import { Plus, RotateCcw, SlidersHorizontal, Code2, X } from "lucide-react";
import { FlexControls } from "@/features/flexbox/components/FlexControls";
import { FlexCanvas } from "@/features/flexbox/components/FlexCanvas";
import { FlexCSSPanel } from "@/features/flexbox/components/FlexCSSPanel";
import { useFlexboxStore } from "@/features/flexbox/store/flexboxStore";
import { Button } from "@/components/ui";
import { useTranslation } from "@/hooks/useTranslation";
import { getUrlState } from "@/hooks/useUrlState";
import { useGlobalDeselect } from "@/hooks/useGlobalDeselect";
import type { FlexboxState } from "@/features/flexbox/store/flexboxStore";

export function FlexboxPage() {
  const store = useFlexboxStore();
  const { t } = useTranslation();
  const [mobilePanel, setMobilePanel] = useState<"controls" | "css" | null>(
    null,
  );

  const deselect = useCallback(() => store.set({ selectedId: null }), [store]);
  useGlobalDeselect(deselect, !!store.selectedId);

  useEffect(() => {
    const urlState = getUrlState<Partial<FlexboxState>>();
    if (urlState) store.loadState(urlState);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (["INPUT", "SELECT", "TEXTAREA"].includes(tag)) return;
      switch (e.key.toLowerCase()) {
        case "a":
          store.addItem();
          break;
        case "d":
          if (store.selectedId) store.removeItem(store.selectedId);
          break;
        case "r":
          store.reset();
          break;
        case "c":
          import("@/features/flexbox/utils/cssGen").then(
            ({ generateFlexCSS }) => {
              const sel =
                store.items.find((i) => i.id === store.selectedId) ?? null;
              navigator.clipboard.writeText(generateFlexCSS(store, sel));
            },
          );
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [store]);

  return (
    <div className="flex flex-1 overflow-hidden min-h-0 relative">
      <div className="hidden md:flex">
        <FlexControls />
      </div>

      <div className="flex-1 flex flex-col gap-3 p-3 md:p-4 overflow-auto min-w-0">
        <div className="flex items-center gap-2 shrink-0">
          <Button size="sm" onClick={store.addItem}>
            <Plus size={12} /> {t("addItem")}
          </Button>
          <Button size="sm" onClick={store.reset}>
            <RotateCcw size={12} /> {t("reset")}
          </Button>
          <div className="flex md:hidden items-center gap-2 ml-auto">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setMobilePanel("controls")}
            >
              <SlidersHorizontal size={13} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setMobilePanel("css")}
            >
              <Code2 size={13} />
            </Button>
          </div>
        </div>

        <FlexCanvas />

        {store.showAxes && (
          <div className="flex gap-4 px-3 py-2 rounded-lg bg-brand-50 dark:bg-brand-950/20 border border-brand-200 dark:border-brand-900 shrink-0 text-[11px] font-mono font-semibold flex-wrap">
            <span className="text-brand-700 dark:text-brand-300">
              ■ Main axis:{" "}
              {store.direction.includes("column")
                ? "vertical (top → bottom)"
                : "horizontal (left → right)"}
            </span>
            <span className="text-cyan-700 dark:text-cyan-300">
              ■ Cross axis:{" "}
              {store.direction.includes("column") ? "horizontal" : "vertical"}
            </span>
          </div>
        )}
      </div>

      <div className="hidden md:flex">
        <FlexCSSPanel />
      </div>

      {mobilePanel !== null && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobilePanel(null)}
        />
      )}

      <div
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-white dark:bg-slate-900
          border-t border-slate-200 dark:border-slate-800
          rounded-t-2xl shadow-2xl
          transition-transform duration-300 ease-in-out
          max-h-[75vh] overflow-y-auto
          ${mobilePanel !== null ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {mobilePanel === "controls" ? "Controls" : "CSS Output"}
          </span>
          <button
            onClick={() => setMobilePanel(null)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        {mobilePanel === "controls" && <FlexControls mobile />}
        {mobilePanel === "css" && <FlexCSSPanel mobile />}
      </div>
    </div>
  );
}
