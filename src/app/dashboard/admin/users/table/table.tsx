import * as React from "react"
import { flexRender, type Table as TableType } from "@tanstack/react-table"

import { cn } from "~/lib/utils"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "~/ui/table"
import type { User } from "./columns"
import UsersTableHead from "./header"

interface UsersTableProps {
  isFetching: boolean
  totalFetched: number
  numUsers: number
  fetchNextPage: () => void
  table: TableType<User>
}

export default function UsersTable({ isFetching, totalFetched, numUsers, fetchNextPage, table }: UsersTableProps) {
  const { rows } = table.getRowModel()

  //called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const { scrollHeight, scrollTop, clientHeight } = containerRefElement.currentTarget
      //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && totalFetched < numUsers) {
        void fetchNextPage()
      }
    },
    [isFetching, totalFetched, numUsers, fetchNextPage],
  )

  /**
   * https://tanstack.com/table/v8/docs/guide/column-sizing#advanced-column-resizing-performance
   * Instead of calling `column.getSize()` on every render for every header
   * and especially every data cell (very expensive),
   * we will calculate all column sizes at once at the root table level in a useMemo
   * and pass the column sizes down as CSS variables to the <table> element.
   */
  const columnSizeVars = React.useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes: Record<string, string> = {}
    for (const header of headers) {
      colSizes[`--header-${header.id}-size`] = `${header.getSize()}px`
      colSizes[`--col-${header.column.id}-size`] = `${header.column.getSize()}px`
    }
    return colSizes
  }, [table])

  return (
    <TableContainer
      className="h-full max-h-[calc(100svh-(var(--header-height)+5.5rem+1rem))] bg-white md:max-h-[calc(100svh-(var(--header-height)+2.75rem+1rem))] dark:bg-neutral-950"
      onScroll={fetchMoreOnBottomReached}
      style={
        {
          ...columnSizeVars,
        } as React.CSSProperties
      }
    >
      <Table>
        <TableHeader
          className={cn(
            "sticky top-0 z-10",
            "bg-neutral-200 dark:bg-neutral-700",
            "[&_tr]:border-neutral-50 dark:[&_tr]:border-neutral-900",
          )}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent dark:hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  aria-sort={
                    header.column.getIsSorted() === "asc"
                      ? "ascending"
                      : header.column.getIsSorted() === "desc"
                        ? "descending"
                        : "none"
                  }
                  className={cn("relative select-none", header.column.columnDef.meta?.headerClassName)}
                >
                  <UsersTableHead column={header.column} className="w-full">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </UsersTableHead>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows?.length ? (
            rows.map((row) => {
              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    row.original.banned && "bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50",
                    "border-neutral-100 dark:border-neutral-900",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={cn(cell.column.columnDef.meta?.cellClassName)}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isFetching && (
        <div className="grid h-24 w-full place-items-center">
          <span className="material-symbols-sharp animate-spin text-base! leading-none!">progress_activity</span>
        </div>
      )}
    </TableContainer>
  )
}
