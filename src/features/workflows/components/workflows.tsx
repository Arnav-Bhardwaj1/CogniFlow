"use client";

import { EntityContainer, EntityHeader } from "@/components/entity-components";
import { useSuspenseWorkflows } from "../hooks/use-workflows";

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <p>
      {JSON.stringify(workflows.data, null, 2)}
    </p>
  );
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) =>
{
  return (
    <>
      <EntityHeader
        title="Workflows" 
        description="Create and manage your workflows"
        onNew={() => {}}
        newButtonLabel="New Workflow"
        disabled={disabled}
        isCreating={false}
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