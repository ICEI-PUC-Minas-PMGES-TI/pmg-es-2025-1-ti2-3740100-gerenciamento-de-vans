"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../dropdown-menu";

export type Payment = {
  id: string;
  amount: number;
  email: string;
  status: "Pago" | "Pendente" | "Vencido";
}

export const columns: ColumnDef<Payment>[] = [
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
    accessorKey: "amount",
    header: "Valor",  
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
          const status = row.getValue("status") as Payment["status"];

          const getStatusClass = () => {
            switch (status) {
              case "Pago":
                return "bg-green-100 text-green-800";
              case "Pendente":
                return "bg-yellow-100 text-yellow-800";
              case "Vencido":
                return "bg-red-100 text-red-800";
            }
          };  
          return(
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass()}`}>
              {status}
            </span>
          );
    
        }    
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;
 
      return (
        <div className="flex space-x-2 justify-end items-center">

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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copiar ID do Extrato
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Excluir Extrato</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )
    },
  },
  
]