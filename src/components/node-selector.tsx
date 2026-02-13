"use client";

import { createId } from "@paralleldrive/cuid2";
import { useReactFlow } from "@xyflow/react";
import { GlobeIcon, MousePointerIcon } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { NodeType } from "@/app/generated/prisma";

export type NodeTypeOption = {
  label: string;
  icon: React.ComponentType<{ className?: string }> | string;
  description: string;
  type: NodeType;
};

const triggerNodes: NodeTypeOption[] = [ // triggerNodes are nodes that start a workflow
  {
    label: "Trigger manually",
    icon: MousePointerIcon,
    description: "Runs the flow manually",
    type: NodeType.MANUAL_TRIGGER,
  },
  {
    label: "Google Form Trigger",
    icon: '/logos/googleform.svg',
    description: "Runs the flow when a Google Form is submitted",
    type: NodeType.GOOGLE_FORM_TRIGGER,
  },
];

const executionNodes: NodeTypeOption[] = [ // executionNodes are nodes that perform actions within a workflow
  {
    label: "HTTP Request",
    icon: GlobeIcon,
    description: "Makes an HTTP request",
    type: NodeType.HTTP_REQUEST,
  },
];

interface NodeSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function NodeSelector({
  open,
  onOpenChange,
  children,
}: NodeSelectorProps) {
  const { setNodes, getNodes, screenToFlowPosition } = useReactFlow(); // getReactFlow functions to manipulate nodes and positions
  const handleNodeSelect = useCallback((nodeType: NodeTypeOption) => {
    if (nodeType.type === NodeType.MANUAL_TRIGGER) {
      const nodes = getNodes();
      const hasManualTrigger = nodes.some( // .some checks if any node in the array satisfies the condition
        (node) => node.type === NodeType.MANUAL_TRIGGER
      );

      if (hasManualTrigger) {
        toast.error("You can only have one manual trigger");
        return;
      }
    }
    setNodes((nodes) => { // setNodes updates the nodes in the flow
      const hasInitialTrigger = nodes.some(
        (node) => node.type === NodeType.INITIAL
      );
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const flowPosition = screenToFlowPosition({ // convert screen coordinates to flow coordinates
        x: centerX + (Math.random() - 0.5) * 200, // random offset to avoid overlap
        y: centerY + (Math.random() - 0.5) * 200,
      });
      const newNode = {
        id: createId(),
        data: {},
        type: nodeType.type,
        position: flowPosition,
      };
      if (hasInitialTrigger) {
        return [newNode];
      }

      return [...nodes, newNode];
    });

    onOpenChange(false);
  }, [
    setNodes,
    getNodes,
    screenToFlowPosition,
    onOpenChange,
  ]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>What triggers this workflow?</SheetTitle>
          <SheetDescription>
            A trigger is a step that starts the workflow.
          </SheetDescription>
        </SheetHeader>
        <div>
          {triggerNodes.map((node) => {
            const Icon = node.icon;
            return (
              <div
                key={node.type}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(node)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? ( // check if Icon is a string (URL) or a component
                    /* eslint-disable @next/next/no-img-element */
                    <img // used img instead of Next.js Image component because the icon is tiny (its not an "image" that needs optimization)
                      src={Icon}
                      alt={node.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" /> // render the icon component
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{node.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {node.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Separator />
        <div>
          {executionNodes.map((node) => {
            const Icon = node.icon;

            return (
              <div
                key={node.type}
                className="w-full justify-start h-auto py-5 px-4 rounded-none cursor-pointer border-l-2 border-transparent hover:border-l-primary"
                onClick={() => handleNodeSelect(node)}
              >
                <div className="flex items-center gap-6 w-full overflow-hidden">
                  {typeof Icon === "string" ? (
                    <img
                      src={Icon}
                      alt={node.label}
                      className="size-5 object-contain rounded-sm"
                    />
                  ) : (
                    <Icon className="size-5" />
                  )}
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium">{node.label}</span>
                    <span className="text-xs text-muted-foreground">
                      {node.description}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
