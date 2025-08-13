"use client"

import { useEffect, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"

import { TableProps } from "./table"

export default function ExportButton({ data }: TableProps) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => setOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [open])
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      setOpen(true)
      console.log("open")
      return
    }

    const headers = Object.keys(data[0] as Record<string, unknown>).join(",")
    const rows = data.map((row) => Object.values(row).join(",")).join("\n")
    const csv = headers + "\n" + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "output.csv")
    a.click()
    window.URL.revokeObjectURL(url)
    setOpen(true)
  }

  return (
    <div className="relative inline-block">
      <Button onClick={downloadCSV} variant={"outline"}>
        Export CSV
      </Button>
      {open && (!data || data.length === 0) && (
        <Alert variant="destructive" className="fixed top-30 left-1/2 -translate-x-1/2  z-50 max-w-sm">
          <AlertTitle>Export Failed</AlertTitle>
          <AlertDescription>No data to export.</AlertDescription>
        </Alert>
      )}
      {open && data && data.length > 0 && (
        <Alert variant="default" className="fixed top-30 left-1/2 -translate-x-1/2 z-50 max-w-sm">
          <AlertTitle>Export Successful</AlertTitle>
          <AlertDescription>Your data has been exported as `output.csv`.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
