"use client"

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react"
import { ContractDetailsDialog } from "@/components/ui/contract-page-components/ContractModal";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export type Contract = {
  id: string
  name: string
  email: string
  status: "Contrato ativo" | "Contrato inativo"
};
export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Contract["status"];

      return (
        <span className={`
          px-2 py-1 rounded-full text-xs font-semibold
          ${status === "Contrato ativo"
           ? "bg-green-100 text-green-800" 
           : "bg-red-100 text-red-800"}     
          `}>
            {status}

        </span>
      )

    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original
      const contract = row.original;
 
      return (
        <div className="flex space-x-2 justify-end items-center">
           <ContractDetailsDialog contract={contract} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(id.id)}
            >
              Copiar ID do contrato
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Excluir Contrato</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
  
];