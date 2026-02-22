import { atom } from "jotai";

/**
 * When true, the canvas area (React Flow canvas, nodes, handles,
 * and node-selector sidebar) renders in light mode.
 * The rest of the app remains unchanged (dark).
 */
export const canvasLightModeAtom = atom<boolean>(false);
