"use client"

import * as React from "react"
import Form from "next/form"
import { useSearchParams } from "next/navigation"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import {
  // type OnChangeFn,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "~/lib/utils"
import { useApi } from "~/trpc/react"
import { AlertDialog } from "~/ui/alert-dialog"
import { Button } from "~/ui/button"
import { ButtonGroup } from "~/ui/button-group"
import { Dialog, DialogTrigger } from "~/ui/dialog"
import { Input } from "~/ui/input"
import { columns } from "./columns"
import ExportDialog from "./export-dialog"
import BanUser from "./ban-user"
import DeleteUser from "./delete-user"
import UsersTable from "./table"

function getSortString(sorting: SortingState): string {
  return sorting.map((s) => `${s.id}=${s.desc ? "desc" : "asc"}`).join(",")
}

export default function UsersTableContainer() {
  const { admin } = useApi()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [open, setOpen] = React.useState(false)
  const [ID, setID] = React.useState("")
  const [type, setType] = React.useState<"ban" | "delete" | "">("")
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("search")
  const filterQuery = searchParams.get("filters")

  const {
    data,
    isFetching,
    isRefetching,
    fetchNextPage,
    refetch: refetchData,
  } = useSuspenseInfiniteQuery(
    admin.users.listUsers.infiniteQueryOptions(
      {
        query: searchQuery ?? "",
        filters: getSortString(sorting) ?? "",
        cursor: 0,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
        refetchOnWindowFocus: false,
        refetchInterval: 1000 * 60, // 60 seconds
      },
    ),
  )

  const users = React.useMemo(() => data.pages.flatMap((page) => page.users), [data.pages])
  const refetch = React.useCallback(() => {
    void refetchData()
  }, [refetchData])

  const user_name = users.find((u) => u.id === ID)?.preferredName
  const destructiveActionReset = React.useCallback(async () => {
    await refetchData()
    setID("")
    setType("")
    setOpen(false)
  }, [refetchData])

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    meta: {
      refetch,
      setID,
      setType,
    },
  })

  return (
    <div className="@container/main">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 md:flex-row-reverse md:flex-nowrap">
        <div className="flex items-center gap-2">
          <Button variant="secondary" disabled={isRefetching} onClick={refetch}>
            <span className={cn("material-symbols-sharp", isRefetching && "animate-spin")}>autorenew</span>
            <span>Sync{isRefetching && "ing"}</span>
          </Button>
          <Dialog>
            <DialogTrigger
              render={
                <Button variant="secondary">
                  <span className="material-symbols-sharp">file_export</span>
                  Export users
                </Button>
              }
            />
            <ExportDialog />
          </Dialog>
        </div>
        <Form action="" className="w-full sm:max-w-xs md:max-w-sm">
          <ButtonGroup className="w-full">
            <Input
              type="search"
              name="search"
              defaultValue={searchQuery ?? ""}
              // disabled={isFetching}
              placeholder="Search name, email or student number"
              autoComplete="off"
              className="w-full bg-background"
              onChange={(e) => {
                const { value, form } = e.currentTarget
                if (value === "") form?.requestSubmit()
              }}
            />
            <Button
              type="submit"
              size="icon"
              // disabled={isFetching}
              className="cursor-pointer"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {/* {isFetching ? (
                <motion.span
                  key="loading"
                  className="material-symbols-sharp animate-spin"
                  transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  initial={{ opacity: 0, y: -36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 36 }}
                >
                  progress_activity
                </motion.span>
              ) : ( */}
                <motion.span
                  key="default"
                  className="material-symbols-sharp"
                  transition={{ type: "spring", duration: 0.2, bounce: 0 }}
                  initial={{ opacity: 0, y: -36 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 36 }}
                >
                  search
                </motion.span>
                {/* )} */}
              </AnimatePresence>
            </Button>
          </ButtonGroup>
        </Form>
      </div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <UsersTable
          isFetching={isFetching}
          numUsers={data.pages[0]?.total ?? 0}
          totalFetched={users.length}
          fetchNextPage={fetchNextPage}
          table={table}
        />
        {type === "ban" && <BanUser key={ID} name={user_name!} userId={ID} refetchData={destructiveActionReset} />}
        {type === "delete" && (
          <DeleteUser key={ID} name={user_name!} userId={ID} refetchData={destructiveActionReset} />
        )}
      </AlertDialog>
    </div>
  )
}
