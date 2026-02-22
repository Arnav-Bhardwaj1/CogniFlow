import * as React from "react"

import { cn } from "@/lib/utils"

import { useAtomValue } from "jotai"
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  const canvasLightMode = useAtomValue(canvasLightModeAtom)

  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        canvasLightMode ? "bg-white text-slate-900 border-slate-300 focus-visible:ring-slate-300" : "dark:bg-input/30 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
