import { forwardRef, HTMLAttributes, type ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { NodeStatus } from "./node-status-indicator";
import { CheckCircle2Icon, Loader2Icon, XCircleIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

interface BaseNodeProps extends HTMLAttributes<HTMLDivElement> {
  status?: NodeStatus;
}
export const BaseNode = forwardRef<
  HTMLDivElement,
  BaseNodeProps
>(({ className, status, ...props }, ref) => {
  const canvasLightMode = useAtomValue(canvasLightModeAtom);

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-sm border text-card-foreground",
        "transition-all duration-200 hover:scale-[1.02]",
        canvasLightMode
          ? "bg-white border-slate-900 shadow-sm hover:shadow-md"
          : "bg-card dark:bg-[rgba(255,255,255,0.05)] dark:border-white/[0.15] dark:backdrop-blur-md border-border hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(249,115,22,0.25)] dark:hover:border-white/30",
        className,
      )}
      tabIndex={0}
      {...props}
    >
      {props.children}
      {status === "error" && (
        <XCircleIcon className="absolute bottom-0.5 right-0.5 size-2 text-red-700 stroke-3" />
      )}
      {status === "success" && (
        <CheckCircle2Icon className="absolute bottom-0.5 right-0.5 size-2 text-green-700 stroke-3" />
      )}
      {status === "loading" && (
        <Loader2Icon className="absolute -bottom-0.5 -right-0.5 size-2 text-blue-700 stroke-3 animate-spin" />
      )}
    </div>
  )
});
BaseNode.displayName = "BaseNode";

/**
 * A container for a consistent header layout intended to be used inside the
 * `<BaseNode />` component.
 */
export function BaseNodeHeader({
  className,
  ...props
}: ComponentProps<"header">) {
  return (
    <header
      {...props}
      className={cn(
        "mx-0 my-0 -mb-1 flex flex-row items-center justify-between gap-2 px-3 py-2",
        // Remove or modify these classes if you modify the padding in the
        // `<BaseNode />` component.
        className,
      )}
    />
  );
}

/**
 * The title text for the node. To maintain a native application feel, the title
 * text is not selectable.
 */
export function BaseNodeHeaderTitle({
  className,
  ...props
}: ComponentProps<"h3">) {
  return (
    <h3
      data-slot="base-node-title"
      className={cn("user-select-none flex-1 font-semibold", className)}
      {...props}
    />
  );
}

export function BaseNodeContent({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-content"
      className={cn("flex flex-col gap-y-2 p-3", className)}
      {...props}
    />
  );
}

export function BaseNodeFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="base-node-footer"
      className={cn(
        "flex flex-col items-center gap-y-2 border-t px-3 pt-2 pb-3",
        className,
      )}
      {...props}
    />
  );
}
