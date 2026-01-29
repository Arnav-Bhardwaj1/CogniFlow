"use client";
import { type NodeProps, Position, useReactFlow } from "@xyflow/react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import { memo, type ReactNode, useCallback } from "react";
import { BaseNode, BaseNodeContent } from "@/components/react-flow/base-node";
import { BaseHandle } from "@/components/react-flow/base-handle"; 
import { WorkflowNode } from "@/components/workflow-node";

// BaseNode → outer container (border, background, selection state). BaseNodeContent → inner layout (icon, title, body). So all nodes look and behave consistently.

interface BaseExecutionNodeProps extends NodeProps {
  icon: LucideIcon | string;
  name: string;
  description?: string;
  children?: ReactNode;
  status?: NodeStatus;
  onSettings?: () => void;
  onDoubleClick?: () => void;
};
export const BaseExecutionNode = memo( // memo to prevent unnecessary re-renders due to React Flow's frequent updates
    ({
        id,
        icon: Icon,
        name,
        description,
        children,
        status = "initial",
        onSettings,
        onDoubleClick,
    }: BaseExecutionNodeProps) => {
        const { setNodes, setEdges } = useReactFlow();
        const handleDelete = () => {
            setNodes((currentNodes) => currentNodes.filter((node) => node.id !== id));
            setEdges((currentEdges) => currentEdges.filter((edge) => edge.source !== id && edge.target !== id));
        };
        return (
            <WorkflowNode
                name={name}
                description={description}
                onDelete={handleDelete}
                onSettings={onSettings}
            >
                <NodeStatusIndicator status={status} variant="border">
                <BaseNode
                onDoubleClick={onDoubleClick}
                status={status}
                >
                    <BaseNodeContent>
                    {typeof Icon === "string" ? (
                        <Image
                            src={Icon}
                            alt={name}
                            width={16}
                            height={16}
                        />
                    ) : (
                        <Icon className="size-4 text-muted-foreground" />

                    )}
                    {children}
                    <BaseHandle // BaseHandle represents a connection point (port) on a node — where edges can connect to or from.
                    id="target-1"
                    type="target"
                    position={Position.Left}
                    />
                    <BaseHandle 
                    id="source-1"
                    type="source"
                    position={Position.Right}
                    />
                    </BaseNodeContent>
                </BaseNode>
                </NodeStatusIndicator>
            </WorkflowNode>
        );
    }
)

BaseExecutionNode.displayName = "BaseExecutionNode";