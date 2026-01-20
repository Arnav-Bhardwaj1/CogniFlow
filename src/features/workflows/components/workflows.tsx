"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useCreateWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <div className="flex-1 flex justify-center items-center">
      <p>
        {JSON.stringify(workflows.data, null, 2)}
      </p>
    </div>
  );  
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) =>
{ const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { modal, handleError } = useUpgradeModal();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      },
      onError: (error) => {
        handleError(error);
      },
    });
  }  

  return (
    <>
      {modal}
      <EntityHeader
        title="Workflows" 
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={createWorkflow.isPending}
      />
    </>
  );
};

// A function that returns JSX is a React component

export const WorkflowsContainer = ( {
  children // children is a special prop in React that: children is whatever JSX you place inside a component when you use it.
}: {
  children: React.ReactNode; // ReactNode is a type that represents any valid React child, including elements, strings, numbers, fragments, portals, etc.
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
      >
      {children}
    </EntityContainer>
  )
};