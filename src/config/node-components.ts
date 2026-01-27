import { NodeType } from "@/app/generated/prisma";
import { InitialNode } from "@/components/initial-node";
import type { NodeTypes } from "@xyflow/react";

export const nodeComponents = { // this is an object, NOT a function. It acts like a registry or dictionary that maps node type identifiers to their corresponding React components.
  [NodeType.INITIAL]: InitialNode,
} as const satisfies NodeTypes;

export type RegisteredNodeType = keyof typeof nodeComponents; // this type represents all valid node types that have been registered in the nodeComponents object. example: 'InitialNode'

// nodeComponents is a Map of node types to their corresponding React components. This is a lookup table that tells the graph UI which React component to render for each node type. Backend stores: NodeType.INITIAL, Frontend uses: 'InitialNode'. This object maps one to the other. This is type-safe mapping from backend → frontend.