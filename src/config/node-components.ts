import { NodeType } from "@/app/generated/prisma";
import { InitialNode } from "@/components/initial-node";
import { HttpRequestNode } from "@/features/executions/components/http-request/node";
import { GoogleFormTrigger } from "@/features/triggers/components/google-form-trigger/node";
import { ManualTriggerNode } from "@/features/triggers/components/manual-trigger/node";
import { RazorPayTriggerNode } from "@/features/triggers/components/razorpay-trigger/node";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = { // this is an object, NOT a function. It acts like a registry or dictionary that maps node type identifiers to their corresponding React components.
  [NodeType.INITIAL]: InitialNode,
  [NodeType.MANUAL_TRIGGER]: ManualTriggerNode,
  [NodeType.HTTP_REQUEST]: HttpRequestNode,
  [NodeType.GOOGLE_FORM_TRIGGER]: GoogleFormTrigger,
  [NodeType.RAZORPAY_TRIGGER]: RazorPayTriggerNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents; // this type represents all valid node types that have been registered in the nodeComponents object. example: 'InitialNode'

// nodeComponents is a Map of node types to their corresponding React components. This is a lookup table that tells the graph UI which React component to render for each node type. Backend stores: NodeType.INITIAL, Frontend uses: 'InitialNode'. This object maps one to the other. This is type-safe mapping from backend → frontend.