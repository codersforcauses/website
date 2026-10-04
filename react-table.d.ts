import "@tanstack/react-table"

// https://github.com/TanStack/table/issues/44#issuecomment-1377024296
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    refetch?: () => void
    setID?: React.Dispatch<React.SetStateAction<string>>
    setType?: React.Dispatch<React.SetStateAction<"ban" | "delete" | "">>
  }

  interface ColumnMeta {
    headerClassName?: string
    cellClassName?: string
  }
}
