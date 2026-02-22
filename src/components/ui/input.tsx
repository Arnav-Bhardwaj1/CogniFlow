import * as React from "react"

import { cn } from "@/lib/utils"

import { useAtomValue } from "jotai"
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  const canvasLightMode = useAtomValue(canvasLightModeAtom)

  return (
    <input // returns the <input> HTML element, which has inbuilt props like type, value, onChange, etc.
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        canvasLightMode ? "bg-white text-slate-900 border-slate-300 focus-visible:ring-slate-300" : "dark:bg-input/30 bg-transparent focus-visible:border-ring focus-visible:ring-ring/50",
        "focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
