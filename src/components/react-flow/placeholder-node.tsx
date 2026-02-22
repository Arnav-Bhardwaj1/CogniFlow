"use client";

import React, { useCallback, type ReactNode } from "react";
import {
  useReactFlow,
  useNodeId,
  Handle,
  Position,
  type NodeProps,
} from "@xyflow/react";

import { BaseNode } from "./base-node";
import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
  onClick?: () => void;
};

export function PlaceholderNode({ children, onClick }: PlaceholderNodeProps) {
  const canvasLightMode = useAtomValue(canvasLightModeAtom);

  return (
    <BaseNode
      className={canvasLightMode
        ? "w-auto h-auto border-dashed border-slate-400 bg-white p-4 text-center text-slate-400 shadow-sm cursor-pointer hover:border-slate-500 hover:bg-slate-50"
        : "w-auto h-auto border-dashed border-gray-400 bg-card p-4 text-center text-gray-400 shadow-none cursor-pointer hover:border-gray-500 hover:bg-gray-50"
      }
      onClick={onClick}
    >
      {children}
      <Handle
        type="target"
        style={{ visibility: "hidden" }}
        position={Position.Top}
        isConnectable={false}
      />
      <Handle
        type="source"
        style={{ visibility: "hidden" }}
        position={Position.Bottom}
        isConnectable={false}
      />
    </BaseNode>
  );
}
