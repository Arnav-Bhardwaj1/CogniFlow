import type { ComponentProps } from "react";
import { Handle, type HandleProps } from "@xyflow/react";

import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

export type BaseHandleProps = HandleProps;

export function BaseHandle({
  className,
  children,
  ...props
}: ComponentProps<typeof Handle>) {
  const canvasLightMode = useAtomValue(canvasLightModeAtom);

  return (
    <Handle
      {...props}
      className={cn(
        "h-[11px] w-[11px] rounded-full transition hover:scale-150 hover:bg-primary hover:border-primary hover:shadow-md hover:z-10",
        canvasLightMode
          ? "border border-slate-300 bg-slate-100"
          : "dark:border-secondary dark:bg-secondary border border-slate-300 bg-slate-100",
        className,
      )}
    >
      {children}
    </Handle>
  );
}
