"use client";

import { useState, useCallback, useEffect, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { toast } from "sonner";
import { useGenerateWorkflowPlan } from "../hooks/use-generate-plan";
import { useReactFlow, type Node, type Edge } from "@xyflow/react";
import type { WorkflowPlan } from "../schema";
import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

const NODE_SPACING = 150;
const NODE_Y_STAGGER = 30; // slight vertical offset so edges aren't perfectly straight

interface AiPlannerBarProps {
  setNodes: Dispatch<SetStateAction<Node[]>>;
  setEdges: Dispatch<SetStateAction<Edge[]>>;
}

export const AiPlannerBar = ({ setNodes, setEdges }: AiPlannerBarProps) => {
  const [intent, setIntent] = useState("");
  const [showDraftBadge, setShowDraftBadge] = useState(false);
  const generatePlan = useGenerateWorkflowPlan();
  const reactFlowInstance = useReactFlow();
  const canvasLightMode = useAtomValue(canvasLightModeAtom);

  useEffect(() => {
    if (!showDraftBadge) return;
    const timer = setTimeout(() => setShowDraftBadge(false), 5000);
    return () => clearTimeout(timer);
  }, [showDraftBadge]);

  const handleGenerate = useCallback(() => {
    if (!intent.trim()) return;

    generatePlan.mutate(
      { intent: intent.trim() },
      {
        onSuccess: (result) => {
          const { plan, message } = result;

          if (!plan.nodes.length) {
            toast.error(
              message || "Could not generate a workflow for that request.",
              { duration: 6000 }
            );
            return;
          }

          // Get the center of the currently visible viewport in flow coordinates
          const viewport = reactFlowInstance.getViewport();
          const container = document.querySelector(".react-flow");
          const width = container?.clientWidth ?? 800;
          const height = container?.clientHeight ?? 600;

          // Convert the screen center to flow coordinates
          const centerFlow = reactFlowInstance.screenToFlowPosition({
            x: width / 2,
            y: height / 2,
          });

          // Calculate total width of the node chain so we can center it
          const totalWidth = (plan.nodes.length - 1) * NODE_SPACING;
          const startX = centerFlow.x - totalWidth / 2;

          const rfNodes: Node[] = plan.nodes.map((node, index) => ({
            id: node.id,
            type: node.type,
            position: {
              x: startX + index * NODE_SPACING,
              y: centerFlow.y + (index % 2 === 0 ? -NODE_Y_STAGGER : NODE_Y_STAGGER),
            },
            data: {
              ...node.config,
              generatedBy: "ai",
            },
          }));

          const rfEdges: Edge[] = plan.edges.map((edge, index) => ({
            id: `ai-edge-${index}`,
            source: edge.from,
            target: edge.to,
            sourceHandle: "source-1",
            targetHandle: "target-1",
          }));

          setNodes(rfNodes);
          setEdges(rfEdges);
          setShowDraftBadge(true);
          toast.success(
            `Generated workflow with ${plan.nodes.length} nodes`
          );
          setIntent("");
        },
      }
    );
  }, [intent, generatePlan, setNodes, setEdges, reactFlowInstance]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !generatePlan.isPending) {
      handleGenerate();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-2 rounded-lg p-2 shadow-md ${canvasLightMode
        ? "bg-white border border-slate-200"
        : "glass"
        }`}>
        <Input
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your automation…"
          className={`w-[320px] h-8 text-sm ${canvasLightMode ? "!bg-slate-50 !text-slate-900 !border-slate-200 placeholder:!text-slate-400 !caret-slate-900 focus-visible:!ring-slate-300" : ""}`}
          disabled={generatePlan.isPending}
        />
        <Button
          size="sm"
          onClick={handleGenerate}
          disabled={generatePlan.isPending || !intent.trim()}
          className="!text-white"
        >
          {generatePlan.isPending ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <SparklesIcon className="size-4" />
              Generate Workflow
            </>
          )}
        </Button>
      </div>
      {showDraftBadge && (
        <div className="bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white border border-zinc-700 rounded-md px-3 py-1.5 text-xs font-medium shadow-lg w-fit">
          AI Draft — Review Before Running
        </div>
      )}
    </div>
  );
};
