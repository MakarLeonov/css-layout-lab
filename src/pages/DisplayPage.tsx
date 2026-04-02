import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Select, CodeBlock, SectionTitle } from "@/components/ui";
import { ITEM_COLORS } from "@/features/flexbox/store/flexboxStore";

const DISPLAY_VALUES = [
  "block",
  "inline",
  "inline-block",
  "flex",
  "grid",
  "none",
];

const DISPLAY_DESCRIPTIONS: Record<string, string> = {
  block:
    "Takes full width, starts on a new line. Width/height fully respected.",
  inline: "Flows inline with text. Width/height ignored. No vertical margin.",
  "inline-block":
    "Inline flow but respects width/height and all box model properties.",
  flex: "Creates a flex formatting context. Children become flex items.",
  grid: "Creates a grid formatting context. Children become grid items.",
  none: "Element is removed from layout entirely (not just invisible).",
};

export function DisplayPage() {
  const [display, setDisplay] = useState("block");
  const [mobileControls, setMobileControls] = useState(false);

  const css = `.element {
  display: ${display};
}`;

  const ControlsContent = (
    <>
      <SectionTitle>Display Value</SectionTitle>
      <Select
        label="display"
        value={display}
        options={DISPLAY_VALUES.map((v) => ({ value: v, label: v }))}
        onChange={setDisplay}
      />
      <div className="mt-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
        {DISPLAY_DESCRIPTIONS[display]}
      </div>
      <div className="mt-4">
        <CodeBlock code={css} />
      </div>
    </>
  );

  return (
    <div className="flex flex-1 overflow-hidden min-h-0 relative">
      <div className="hidden md:block w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        {ControlsContent}
      </div>

      <div className="flex-1 flex flex-col items-center justify-start bg-slate-50 dark:bg-slate-950 overflow-auto p-4 md:p-8 gap-4">
        <div className="w-full flex justify-end md:hidden">
          <button
            onClick={() => setMobileControls(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal size={13} />
            Controls
          </button>
        </div>

        <div className="w-full max-w-[480px] min-h-[200px] p-5 rounded-xl bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-[10px] font-mono text-slate-400 mb-3 uppercase tracking-widest">
            parent container
          </div>
          <p className="text-[12px] font-mono text-slate-500 dark:text-slate-400 mb-2">
            Text before elements →{" "}
            {[1, 2, 3].map((n, i) => (
              <span
                key={n}
                style={{
                  display,
                  background: ITEM_COLORS[i],
                  color: "#fff",
                  padding: display === "grid" ? 0 : "8px 14px",
                  borderRadius: 6,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 800,
                  fontSize: 14,
                  minWidth: 52,
                  minHeight: display === "grid" ? 52 : undefined,
                  margin: 4,
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s",
                }}
              >
                {n}
              </span>
            ))}{" "}
            ← Text after
          </p>
        </div>
      </div>

      {mobileControls && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileControls(false)}
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
        ${mobileControls ? "translate-y-0" : "translate-y-full"}
      `}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
          <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Controls
          </span>
          <button
            onClick={() => setMobileControls(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={15} />
          </button>
        </div>
        <div className="p-3">{ControlsContent}</div>
      </div>
    </div>
  );
}
