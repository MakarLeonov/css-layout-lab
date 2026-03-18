import React, { useState } from "react";
import { Trash2, ChevronDown, ChevronRight } from "lucide-react";
import {
  Select,
  Slider,
  Toggle,
  SectionTitle,
  NumberInput,
  TextInput,
  Button,
} from "@/components/ui";
import { useFlexboxStore } from "../store/flexboxStore";
import { useTranslation } from "@/hooks/useTranslation";
import clsx from "clsx";

const FLEX_PRESETS = [
  {
    id: "navbar",
    label: "Navbar",
    state: {
      direction: "row",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: 16,
    },
  },
  {
    id: "centered",
    label: "Centered",
    state: {
      direction: "column",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: 16,
    },
  },
  {
    id: "cardgrid",
    label: "Card Grid",
    state: {
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "wrap",
      gap: 16,
    },
  },
  {
    id: "sidebar",
    label: "Sidebar",
    state: {
      direction: "row",
      justifyContent: "flex-start",
      alignItems: "stretch",
      flexWrap: "nowrap",
      gap: 0,
    },
  },
  {
    id: "holygrail",
    label: "Holy Grail",
    state: {
      direction: "column",
      justifyContent: "space-between",
      alignItems: "stretch",
      flexWrap: "nowrap",
      gap: 8,
    },
  },
  {
    id: "evenly",
    label: "Space Evenly",
    state: {
      direction: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      flexWrap: "nowrap",
      gap: 8,
    },
  },
];

interface AccordionSectionProps {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  badge?: string;
}

function AccordionSection({
  title,
  open,
  onToggle,
  children,
  badge,
}: AccordionSectionProps) {
  return (
    <div className="border-b border-slate-100 dark:border-slate-800 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <span className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400 font-mono">
            {title}
          </span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-[9px] font-mono font-bold">
              {badge}
            </span>
          )}
        </span>
        {open ? (
          <ChevronDown size={12} className="text-slate-400 shrink-0" />
        ) : (
          <ChevronRight size={12} className="text-slate-400 shrink-0" />
        )}
      </button>
      {open && <div className="px-3 pb-3 pt-1">{children}</div>}
    </div>
  );
}

interface FlexControlsProps {
  mobile?: boolean;
}

export function FlexControls({ mobile = false }: FlexControlsProps) {
  const store = useFlexboxStore();
  const { t } = useTranslation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    container: true,
    item: true,
    presets: true,
  });

  const toggle = (key: string) =>
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));

  const selectedItem =
    store.items.find((i) => i.id === store.selectedId) ?? null;

  React.useEffect(() => {
    if (selectedItem) {
      setOpenSections((s) => ({ ...s, item: true }));
    }
  }, [selectedItem?.id]);

  return (
    <div
      className={clsx(
        "bg-white dark:bg-slate-900 overflow-y-auto flex flex-col",
        mobile
          ? "w-full"
          : "w-52 border-r border-slate-200 dark:border-slate-800 shrink-0",
      )}
    >
      <AccordionSection
        title="Container"
        open={openSections.container}
        onToggle={() => toggle("container")}
      >
        <Select
          label={t("flexDirection")}
          value={store.direction}
          options={["row", "row-reverse", "column", "column-reverse"].map(
            (v) => ({ value: v, label: v }),
          )}
          onChange={(v) => store.set({ direction: v })}
        />
        <Select
          label={t("justifyContent")}
          value={store.justifyContent}
          options={[
            "flex-start",
            "center",
            "flex-end",
            "space-between",
            "space-around",
            "space-evenly",
          ].map((v) => ({ value: v, label: v }))}
          onChange={(v) => store.set({ justifyContent: v })}
        />
        <Select
          label={t("alignItems")}
          value={store.alignItems}
          options={[
            "stretch",
            "flex-start",
            "center",
            "flex-end",
            "baseline",
          ].map((v) => ({ value: v, label: v }))}
          onChange={(v) => store.set({ alignItems: v })}
        />
        <Select
          label={t("flexWrap")}
          value={store.flexWrap}
          options={["nowrap", "wrap", "wrap-reverse"].map((v) => ({
            value: v,
            label: v,
          }))}
          onChange={(v) => store.set({ flexWrap: v })}
        />
        <Slider
          label="gap"
          value={store.gap}
          min={0}
          max={48}
          defaultValue={8}
          onChange={(v) => store.set({ gap: v })}
        />
        <Toggle
          label={t("showAxes")}
          value={store.showAxes}
          onChange={(v) => store.set({ showAxes: v })}
        />
        <Toggle
          label={t("animate")}
          value={store.animate}
          onChange={(v) => store.set({ animate: v })}
        />
      </AccordionSection>

      {selectedItem && (
        <AccordionSection
          title="Selected Item"
          badge={`#${selectedItem.id}`}
          open={openSections.item}
          onToggle={() => toggle("item")}
        >
          <NumberInput
            label={t("flexGrow")}
            value={selectedItem.grow}
            onChange={(v) =>
              store.setItem(selectedItem.id, { grow: Number(v) })
            }
          />
          <NumberInput
            label={t("flexShrink")}
            value={selectedItem.shrink}
            onChange={(v) =>
              store.setItem(selectedItem.id, { shrink: Number(v) })
            }
          />
          <TextInput
            label={t("flexBasis")}
            value={selectedItem.basis}
            onChange={(v) => store.setItem(selectedItem.id, { basis: v })}
          />
          <NumberInput
            label={t("order")}
            value={selectedItem.order}
            onChange={(v) =>
              store.setItem(selectedItem.id, { order: Number(v) })
            }
          />
          <Select
            label={t("alignSelf")}
            value={selectedItem.alignSelf}
            options={[
              "auto",
              "stretch",
              "flex-start",
              "center",
              "flex-end",
              "baseline",
            ].map((v) => ({ value: v, label: v }))}
            onChange={(v) => store.setItem(selectedItem.id, { alignSelf: v })}
          />
          <Button
            variant="soft-danger"
            size="sm"
            onClick={() => store.removeItem(selectedItem.id)}
            className="w-full justify-center mt-2"
          >
            <Trash2 size={11} /> {t("removeItem")}
          </Button>
        </AccordionSection>
      )}

      <AccordionSection
        title="Presets"
        open={openSections.presets}
        onToggle={() => toggle("presets")}
      >
        <div className="flex flex-col gap-1">
          {FLEX_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => store.set(preset.state as any)}
              className="w-full text-left px-2 py-1.5 rounded text-[11px] font-mono
                border border-slate-100 dark:border-slate-800
                bg-slate-50 dark:bg-slate-800/50
                text-slate-600 dark:text-slate-400
                hover:bg-brand-50 dark:hover:bg-brand-950/20
                hover:text-brand-600 dark:hover:text-brand-400
                hover:border-brand-200 dark:hover:border-brand-800
                transition-all duration-150"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
}
