import { Button } from "@/components/ui/button";
import { useExecuteWorkflow } from "@/features/workflows/hooks/use-workflows";
import { FlaskConicalIcon, Loader2Icon } from "lucide-react";
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
import { useState, useEffect } from "react";

export const ExecuteWorkflowButton = ({
  workflowId,
  hasUnsavedChanges,
}: {
  workflowId: string;
  hasUnsavedChanges: boolean;
}) => {
  const executeWorkflow = useExecuteWorkflow();
  const [showAlert, setShowAlert] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Keep loading state for 5 seconds after mutation completes
  useEffect(() => {
    if (!isExecuting) return;
    const timer = setTimeout(() => setIsExecuting(false), 5000);
    return () => clearTimeout(timer);
  }, [isExecuting]);

  const isLoading = executeWorkflow.isPending || isExecuting;

  const handleExecute = () => {
    if (hasUnsavedChanges) {
      setShowAlert(true);
    } else {
      setIsExecuting(true);
      executeWorkflow.mutate({ id: workflowId });
    }
  };

  const confirmExecute = () => {
    setIsExecuting(true);
    executeWorkflow.mutate({ id: workflowId });
    setShowAlert(false);
  };

  return (
    <>
      <Button size="lg" onClick={handleExecute} disabled={isLoading}>
        {isLoading ? (
          <><Loader2Icon className="size-4 animate-spin" /> Executing...</>
        ) : (
          <><FlaskConicalIcon className="size-4" /> Execute workflow</>
        )}
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