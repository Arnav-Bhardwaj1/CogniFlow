import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleOpenSettings = () => {
    setIsDialogOpen(true);
  }
  return (
    <>
    <ManualTriggerDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        // {/* status={nodeStatus} TODO */}
        onSettings={handleOpenSettings}
        onDoubleClick={handleOpenSettings}
      />
    </>
  )
});

ManualTriggerNode.displayName = "ManualTriggerNode"; // this is needed for React.memo to work properly, otherwise the component will show up as "Anonymous" in React DevTools
