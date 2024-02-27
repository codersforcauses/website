"use client"

import * as React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { enAU } from "date-fns/locale"
import { siDiscord, siGithub } from "simple-icons"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type VisibilityState,
  // type PaginationState,
} from "@tanstack/react-table"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Input } from "~/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNextButton,
  PaginationPreviousButton,
} from "~/components/ui/pagination"
import { Separator } from "~/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { NAMED_ROLES } from "~/lib/constants"
import { type User } from "~/lib/types"
import { api } from "~/trpc/react"
import { cn } from "~/lib/utils"

interface UpdateUserRoleFunctionProps {
  id: string
  role: User["role"]
}

const sortIcon = (sortOrder: string | boolean) => {
  switch (sortOrder) {
    case "asc":
      return "arrow_upward_alt"
    case "desc":
      return "arrow_downward_alt"
    default:
      return ""
  }
}

const columns = (
  updateRole: ({ id, role }: UpdateUserRoleFunctionProps) => void,
): ColumnDef<Omit<User, "square_customer_id" | "updatedAt" | "subscribe">>[] => [
  {
    id: "Select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <span className="grid place-items-center">
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </span>
    ),
    cell: ({ row }) => (
      <span className="grid place-items-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </span>
    ),
  },
  {
    id: "Preferred name",
    accessorKey: "preferred_name",
    enableGlobalFilter: true,
    header: ({ column }) => (
      <Button variant="ghost" className="-mx-1 w-full justify-start px-1" onClick={column.getToggleSortingHandler()}>
        Name
        <span className="material-symbols-sharp ml-2 size-6">{sortIcon(column.getIsSorted())}</span>
      </Button>
    ),
  },
  {
    id: "Name",
    accessorKey: "name",
    enableGlobalFilter: true,
    header: ({ column }) => (
      <Button variant="ghost" className="-mx-1 w-full justify-start px-1" onClick={column.getToggleSortingHandler()}>
        Full name
        <span className="material-symbols-sharp ml-2 size-6">{sortIcon(column.getIsSorted())}</span>
      </Button>
    ),
  },
  {
    id: "Email",
    accessorKey: "email",
    enableGlobalFilter: true,
    header: ({ column }) => (
      <Button variant="ghost" className="-mx-1 w-full justify-start px-1" onClick={column.getToggleSortingHandler()}>
        Email
        <span className="material-symbols-sharp ml-2 size-6">{sortIcon(column.getIsSorted())}</span>
      </Button>
    ),
  },
  {
    id: "Role",
    header: "Role",
    accessorKey: "role",
    enableGlobalFilter: true,
  },
  {
    id: "Pronouns",
    header: "Pronouns",
    accessorKey: "pronouns",
  },
  {
    id: "University",
    header: "University",
    enableGlobalFilter: true,
    accessorFn: (user) => user.university ?? `${user.student_number} (UWA)`,
    cell: (cell) => <span className="text-xs">{cell.getValue()}</span>,
  },
  {
    id: "Date joined",
    header: "Date joined",
    cell: (cell) => <span className="text-xs">{cell.getValue()}</span>,
    accessorFn: (user) => format(user.createdAt, "Pp", { locale: enAU }),
  },
  {
    header: "Socials",
    cell: ({ row }) => {
      const user = row.original
      return (
        <span className="flex w-min flex-wrap gap-px">
          {user.github && (
            <Badge className="pointer-events-none items-center">
              <svg aria-label="Github logo" viewBox="0 0 24 24" height={12} width={12} className="mr-1 fill-current">
                <path d={siGithub.path} />
              </svg>
              {user.github}
            </Badge>
          )}
          {user.discord && (
            <Badge className="pointer-events-none items-center bg-[#5865F2] text-white">
              <svg aria-label="Discord logo" viewBox="0 0 24 24" height={12} width={12} className="mr-1 fill-current">
                <path d={siDiscord.path} />
              </svg>
              {user.discord}
            </Badge>
          )}
        </span>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <span className="material-symbols-sharp">more_horiz</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onSelect={() => navigator.clipboard.writeText(user.id)}>Copy user ID</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/profile/${user.id}`} target="_blank">
                Go to profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change role</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    value={String(user.role)}
                    onValueChange={(value) => {
                      const role = (value === "null" ? null : value) as User["role"]
                      updateRole({ id: user.id, role })
                    }}
                  >
                    <DropdownMenuRadioItem value="null">none</DropdownMenuRadioItem>
                    {NAMED_ROLES.map((role) => (
                      <DropdownMenuRadioItem key={role} value={role}>
                        {role}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/20 focus:text-destructive">
              Ban user (WIP)
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:bg-destructive/20 focus:text-destructive">
              Delete user (WIP)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

const UserTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  // const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
  //   pageIndex: 0,
  //   pageSize: 2,
  // })
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState({}) // shape: { [rowIndex: number]: true } only applies to selected rows

  const utils = api.useUtils()
  const { data, isInitialLoading, refetch, isRefetching } = api.user.getAll.useQuery(
    // {
    //   limit: pageSize,
    //   offset: pageIndex * pageSize,
    // },
    undefined,
    {
      refetchInterval: 1000 * 30, // 30 seconds
      // keepPreviousData: true,
    },
  )
  const updateUserRole = api.user.updateRole.useMutation({
    onMutate: async (updateRole) => {
      // Cancel the user getter refetch
      await utils.user.getAll.cancel()
      // Snapshot the previous value
      const prev = utils.user.getAll.getData()

      // Optimistically update to new role
      utils.user.getAll.setData(
        // {}
        undefined,
        (data) => {
          if (!data)
            return {
              users: [],
              count: 0,
              // pageCount: 0,
            }

          return {
            ...data,
            users: data.users.map((user) => (user.id === updateRole.id ? { ...user, role: updateRole.role } : user)),
          }
        },
      )

      return { prev }
    },
    onError: (err, _, context) => {
      // Rollback to the previous value if mutation fails
      utils.user.getAll.setData(
        // {}
        undefined,
        context?.prev,
      )
    },
    onSettled: () => {
      void utils.user.getAll.invalidate()
    },
  })

  const updateRole = React.useCallback(
    (props: { id: string; role: User["role"] }) => {
      updateUserRole.mutate(props)
    },
    [updateUserRole],
  )

  const cols = columns(updateRole)
  // const pagination = React.useMemo(
  //   () => ({
  //     pageIndex,
  //     pageSize,
  //   }),
  //   [pageIndex, pageSize],
  // )

  const table = useReactTable({
    data: data?.users ?? [],
    columns: cols,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    // pageCount: data?.pageCount ?? -1,
    // manualPagination: true,
    state: {
      sorting,
      globalFilter,
      columnVisibility,
      rowSelection,
      // pagination,
    },
  })

  const selectedRowIDs = table.getSelectedRowModel().rows.map((row) => row.original.id)

  return (
    <>
      <div className="flex h-[50px] items-center p-1">
        {(data?.users ?? []).length > 0 && (
          <>
            {selectedRowIDs.length > 0 && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="items-center">
                      <span>Change role</span>
                      <span className="material-symbols-sharp size-5">expand_more</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuRadioGroup
                      value=""
                      onValueChange={async (value) => {
                        const role = (value === "null" ? null : value) as User["role"]

                        await Promise.all(selectedRowIDs.map((id) => updateUserRole.mutateAsync({ id, role })))
                      }}
                    >
                      <DropdownMenuRadioItem value="null">none</DropdownMenuRadioItem>
                      {NAMED_ROLES.map((role) => (
                        <DropdownMenuRadioItem key={role} value={role}>
                          {role}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* <Button
                  variant="ghost"
                  className="mx-2 text-destructive hover:bg-destructive/20 hover:text-destructive"
                >
                  Ban user(s)
                </Button>

                <Button
                  variant="ghost"
                  className="mr-2 text-destructive hover:bg-destructive/20 hover:text-destructive"
                >
                  Delete user(s)
                </Button> */}
              </>
            )}
            <Input
              type="search"
              placeholder="Filter (name, full name, email, university)"
              autoComplete="off"
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="ml-auto max-w-xs"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-2 items-center">
                  <span>Columns</span>
                  <span className="material-symbols-sharp size-5">expand_more</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="secondary" disabled={isRefetching} className="ml-2" onClick={() => refetch()}>
              <span className={cn("material-symbols-sharp", isRefetching && "animate-spin")}>autorenew</span>
              <span className="ml-2 hidden sm:block">Force refresh</span>
            </Button>
          </>
        )}
      </div>
      <Separator className="bg-background" />
      <div className="p-1">
        <Table className="border border-black/25 dark:border-white/25">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={cols.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Pagination className="py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <PaginationContent>
            <PaginationItem>
              <PaginationPreviousButton
                disabled={isRefetching || !table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNextButton
                disabled={isRefetching || !table.getCanNextPage()}
                onClick={() => table.nextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default UserTable
