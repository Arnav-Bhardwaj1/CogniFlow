"use client";

import { useReactFlow, type Node, type NodeProps } from "@xyflow/react";
import {GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";
import { HTTPRequestFormValues, HTTPRequestDialog } from "./dialog";

type HttpRequestNodeData = {
  variableName?: string; // This allows subsequent nodes in the workflow to access the response data using this variable name.
  endpoint?: string; // endpoint is the URL that the HTTP Request node will call.
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
};
type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
  (props: NodeProps<HttpRequestNodeType>) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { setNodes } = useReactFlow();

    const handleOpenSettings = () => setDialogOpen(true);
    
    const handleSubmit = (values: HTTPRequestFormValues) => {
      setNodes((nodes) => nodes.map((node) => {
          if (node.id === props.id) {
              return {
                  ...node,
                  data: {
                      ...node.data,
                      ...values,
                  },
              };
          }
          return node;
      }));
      setDialogOpen(false);
  };
    const nodeStatus = "initial";
    const nodeData = props.data;
    const description = nodeData?.endpoint
      ? `${nodeData.variableName || "name"}, ${nodeData.method || "GET"}: ${nodeData.endpoint}`
      : "Not configured";

    return (
      <>
        <HTTPRequestDialog // every time the node updates, the dialog receives fresh defaults.
          open={dialogOpen} 
          onOpenChange={setDialogOpen} 
          onSubmit={handleSubmit}
          defaultValues={nodeData}
        />
        <BaseExecutionNode
          {...props}
          id={props.id}
          icon={GlobeIcon}
          name="HTTP Request"
          status={nodeStatus}
          description={description}
          onSettings={handleOpenSettings}
          onDoubleClick={handleOpenSettings}
        />
      </>
    );
  }
);

HttpRequestNode.displayName = "HttpRequestNode";
