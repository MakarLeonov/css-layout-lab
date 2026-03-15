import { CodeBlock, SectionTitle, Slider } from "@/components/ui";
import { useState } from "react";

export function BoxModelPage() {
  const [margin, setMargin] = useState(24);
  const [padding, setPadding] = useState(20);
  const [border, setBorder] = useState(4);
  const [width, setWidth] = useState(160);
  const [height, setHeight] = useState(80);

  const css = `.element {
  width: ${width}px;
  height: ${height}px;
  margin: ${margin}px;
  padding: ${padding}px;
  border: ${border}px solid #6366f1;
  box-sizing: border-box;
}`;

  const totalWidth = width + margin * 2;
  const totalHeight = height + margin * 2 + padding * 2;

  return (
    <div className="flex flex-1 overflow-hidden min-h-0">
      {/* Controls */}
      <div className="w-52 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto p-3 shrink-0">
        <SectionTitle>Box Model Controls</SectionTitle>
        <Slider
          label="margin"
          value={margin}
          min={0}
          max={60}
          onChange={setMargin}
        />
        <Slider
          label="padding"
          value={padding}
          min={0}
          max={60}
          onChange={setPadding}
        />
        <Slider
          label="border"
          value={border}
          min={0}
          max={24}
          onChange={setBorder}
        />
        <Slider
          label="width"
          value={width}
          min={40}
          max={280}
          onChange={setWidth}
        />
        <Slider
          label="height"
          value={height}
          min={40}
          max={200}
          onChange={setHeight}
        />

        <div className="mt-4">
          <SectionTitle>Total computed size</SectionTitle>
          <div className="text-[11px] font-mono space-y-1 text-slate-600 dark:text-slate-400">
            <div>
              Content:{" "}
              <span className="text-brand-600">
                {width} × {height}px
              </span>
            </div>
            <div>
              + Border:{" "}
              <span className="text-indigo-500">+{border * 2}px each side</span>
            </div>
            <div>
              + Padding:{" "}
              <span className="text-emerald-500">
                +{padding * 2}px each side
              </span>
            </div>
            <div>
              + Margin:{" "}
              <span className="text-amber-500">+{margin * 2}px each side</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <CodeBlock code={css} />
        </div>
      </div>

      {/* Visual */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950 overflow-auto p-8">
        <div className="flex flex-col items-center gap-6">
          {/* Box model visualization — 4 nested layers, each a solid color zone */}

          {/* MARGIN layer — dashed outline, transparent fill */}
          <div
            style={{
              padding: margin,
              transition: "all 0.2s",
              isolation: "isolate",
            }}
            className="relative border-2 border-dashed border-amber-400 rounded"
          >
            {margin > 0 && (
              <span
                className="absolute top-1 left-2 text-[10px] font-mono font-bold text-amber-500 select-none"
                style={{ zIndex: 10 }}
              >
                margin: {margin}px
              </span>
            )}

            {/* BORDER layer — solid indigo background, label in top-right */}
            <div
              style={{
                padding: border,
                background: "#6366f1",
                borderRadius: 6,
                transition: "all 0.2s",
                isolation: "isolate",
              }}
              className="relative"
            >
              {border > 0 && (
                <span
                  className="absolute top-1 right-2 text-[10px] font-mono font-bold text-white select-none"
                  style={{ zIndex: 10 }}
                >
                  border: {border}px
                </span>
              )}

              {/* PADDING layer — rgb(52 211 153 / 0.6) */}
              <div
                style={{
                  padding: padding,
                  background: "rgb(52 211 153 / 0.6)",
                  borderRadius: 4,
                  transition: "all 0.2s",
                  isolation: "isolate",
                }}
                className="relative"
              >
                {padding > 0 && (
                  <span
                    className="absolute top-1 left-2 text-[10px] font-mono font-bold text-white select-none"
                    style={{ zIndex: 10 }}
                  >
                    padding: {padding}px
                  </span>
                )}

                {/* CONTENT */}
                <div
                  style={{
                    width,
                    height,
                    background: "#7c3aed",
                    borderRadius: 4,
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: 4,
                  }}
                  className="text-white font-mono font-bold text-[12px]"
                >
                  <span>content</span>
                  <span className="text-[10px] opacity-70">
                    {width}×{height}px
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-[11px] font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm border-2 border-dashed border-amber-400 inline-block" />{" "}
              margin
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />{" "}
              border
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-400/60 inline-block" />{" "}
              padding
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-brand-600 inline-block" />{" "}
              content
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
