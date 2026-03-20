import React, { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Select, CodeBlock, SectionTitle } from "@/components/ui";
import clsx from "clsx";

type PositionValue = "static" | "relative" | "absolute" | "fixed" | "sticky";

interface Offsets {
  top: string;
  left: string;
  right: string;
  bottom: string;
}

const POSITION_DESCRIPTIONS: Record<PositionValue, string> = {
  static:
    "Default flow. Offset properties (top/left/right/bottom) have no effect.",
  relative:
    "Stays in normal flow but can be nudged with offsets. Space is preserved.",
  absolute:
    "Removed from flow. Positioned relative to nearest non-static ancestor.",
  fixed:
    "Removed from flow. Positioned relative to the viewport. Stays on scroll.",
  sticky:
    "Hybrid: acts as relative until it hits a scroll threshold, then sticks.",
};

const POSITION_PRESETS: {
  label: string;
  position: PositionValue;
  offsets: Partial<Offsets>;
  transform?: string;
}[] = [
  {
    label: "Top-left corner",
    position: "absolute",
    offsets: { top: "0", left: "0", right: "", bottom: "" },
  },
  {
    label: "Top-right corner",
    position: "absolute",
    offsets: { top: "0", left: "", right: "0", bottom: "" },
  },
  {
    label: "Bottom-left",
    position: "absolute",
    offsets: { top: "", left: "0", right: "", bottom: "0" },
  },
  {
    label: "Bottom-right",
    position: "absolute",
    offsets: { top: "", left: "", right: "0", bottom: "0" },
  },
  {
    label: "Centered badge",
    position: "absolute",
    offsets: { top: "50%", left: "50%", right: "", bottom: "" },
    transform: "translate(-50%, -50%)",
  },
];

function OffsetInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 font-mono">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder="auto"
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 rounded-md text-[12px] font-mono font-medium
          border border-slate-200 dark:border-slate-700
          bg-white dark:bg-slate-800
          text-slate-800 dark:text-slate-100
          focus:outline-none focus:ring-2 focus:ring-brand-500/40
          placeholder-slate-300 dark:placeholder-slate-600
          transition-colors"
      />
    </div>
  );
}

