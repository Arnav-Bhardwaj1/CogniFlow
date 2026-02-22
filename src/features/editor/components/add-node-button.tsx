"use client";
import { PlusIcon } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { NodeSelector } from "@/components/node-selector";
import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

export const AddNodeButton = memo(() => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const canvasLightMode = useAtomValue(canvasLightModeAtom);
  return (
    <NodeSelector open={selectorOpen} onOpenChange={setSelectorOpen}>
      <Button
        onClick={() => setSelectorOpen(true)}
        size="icon"
        variant="outline"
        className={`size-12 rounded-xl ${canvasLightMode
          ? "bg-white text-slate-900 border border-slate-300 hover:bg-slate-100 shadow-sm"
          : "glass text-foreground dark:text-white border border-black/10 dark:border-white/80"
          }`}
      >
        <PlusIcon className="size-6" />

      </Button>
    </NodeSelector>
  )
});
AddNodeButton.displayName = "AddNodeButton";