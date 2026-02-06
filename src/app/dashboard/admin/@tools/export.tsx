"use client"

import { useEffect, useState } from "react"

import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"

import { type Payment, type Project, type User } from "~/server/db/types"

export interface ExportButtonProps {
  data: Array<Project | Payment | User>
  label: string
}

export default function ExportButton({ data, label }: ExportButtonProps) {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => setOpen(false), 3000)
    return () => clearTimeout(timer)
  }, [open])
  const downloadCSV = () => {
    if (!data || data.length === 0) {
      setOpen(true)
      return
    }

    const headers = Object.keys(data[0] as Record<string, unknown>)
    const escapeCSV = (value: unknown): string => {
      if (value == null) return ""

      let str: string
      if (typeof value === "object") {
        if (value instanceof Date) {
          str = value.toISOString()
        } else {
          // Stringify JSON objects/arrays
          str = JSON.stringify(value)
        }
      } else {
        str = String(value)
      }

      // Escape CSV: wrap in quotes if contains comma, quote, or newline
      // and escape internal quotes by doubling them
      if (/[",\n\r]/.test(str)) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const rows = data
      .map((row) => headers.map((key) => escapeCSV((row as Record<string, unknown>)[key])).join(","))
      .join("\n")

    const csv = headers.join(",") + "\n" + rows
    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", `${label}.csv`)
    a.click()
    window.URL.revokeObjectURL(url)
    setOpen(true)
  }

  return (
    <div className="relative inline-block">
      <Button onClick={downloadCSV} variant={"outline"}>
        Export {label}
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
          <AlertDescription>Your data has been exported as {`${label}.csv`}.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
