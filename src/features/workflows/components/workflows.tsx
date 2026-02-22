"use client";

import { EmptyView, EntityContainer, EntityHeader, EntityItem, EntityList, EntityPagination, EntitySearch, ErrorView, LoadingView } from "@/components/entity-components";
import { useCreateWorkflow, useRemoveWorkflow, useSuspenseWorkflows } from "../hooks/use-workflows";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";
import { useRouter } from "next/navigation";
import { useWorkflowsParams } from "../hooks/use-workflows-params";
import { useEntitySearch } from "@/hooks/use-entity-search";
import { WorkflowIcon } from "lucide-react";
import { Workflow } from "@/app/generated/prisma";
import { formatDistanceToNow } from "date-fns";

export const WorkflowsSearch = () => {
  const [params, setParams] = useWorkflowsParams();
  const { searchValue, onSearchChange } = useEntitySearch({
    params,
    setParams,
  });

  return (
    <EntitySearch
      value={searchValue}
      onChange={onSearchChange}
      placeholder="Search Workflows"
    />
  )
}

export const WorkflowsList = () => {
  const workflows = useSuspenseWorkflows();
  return (
    <EntityList
      items={workflows.data.items}
      getKey={(workflow) => workflow.id}
      renderItem={(workflow) => <WorkflowItem data={workflow} />} // why is superjson needed here? you know
      emptyView={<WorkflowsEmpty />}
    />
  )
};

export const WorkflowsHeader = ({ disabled }: { disabled?: boolean }) => {
  const createWorkflow = useCreateWorkflow();
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
export const WorkflowsPagination = () => {
  const workflows = useSuspenseWorkflows();
  const [params, setParams] = useWorkflowsParams();
  return (
    <EntityPagination
      disabled={workflows.isFetching}
      totalPages={workflows.data.totalPages}
      page={workflows.data.page}
      onPageChange={(page) => setParams({ ...params, page })}
    />)
};

// A function that returns JSX is a React component

export const WorkflowsContainer = ({
  children // children is a special prop in React that: children is whatever JSX you place inside a component when you use it.
}: {
  children: React.ReactNode; // ReactNode is a type that represents any valid React child, including elements, strings, numbers, fragments, portals, etc.
}) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<WorkflowsSearch />}
      pagination={<WorkflowsPagination />}
    >
      {children}
    </EntityContainer>
  )
};

export const WorkflowsLoading = () => {
  return <LoadingView message="Loading workflows..." />;
};

export const WorkflowsError = () => {
  return <ErrorView message="Failed to load workflows." />;
}
export const WorkflowsEmpty = () => {
  const createWorkflow = useCreateWorkflow();
  const router = useRouter();
  const { handleError, modal } = useUpgradeModal();
  const handleCreate = () => {
    createWorkflow.mutate(undefined, {
      onError: (error) => {
        handleError(error);
      },
      onSuccess: (data) => {
        router.push(`/workflows/${data.id}`);
      }
    });
  };
  return (
    <>
      {modal}   {/* Render the upgrade modal, may or may not be visible based on state */}
      <EmptyView
        onNew={handleCreate}
        message="No Workflows Found. Get started by
        creating a new workflow."
      />
    </>
  );
};

export const WorkflowItem = ({
  data,
}: {
  data: Workflow
}) => {
  const removeWorkflow = useRemoveWorkflow();
  const handleRemove = () => {
    removeWorkflow.mutate({ id: data.id });
  };
  return (
    <EntityItem
      href={`/workflows/${data.id}`}
      title={data.name}

      subtitle={
        <>
          Updated {formatDistanceToNow(data.updatedAt, { addSuffix: true })}{""}
          &bull; Created{" "}
          {formatDistanceToNow(data.createdAt, { addSuffix: true })} {/* how long ago it was created, relative to now */}
        </>
      }
      image={
        <WorkflowIcon className="size-5 text-white/70" />
      }
      onRemove={handleRemove}
      isRemoving={removeWorkflow.isPending}
    />
  );
};
