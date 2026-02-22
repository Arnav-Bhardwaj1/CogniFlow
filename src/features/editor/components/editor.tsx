"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseWorkflow } from "@/features/workflows/hooks/use-workflows";
import { useState, useCallback, useMemo, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Node, Edge, NodeChange, EdgeChange, Connection, Background, Controls, MiniMap, Panel } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { nodeComponents } from "@/config/node-components";
import { AddNodeButton } from "./add-node-button";
import { useSetAtom, useAtomValue } from "jotai";
import { editorAtom } from "../store/atom";
import { canvasLightModeAtom } from "../store/canvas-theme-atom";
import { NodeType } from "@/app/generated/prisma";
import { ExecuteWorkflowButton } from "./execute-workflow-button";
import { AiPlannerBar } from "@/features/ai-planner/components/ai-planner-bar";

export const EditorLoading = () => {
  return <LoadingView message="Loading editor..." />;
};

export const EditorError = () => {
  return <ErrorView message="Error loading editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const setCanvasLightMode = useSetAtom(canvasLightModeAtom);
  const canvasLightMode = useAtomValue(canvasLightModeAtom);

  useEffect(() => {
    return () => {
      setCanvasLightMode(false);
    };
  }, [setCanvasLightMode]);

  const setEditor = useSetAtom(editorAtom); // to store the ReactFlow instance in Jotai atom. means other components can access the editor instance via the atom. Instance means the ReactFlow state reference

  const [nodes, setNodes] = useState<Node[]>(workflow.nodes); // initialize with workflow nodes
  const [edges, setEdges] = useState<Edge[]>(workflow.edges);

  const onNodesChange = useCallback( // useCallback to memoize the function, preventing unnecessary re-renders
    (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const hasManualTrigger = useMemo(() => {
    return nodes.some((node) => node.type === NodeType.MANUAL_TRIGGER);
  }, [nodes]);

  const hasUnsavedChanges = useMemo(() => {
    const nodesChanged = JSON.stringify(nodes) !== JSON.stringify(workflow.nodes);
    const edgesChanged = JSON.stringify(edges) !== JSON.stringify(workflow.edges);
    return nodesChanged || edgesChanged;
  }, [nodes, edges, workflow.nodes, workflow.edges]);

  return (
    <div style={{ width: '100%', height: '100%' }} data-canvas-light={canvasLightMode ? "true" : undefined}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeComponents}
        onInit={setEditor} // store the ReactFlow instance in Jotai atom
        fitView
        snapGrid={[10, 10]}
        snapToGrid
        panOnScroll
        proOptions={{ hideAttribution: true }}
        className={canvasLightMode ? "canvas-light-mode" : ""}
      // panOnDrag={false} // this prevents panning when dragging nodes. panning means moving the whole canvas
      // selectionOnDrag // this selects multiple nodes when dragging on empty space
      >
        <Background className={canvasLightMode ? "!bg-[#fcfcfd]" : "!bg-[#fcfcfd] dark:!bg-[#0d0d1a]"} />
        <Controls />
        <MiniMap />
        <Panel position="top-left">
          <AiPlannerBar setNodes={setNodes} setEdges={setEdges} />
        </Panel>
        <Panel position="top-right">
          <AddNodeButton />
        </Panel>
        {hasManualTrigger && (
          <Panel position="bottom-center">
            <ExecuteWorkflowButton workflowId={workflowId} hasUnsavedChanges={hasUnsavedChanges} />
          </Panel>
        )}
      </ReactFlow>
    </div>
  );
};