export function PositionPage() {
  const [position, setPosition] = useState<PositionValue>("relative");
  const [offsets, setOffsets] = useState<Offsets>({
    top: "",
    left: "",
    right: "",
    bottom: "",
  });
  const [liveTransform, setLiveTransform] = useState<string>("");
  const [mobileControls, setMobileControls] = useState(false);

  const setOffset = (key: keyof Offsets, val: string) => {
    setOffsets((o) => {
      const next = { ...o, [key]: val };
      if (key === "top" && val.trim() !== "") next.bottom = "";
      if (key === "bottom" && val.trim() !== "") next.top = "";
      if (key === "left" && val.trim() !== "") next.right = "";
      if (key === "right" && val.trim() !== "") next.left = "";
      return next;
    });
  };

  const applyPreset = (preset: (typeof POSITION_PRESETS)[number]) => {
    setPosition(preset.position);
    setOffsets({ top: "", left: "", right: "", bottom: "", ...preset.offsets });
    setLiveTransform(preset.transform ?? "");
  };

  const isStatic = position === "static";

  const offsetLines = (["top", "left", "right", "bottom"] as const)
    .filter((k) => offsets[k].trim() !== "")
    .map((k) => `  ${k}: ${offsets[k]};`)
    .join("\n");

  const transformLine = liveTransform ? `\n  transform: ${liveTransform};` : "";
  const css = `.element {\n  position: ${position};${offsetLines ? "\n" + offsetLines : ""}${transformLine}\n}`;

  const liveStyle: React.CSSProperties = {
    position: position as any,
    transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
    zIndex: 10,
  };
  if (!isStatic) {
    if (offsets.top.trim()) liveStyle.top = offsets.top.trim();
    if (offsets.left.trim()) liveStyle.left = offsets.left.trim();
    if (offsets.right.trim()) liveStyle.right = offsets.right.trim();
    if (offsets.bottom.trim()) liveStyle.bottom = offsets.bottom.trim();
    if (liveTransform) liveStyle.transform = liveTransform;
  }

  const ControlsContent = (
    <>
      <SectionTitle>Position Value</SectionTitle>
      <Select
        label="position"
        value={position}
        options={(
          [
            "static",
            "relative",
            "absolute",
            "fixed",
            "sticky",
          ] as PositionValue[]
        ).map((v) => ({ value: v, label: v }))}
        onChange={(v) => {
          setPosition(v as PositionValue);
          setLiveTransform("");
        }}
      />

      <SectionTitle>Offsets</SectionTitle>
      <div
        className={clsx(
          "grid grid-cols-2 gap-2 mb-3",
          isStatic && "opacity-40 pointer-events-none",
        )}
      >
        <OffsetInput
          label="top"
          value={offsets.top}
          onChange={(v) => setOffset("top", v)}
        />
        <OffsetInput
          label="right"
          value={offsets.right}
          onChange={(v) => setOffset("right", v)}
        />
        <OffsetInput
          label="bottom"
          value={offsets.bottom}
          onChange={(v) => setOffset("bottom", v)}
        />
        <OffsetInput
          label="left"
          value={offsets.left}
          onChange={(v) => setOffset("left", v)}
        />
      </div>
      {isStatic && (
        <p className="text-[10px] font-mono text-slate-400 italic mb-3">
          Offsets have no effect on static elements
        </p>
      )}

      <SectionTitle>Presets</SectionTitle>
      <div className="flex flex-col gap-1 mb-3">
        {POSITION_PRESETS.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="w-full text-left px-2 py-1.5 rounded text-[11px] font-mono
              border border-slate-100 dark:border-slate-800
              bg-slate-50 dark:bg-slate-800/50
              text-slate-500 dark:text-slate-400
              hover:bg-brand-50 dark:hover:bg-brand-950/20
              hover:text-brand-600 dark:hover:text-brand-400
              hover:border-brand-200 dark:hover:border-brand-800
              transition-all duration-150"
          >
            {p.label}
          </button>
        ))}
      </div>

      <CodeBlock code={css} />
    </>
  );

  return (
    <div className="flex flex-1 overflow-hidden min-h-0 relative">
      <div className="hidden md:block w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        {ControlsContent}
      </div>

      <div className="flex-1 flex flex-col items-center justify-start gap-4 p-4 md:p-8 bg-slate-50 dark:bg-slate-950 overflow-auto">
        <div className="w-full flex justify-end md:hidden">
          <button
            onClick={() => setMobileControls(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <SlidersHorizontal size={13} />
            Controls
          </button>
        </div>

        <div className="w-full max-w-[700px] px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 leading-relaxed text-center">
          <span className="text-brand-600 dark:text-brand-400 font-bold">
            {position}
          </span>
          {" — "}
          {POSITION_DESCRIPTIONS[position]}
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 md:gap-3 w-full max-w-[700px]">
          {(
            [
              "static",
              "relative",
              "absolute",
              "fixed",
              "sticky",
            ] as PositionValue[]
          ).map((p) => (
            <button
              key={p}
              onClick={() => {
                setPosition(p);
                setLiveTransform("");
              }}
              className={clsx(
                "flex flex-col items-center gap-1.5 p-2 rounded-lg border transition-all cursor-pointer",
                position === p
                  ? "border-brand-500 bg-brand-50 dark:bg-brand-950/20"
                  : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-600",
              )}
            >
              <div className="w-full h-12 rounded relative bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div className="absolute top-1 left-1 w-5 h-4 rounded-sm bg-slate-300 dark:bg-slate-600 opacity-60" />
                <div
                  className="w-5 h-4 rounded-sm"
                  style={{
                    background: position === p ? "#7c3aed" : "#a78bfa",
                    position: p === "static" ? "static" : "absolute",
                    top:
                      p === "relative"
                        ? 4
                        : p === "absolute"
                          ? 2
                          : p === "fixed"
                            ? 0
                            : p === "sticky"
                              ? 2
                              : undefined,
                    right: p === "fixed" ? 1 : undefined,
                    left:
                      p === "absolute"
                        ? 10
                        : p === "relative"
                          ? 6
                          : p === "sticky"
                            ? 6
                            : undefined,
                    bottom: p === "sticky" ? 1 : undefined,
                  }}
                />
              </div>
              <span
                className={clsx(
                  "text-[10px] font-mono font-bold",
                  position === p
                    ? "text-brand-600 dark:text-brand-400"
                    : "text-slate-500 dark:text-slate-400",
                )}
              >
                {p}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-[480px] h-[260px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
          <div className="absolute top-2 left-3 text-[10px] font-mono text-slate-400 dark:text-slate-600 select-none">
            positioned ancestor
          </div>
          <div className="absolute top-8 left-4 flex flex-col gap-2">
            <div className="w-20 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400">
              sibling 1
            </div>
            <div className="w-20 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-mono text-slate-400">
              sibling 2
            </div>
          </div>
          <div
            style={liveStyle}
            className="w-24 h-16 rounded-xl bg-brand-600 flex flex-col items-center justify-center shadow-lg text-white"
          >
            <span className="font-mono font-extrabold text-sm">element</span>
            <span className="text-[9px] opacity-70 font-mono">{position}</span>
          </div>
          {!isStatic && (
            <div className="absolute bottom-2 right-3 flex gap-1.5 flex-wrap justify-end">
              {(["top", "left", "right", "bottom"] as const).map((k) =>
                offsets[k].trim() ? (
                  <span
                    key={k}
                    className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-mono text-slate-500 dark:text-slate-400"
                  >
                    {k}: {offsets[k]}
                  </span>
                ) : null,
              )}
              {liveTransform && (
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                  transform: {liveTransform}
                </span>
              )}
            </div>
          )}
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
