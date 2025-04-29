"use client"

import { ColumnDef, flexRender, getCoreRowModel, useReactTable, getPaginationRowModel,getFilteredRowModel,ColumnFiltersState, type SortingState, getSortedRowModel } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"
import { NewContractModal } from "./NewContractModal"



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  actionButton?: React.ReactNode 
}

export function DataTable<TData, TValue>({ 
  columns,
  data,
}: DataTableProps<TData, TValue>){
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
    sorting,
    columnFilters,
    },
  })



  return (
    <div className="space-y-4 ">
      
        <div className="flex items-center py-4 space-x-4">
        <Input
          placeholder="Buscar por email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
       
         <NewContractModal />
         
      </div>
      
    <div className="rouded-md border">
      <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup)=>(
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header)=> {
                return (
                  <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,
                    header.getContext())}                    
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Sem dados para exibir.
              </TableCell>
            </TableRow>
          )}
          </TableBody>
          </Table>
    </div>
        <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
 </div>
  );
                  
}