import { AlertTriangleIcon, Loader2Icon, PackageOpenIcon, PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Input } from "./ui/input";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

type EntityHeaderProps = {
  title: string;
  description?: string;
  newButtonLabel?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & ( 
  | { onNew: () => void; newButtonHref?: never } // onNew defines what function runs when “New” is clicked, while newButtonHref defines where the user navigates when it’s clicked.
  | { newButtonHref: string; onNew?: never }
  | { onNew?: never; newButtonHref?: never }
);

export const EntityHeader = ({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) => {
  return (
    <div className="flex flex-row items-center justify-between gap-x-4">
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-semibold">
          {title}
        </h1>
        {description && (
          <p className="text-xs md:text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {onNew && !newButtonHref && (
        <Button
          disabled={isCreating || disabled} // means? if either isCreating or disabled is true, the button is disabled
          size="sm"
          onClick={onNew}
        >
          <PlusIcon className="size-4" />
          {newButtonLabel}
        </Button>
  )}
    {newButtonHref && !onNew && (
    <Button
      size="sm"
      asChild
    >
      <Link href={newButtonHref} prefetch>
        <PlusIcon className="size-4" />
        {newButtonLabel}
      </Link>
    </Button>
  )}
    </div>
  );
};

type EntityContainerProps = {
  children: React.ReactNode;
  header: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
};

export const EntityContainer = ({
  children,
  header,
  search,
  pagination,
}: EntityContainerProps) => {
  return (
    <div className="p-4 sm:px-6 sm:py-6 lg:px-10 lg:py-8 h-full">
      <div className="flex flex-col w-full mx-auto max-w-7xl gap-y-6 lg:gap-y-8 h-full">
        {header}
        <div className="flex flex-col gap-y-4 h-full">
          {search}
          {children}
        </div>
        {pagination}
      </div>
    </div>
  );
};

interface EntitySearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const EntitySearch = ({
  placeholder = "Search",
  value,
  onChange,
}: EntitySearchProps) => {
  return (
    <div className="relative ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value} 
        onChange={(e) => onChange?.(e.target.value)} // onChange is used to handle input changes, e.target.value gets the current value of the input field
        className="max-w-50 bg-background shadow-none border-border pl-8"
      />
    </div>
  );
};

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) => {
  return (
    <div className="flex items-center justify-between gap-x-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page <= 1 || disabled || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

interface StateViewProps {
  message?: string;
}


export const LoadingView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <Loader2Icon className="size-6 animate-spin text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

export const ErrorView = ({ message }: StateViewProps) => {
  return (
    <div className="flex justify-center items-center h-full flex-1 flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-primary" />
      {!!message && <p className="text-sm text-muted-foreground">{message}</p>}
    </div>
  );
};

interface EmptyViewProps extends StateViewProps {
  onNew?: () => void;
}

export const EmptyView = ({ message, onNew }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PackageOpenIcon />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew}>Add item</Button>
        </EmptyContent>
      )}
    </Empty>
  );
};