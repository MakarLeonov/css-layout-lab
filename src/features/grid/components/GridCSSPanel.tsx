import React from "react";
import { CodeBlock, SectionTitle } from "@/components/ui";
import { useGridStore } from "../store/gridStore";
import clsx from "clsx";

interface GridCSSPanelProps {
  mobile?: boolean;
}

export function GridCSSPanel({ mobile = false }: GridCSSPanelProps) {
  const store = useGridStore();

  const css = `.container {
  display: grid;
  grid-template-columns: ${store.templateColumns};
  grid-template-rows: ${store.templateRows};
  gap: ${store.gap}px;
  justify-items: ${store.justifyItems};
  align-items: ${store.alignItems};
}`;

  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 flex flex-col p-3",
        mobile
          ? "w-full"
          : "w-64 border-l border-slate-200 dark:border-slate-800 shrink-0",
      )}
    >
      <SectionTitle>Generated CSS</SectionTitle>
      <CodeBlock code={css} />
    </div>
  );
}
