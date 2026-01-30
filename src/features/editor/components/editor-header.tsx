"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger} from "@/components/ui/sidebar";
import { SaveIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useSuspenseWorkflow, useUpdateWorkflow, useUpdateWorkflowName } from "@/features/workflows/hooks/use-workflows";
import { editorAtom } from "../store/atom";
import { useAtomValue } from "jotai";

export const EditorSaveButton = ({ workflowId }: { workflowId: string }) => {
  const editor = useAtomValue(editorAtom);
  const saveWorkflow = useUpdateWorkflow();
  const handleSave = () => {
    if (!editor) {
      return;
    }
    const nodes = editor.getNodes();
    const edges = editor.getEdges();
    saveWorkflow.mutate({
      id: workflowId,
      nodes,
      edges,
    });
  };

  return (
    <div className="ml-auto">
      <Button size="sm" onClick={handleSave} disabled={saveWorkflow.isPending}> {/* isPending is an inbuilt prop of useMutation */}
        <SaveIcon className="size-4" />
        Save
      </Button>
    </div>
  );
};

export const EditorNameInput = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseWorkflow(workflowId);
  const updateWorkflowName = useUpdateWorkflowName();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workflow.name);
  const inputRef = useRef<HTMLInputElement>(null); // reference to the input element

  useEffect(() => {
    if (workflow.name) {
      setName(workflow.name);
    }
  }, [workflow.name]);

  useEffect(() => { // focus and select input text when entering edit mode
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // useRef gives direct access to DOM element, does not trigger re-render and the change is persistent across renders
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (name === workflow.name) { 
      setIsEditing(false);
      return;
    }

    try {
      await updateWorkflowName.mutateAsync({ id: workflowId, name });
    } catch { // why in catch? because mutateAsync throws if mutation fails
      setName(workflow.name); // revert to original name on error
    } finally {
      setIsEditing(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSave();
    } else if (event.key === "Escape") {
      setName(workflow.name);
      setIsEditing(false);
    }
  };

  if (!isEditing) { // when isEditing is false
    return (
      <BreadcrumbItem
        onClick={() => setIsEditing(true)} // calls the return statement written below
        className="cursor-pointer hover:text-foreground transition-colors"
      >
        {workflow.name}
      </BreadcrumbItem>
    );
  }

  return ( // when isEditing is true
    <BreadcrumbItem>
      <Input // is this an inbuilt component? yes, from shadcn/ui
        disabled={updateWorkflowName.isPending} // disable input while update is pending
        ref={inputRef}
        value={name}
        onKeyDown={handleKeyDown}
        onChange={(e) => setName(e.target.value)}
        onBlur={handleSave} // is onBlur an inbuilt prop? yes, called when input loses focus
        className="h-7 w-auto min-w-[100px] px-2"
      />
    </BreadcrumbItem>
  );
};

export const EditorBreadcrumbs = ({ workflowId }: { workflowId: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
        {/* The below line will now work like next.js link (as its child is <Link>) */}
          <BreadcrumbLink asChild> 
            <Link prefetch href="/workflows">
              Workflows
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <EditorNameInput workflowId={workflowId} />
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export const EditorHeader = ({workflowId}: {workflowId: string}) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2
    border-b px-4 bg-background">
      <SidebarTrigger />
      <div className="flex flex-row gap-x-4 w-full items-center">
        <EditorBreadcrumbs workflowId={workflowId} />
        <EditorSaveButton workflowId={workflowId} />
      </div>
    </header>
  );
};