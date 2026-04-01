import { AlertTriangleIcon, FolderOpenIcon, Loader2Icon, MoreVerticalIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
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
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";

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

export const EntityHeader = React.memo(function EntityHeader({
  title,
  description,
  onNew,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
}: EntityHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-x-4">
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
          disabled={isCreating || disabled}
          size="sm"
          onClick={onNew}
        >
          {isCreating ? (
            <><Loader2Icon className="size-4 animate-spin" /> Creating...</>
          ) : (
            <><PlusIcon className="size-4" /> {newButtonLabel}</>
          )}
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
});

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

export const EntitySearch = React.memo(function EntitySearch({
  placeholder = "Search",
  value,
  onChange,
}: EntitySearchProps) {
  return (
    <div className="relative w-full sm:w-auto sm:ml-auto">
      <SearchIcon className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)} // onChange is used to handle input changes, e.target.value gets the current value of the input field
        className="w-full sm:max-w-50 glass shadow-none pl-8 focus:border-[#f97316]/60"
      />
    </div>
  );
});

interface EntityPaginationProps {
  page: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = React.memo(function EntityPagination({
  page,
  totalPages,
  onPageChange,
  disabled,
}: EntityPaginationProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 w-full">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {page} of {totalPages || 1}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          disabled={page <= 1 || disabled || totalPages === 0}
          variant="outline"
          size="sm"
          onClick={() => onPageChange?.(Math.max(1, page - 1))}
          className="glass border-white/10 text-white/70 hover:text-white hover:border-[#f97316]/30 hover:bg-[#f97316]/10"
        >
          Previous
        </Button>
        <Button
          disabled={page === totalPages || totalPages === 0 || disabled}
          onClick={() => onPageChange?.(Math.min(totalPages, page + 1))}
          size="sm"
          variant="outline"
          className="glass border-white/10 text-white/70 hover:text-white hover:border-[#f97316]/30 hover:bg-[#f97316]/10"
        >
          Next
        </Button>
      </div>
    </div>
  );
});

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
  isLoading?: boolean;
}

export const EmptyView = ({ message, onNew, isLoading }: EmptyViewProps) => {
  return (
    <Empty className="border border-dashed glass">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderOpenIcon className="size-9" />
        </EmptyMedia>
      </EmptyHeader>
      <EmptyTitle>No items</EmptyTitle>
      {!!message && <EmptyDescription>{message}</EmptyDescription>}
      {!!onNew && (
        <EmptyContent>
          <Button onClick={onNew} disabled={isLoading}>
            {isLoading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              "Add item"
            )}
          </Button>
        </EmptyContent>
      )}
    </Empty>
  );
};

interface EntityListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  emptyView?: React.ReactNode;
  className?: string;
}

export const EntityList = <T,>({
  items,
  renderItem,
  getKey,
  emptyView,
  className,
}: EntityListProps<T>) => {
  if (items.length === 0 && emptyView) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <div className="max-w-sm mx-auto">{emptyView}</div>
      </div>
    );
  }

  return (
    <div className={cn( // cn is a utility function to conditionally join class names
      "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1",
      className // Whoever uses this component can pass extra classes of CSS if they want
    )}>
      {items.map((item, index) => (
        <div key={getKey ? getKey(item, index) : index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

interface EntityItemProps {
  href?: string;
  title: string;
  subtitle?: React.ReactNode;
  image?: React.ReactNode;
  actions?: React.ReactNode;
  onRemove?: () => void | Promise<void>;
  isRemoving?: boolean;
  className?: string;
}

export const EntityItem = React.memo(function EntityItem({
  href,
  title,
  subtitle,
  image,
  actions,
  onRemove,
  isRemoving,
  className,
}: EntityItemProps) {
  const handleRemove = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    e.stopPropagation(); // Stop the event from bubbling up to parent elements, which means that clicking the remove button won’t trigger any click handlers on parent elements.

    if (isRemoving) {
      return;
    }

    if (onRemove) {
      await onRemove();
    }
  };

  return (
    <Link href={href || "#"} prefetch>
      <Card
        className={cn(
          "h-full p-4 sm:p-6 glass cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_rgba(249,115,22,0.2)] hover:border-[#f97316]/30",
          isRemoving && "opacity-50 cursor-not-allowed"
        )}
      >
        <CardContent className="flex flex-col h-full p-0">
          <div className="flex items-start gap-4 flex-1">
            {image && (
              <div className="shrink-0 flex items-center justify-center size-10 rounded-md border border-white/10 bg-white/5 shadow-sm">
                {image}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base font-semibold leading-tight mb-2">
                {title}
              </CardTitle>
              {!!subtitle && (
                <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                  {subtitle}
                </CardDescription>
              )}
            </div>
          </div>
          {(actions || onRemove) && (
            <div className="flex items-center justify-end">
              {actions}
              {onRemove && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isRemoving}
                      onClick={(e) => e.stopPropagation()} // By default in the browser: Clicking any child triggers the parent click. This is called event bubbling. So WITHOUT stopPropagation(): ❌ Clicking Delete would: Trigger delete & ALSO trigger <Link>
                      className="h-8 w-8"
                    >
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem onClick={handleRemove}>
                      <Trash2Icon className="size-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
});