import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";
import { FlaskConicalIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

export const ExecuteWorkflowButton = ({
  workflowId,
  hasUnsavedChanges,
}: {
  workflowId: string;
  hasUnsavedChanges: boolean;
}) => {
  const executeWorkflow = useExecuteWorkflow();
  const [showAlert, setShowAlert] = useState(false);

  const handleExecute = () => {
    if (hasUnsavedChanges) {
      setShowAlert(true);
    } else {
      executeWorkflow.mutate({ id: workflowId });
    }
  };

  const confirmExecute = () => {
    executeWorkflow.mutate({ id: workflowId });
    setShowAlert(false);
  };

  return (
    <>
      <Button size="lg" onClick={handleExecute} disabled={executeWorkflow.isPending}>
        <FlaskConicalIcon className="size-4" />
        Execute workflow
      </Button>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reminder</AlertDialogTitle>
            <AlertDialogDescription>
              You might have unsaved changes in the workflow. The execution will use the last saved version in that case, not the current editor state.
              Have you saved your changes?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmExecute}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};