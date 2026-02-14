
import { NodeType } from "@/app/generated/prisma";
import { NodeExecutor } from "../types";
import { manualTriggerExecutor } from "@/features/triggers/components/manual-trigger/executor";
import { httpRequestExecutor } from "../components/http-request/executor";
import { googleFormTriggerExecutor } from "@/features/triggers/components/google-form-trigger/executor";
import { razorpayTriggerExecutor } from "@/features/triggers/components/razorpay-trigger/executor";
import { geminiExecutor } from "../components/gemini/executor";
import { openaiExecutor } from "../components/openai/executor";

export const executorRegistry: Record<NodeType, NodeExecutor> = { // map of node types to their executors, this is an object, not a function
  [NodeType.MANUAL_TRIGGER]: manualTriggerExecutor,
  [NodeType.HTTP_REQUEST]: httpRequestExecutor,
  [NodeType.GOOGLE_FORM_TRIGGER]: googleFormTriggerExecutor,
  [NodeType.RAZORPAY_TRIGGER]: razorpayTriggerExecutor,
  [NodeType.GEMINI]: geminiExecutor,
  [NodeType.ANTHROPIC]: geminiExecutor, // TODO: FIx later
  [NodeType.OPENAI]: openaiExecutor,
  [NodeType.INITIAL]: manualTriggerExecutor // never executed, but needs an executor to satisfy the type errors. why never executed? because initial node just provides initial data from the trigger, no execution needed. 
};

export const getExecutor = (type: NodeType): NodeExecutor => {
    const executor = executorRegistry[type];
    if (!executor) {
        throw new Error(`No executor found for node type: ${type}`);
    }
    return executor;
};