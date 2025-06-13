"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContractDetailsDialog } from "@/components/ui/hardcomponents/ContractModal";
import { useState } from "react";

export type Contract = {
  id: number;
  name: string;
  email: string;
  status: "Contrato ativo" | "Contrato pendente" | "Contrato inativo";
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
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Contract["status"];

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === "Contrato ativo"
              ? "bg-green-100 text-green-800"
              : status === "Contrato pendente"
              ? "bg-orange-100 text-orange-900"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const [data, setData] = useState<Contract[]>([]);
      const contract = row.original as Contract;

      return (
        <ContractDetailsDialog
          contract={{ ...contract, id: contract.id.toString() }}
          onDeleteContract={(id) => {
            const updatedData = data.filter((c) => c.id !== Number(id));
            setData(updatedData);
          }}
        />
      );
    },
  },
  {
    accessorKey: "pdfFile",
    header: "Contrato PDF",
    cell: ({ row }) => {
      const pdfFile = row.getValue("pdfFile") as File | null;

      return (
        <a
          href={pdfFile ? URL.createObjectURL(pdfFile) : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {pdfFile ? "Baixar PDF" : "Nenhum PDF disponível"}
        </a>
      );
    },
  }
];
