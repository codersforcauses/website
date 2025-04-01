"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type PaginationState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { format } from "date-fns"
import { enAU } from "date-fns/locale"
import Link from "next/link"
import * as React from "react"
import { siDiscord, siGithub } from "simple-icons"

import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Checkbox } from "~/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
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
  PaginationFirstPageButton,
  PaginationItem,
  PaginationLastPageButton,
  PaginationNextButton,
  PaginationPreviousButton,
} from "~/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Separator } from "~/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { NAMED_ROLES } from "~/lib/constants"
import type { User } from "~/lib/types"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"
import AddUserForm from "./form"

type UserProps = Omit<User, "subscribe" | "square_customer_id" | "updatedAt">

interface TableProps {
  data: Array<UserProps>
}
interface UserTableProps extends TableProps {
  refetch: () => void
  isRefetching: boolean
}

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

const columns = (updateRole: ({ id, role }: UpdateUserRoleFunctionProps) => void): ColumnDef<UserProps>[] => [
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
    id: "Name",
    accessorFn: (user) => `${user.preferred_name} ${user.name}`,
    enableGlobalFilter: true,
    sortingFn: "text",
    header: ({ column }) => (
      <Button variant="ghost" className="-mx-1 w-full justify-start px-1" onClick={column.getToggleSortingHandler()}>
        Name
        <span className="material-symbols-sharp ml-2 size-6">{sortIcon(column.getIsSorted())}</span>
      </Button>
    ),
    cell: (cell) => (
      <span className="grid grid-rows-2">
        <span>{cell.row.original.preferred_name}</span>
        <span className="text-muted-foreground">{cell.row.original.name}</span>
      </span>
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
    cell: (cell) => <span className="text-xs">{cell.getValue<React.ReactNode>()}</span>,
  },
  {
    id: "Date joined",
    header: "Date joined",
    cell: (cell) => <span className="text-xs">{cell.getValue<React.ReactNode>()}</span>,
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

const UserTable = ({ data, isRefetching, ...props }: UserTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [rowSelection, setRowSelection] = React.useState({}) // shape: { [rowIndex: number]: true } only applies to selected rows

  const utils = api.useUtils()
  const updateUserRole = api.user.updateRoleAdmin.useMutation({
    onMutate: async (updateRole) => {
      // Cancel the user getter refetch
      await utils.user.getAllAdmin.cancel()
      // Snapshot the previous value
      const prev = utils.user.getAllAdmin.getData()

      // Optimistically update to new role
      utils.user.getAllAdmin.setData(undefined, (data) => {
        if (!data) return []

        return data.map((user) => (user.id === updateRole.id ? { ...user, role: updateRole.role } : user))
      })

      return { prev }
    },
    onError: (err, _, context) => {
      // Rollback to the previous value if mutation fails
      utils.user.getAllAdmin.setData(undefined, context?.prev)
    },
    onSettled: () => {
      void utils.user.getAllAdmin.invalidate()
    },
  })

  const updateRole = React.useCallback(
    (props: { id: string; role: User["role"] }) => {
      updateUserRole.mutate(props)
    },
    [updateUserRole],
  )

  const cols = columns(updateRole)

  const table = useReactTable({
    data,
    columns: cols,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    autoResetPageIndex: false,
    state: {
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
      sorting,
    },
  })

  const selectedRowIDs = table.getSelectedRowModel().rows.map((row) => row.original.id)

  return (
    <>
      <div className="flex h-[50px] items-center gap-2 p-1 pr-0">
        {data.length > 0 && (
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
                <Button variant="outline" className="items-center">
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
            <Button variant="secondary" disabled={isRefetching} onClick={props.refetch}>
              <span className={cn("material-symbols-sharp", isRefetching && "animate-spin")}>autorenew</span>
              <span className="ml-2 hidden sm:block">Sync{isRefetching && "ing"}</span>
            </Button>
            {/* Add user manually */}
            <Dialog>
              <DialogTrigger asChild>
                <Button>Add user</Button>
              </DialogTrigger>
              <DialogContent className="max-h-screen overflow-auto sm:max-w-5xl">
                <DialogHeader>
                  <DialogTitle>Add user manually</DialogTitle>
                  <DialogDescription>
                    <AddUserForm />
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
      <Separator className="bg-background" />
      <div className="p-1 pr-0">
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
        <Pagination className="mt-2 gap-x-2">
          <div className="flex flex-1 items-center gap-x-2 text-sm text-muted-foreground">
            <span>
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
              selected.
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <span>Rows per page:</span>
              <Select
                value={String(pagination.pageSize)}
                onValueChange={(val) => setPagination((prev) => ({ ...prev, pageSize: Number(val) }))}
              >
                <SelectTrigger className="w-[6.5rem]">
                  <SelectValue placeholder="Row size" />
                </SelectTrigger>
                <SelectContent align="end" className="w-32">
                  {["10", "25", "50", "100"].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <PaginationContent>
            <PaginationItem>
              <PaginationFirstPageButton
                withText={false}
                disabled={isRefetching || !table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPreviousButton
                withText={false}
                disabled={isRefetching || !table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="select-none px-2 text-xs leading-10">
                {pagination.pageIndex + 1} of {table.getPageCount()}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNextButton
                withText={false}
                disabled={isRefetching || !table.getCanNextPage()}
                onClick={() => table.nextPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLastPageButton
                withText={false}
                disabled={isRefetching || !table.getCanNextPage()}
                onClick={() => table.lastPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

const TableWrapper = (props: TableProps) => {
  const { data, refetch, isRefetching } = api.user.getAllAdmin.useQuery(undefined, {
    initialData: props.data,
    refetchInterval: 1000 * 60 * 1, // 1 minute
  })
  const users = React.useMemo(() => data ?? [], [data])
  const refetchUsers = React.useCallback(() => {
    void refetch()
  }, [refetch])
  return <UserTable data={users} refetch={refetchUsers} isRefetching={isRefetching} />
}

export default TableWrapper
