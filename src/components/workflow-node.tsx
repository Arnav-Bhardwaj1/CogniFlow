"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { SettingsIcon, TrashIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./ui/button";

interface WorkflowNodeProps {
    children: ReactNode;
    showToolbar?: boolean;
    onDelete?: () => void;
    onSettings?: () => void;
    name?: string;
    description?: string;
};

import { useAtomValue } from "jotai";
import { canvasLightModeAtom } from "@/features/editor/store/canvas-theme-atom";

export function WorkflowNode({
    children,
    showToolbar = true,
    onDelete,
    onSettings,
    name,
    description,
}: WorkflowNodeProps) {
    const canvasLightMode = useAtomValue(canvasLightModeAtom);

    return (
        <>
            {showToolbar && (
                <NodeToolbar> { /* Top toolbar for delete/settings */}
                    <div className="flex items-center gap-1">
                        <Button size="sm" variant="secondary" onClick={onSettings}>
                            <SettingsIcon className="size-4" />
                        </Button>

                        <Button size="sm" variant="destructive" onClick={onDelete}>
                            <TrashIcon className="size-4" />
                        </Button>
                    </div>
                </NodeToolbar>
            )}
            {children}
            {name && (
                <NodeToolbar // Bottom toolbar for name/description
                    position={Position.Bottom}
                    isVisible
                    className="max-w-50 text-center"
                >
                    <p className={`font-medium text-sm ${canvasLightMode ? "text-slate-900" : "text-foreground"}`}>{name}</p>
                    {description && <p className={`text-sm truncate ${canvasLightMode ? "text-slate-500" : "text-muted-foreground"}`}>
                        {description}
                    </p>}
                </NodeToolbar>
            )}
        </>
    );
}