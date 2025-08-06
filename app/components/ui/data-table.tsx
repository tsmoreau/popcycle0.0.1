"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"

export interface Column<T> {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
}

export interface DataTableProps<T> {
  title: string
  description: string
  icon?: React.ReactNode
  data: T[]
  columns: Column<T>[]
  renderModal?: (item: T) => React.ReactNode
  className?: string
}

type SortDirection = "asc" | "desc"

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  icon,
  data,
  columns,
  renderModal,
  className = ""
}: DataTableProps<T>) {
  const [sortField, setSortField] = useState<string>("")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0
    
    const aValue = a[sortField]
    const bValue = b[sortField]
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const getSortIndicator = (field: string) => {
    if (sortField === field) {
      return sortDirection === "asc" ? " ↑" : " ↓"
    }
    return ""
  }

  const getCellValue = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item)
    }
    return item[column.key as keyof T]
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  onClick={column.sortable !== false ? () => handleSort(String(column.key)) : undefined}
                  className={column.sortable !== false ? "cursor-pointer hover:bg-gray-50" : ""}
                >
                  {column.header}
                  {column.sortable !== false && getSortIndicator(String(column.key))}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => {
              const RowContent = (
                <TableRow className={renderModal ? "cursor-pointer hover:bg-gray-50" : ""}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      className={column.key === columns[0].key ? "font-medium" : ""}
                    >
                      {getCellValue(item, column)}
                    </TableCell>
                  ))}
                </TableRow>
              )

              if (renderModal) {
                return (
                  <Dialog key={index}>
                    <DialogTrigger asChild>
                      {RowContent}
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      {renderModal(item)}
                    </DialogContent>
                  </Dialog>
                )
              }

              return <div key={index}>{RowContent}</div>
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}