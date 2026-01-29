"use client";

import type { Node, NodeProps, useReactFlow } from "@xyflow/react";
import {GlobeIcon } from "lucide-react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../base-execution-node";

type HttpRequestNodeData = {
  endpoint?: string; // endpoint is the URL that the HTTP Request node will call.
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: string;
  [key: string]: unknown; // means any other additional data can be stored
};
type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo(
  (props: NodeProps<HttpRequestNodeType>) => {
    const nodeData = props.data as HttpRequestNodeData; // Type assertion to access specific properties of the node's data

    const description = nodeData?.endpoint
      ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
      : "Not configured";

    return (
      <>
        <BaseExecutionNode
          {...props}
          id={props.id}
          icon={GlobeIcon}
          name="HTTP Request"
          description={description}
          onSettings={() => {}}
          onDoubleClick={() => {}}
        />
      </>
    );
  }
);

HttpRequestNode.displayName = "HttpRequestNode";
