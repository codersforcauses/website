import type { Column } from "@tanstack/react-table"

import { cn } from "~/lib/utils"
import { Button } from "~/ui/button"

interface UsersTableHeadProps<TData, TValue> extends React.ComponentPropsWithoutRef<typeof Button> {
  column: Column<TData, TValue>
}

export default function UsersTableHead<TData, TValue>({
  column,
  className,
  children,
  ...props
}: UsersTableHeadProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={className}>{children}</div>
  }

  console.log("sort: ", children, column.getIsSorted())

  return (
    <Button
      variant="ghost"
      className={cn("absolute inset-0.5 justify-between gap-2 px-1.5! text-left", className)}
      onClick={() => {
        column.toggleSorting(undefined)
      }}
      {...props}
    >
      {children}
      <svg viewBox="0 -960 960 960">
        <path
          d="M298-584l-58-56 240-240 240 240-58 56-182-182-182 182Z"
          className={cn(column.getIsSorted() === "asc" ? "fill-current" : "fill-neutral-400 dark:fill-neutral-500")}
        />
        <path
          d="M480-80 240-320l57-57 183 183 183-183 57 57L480-80Z"
          className={cn(column.getIsSorted() === "desc" ? "fill-current" : "fill-neutral-400 dark:fill-neutral-500")}
        />
      </svg>
    </Button>
  )
}
