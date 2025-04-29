import { useEffect, useState } from "react";
import { Contract, columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/contract-page-components/data-table";
import { ModeToggle } from "@/components/ui/themebutton";

async function getData(): Promise<Contract[]> {
  return [
    {
      id: "1",
      name: "Lucas",
      email: "lucas@gmail.com",
      status: "Contrato ativo",
    },
    {
      id: "2",
      name: "Maria",
      email: "maria@example.com",
      status: "Contrato inativo",
    },
    {
      id: "3",
      name: "Ana",
      email: "ana@example.com",
      status: "Contrato ativo",
    },
    {
      id: "4",
      name: "Edward",
      email: "edward@example.com",
      status: "Contrato inativo",
    },
  ];
}

export default function ContractForm() {
  const [data, setData] = useState<Contract[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <main>
    <div className="absolute top-4 right-4">
     <ModeToggle />
    </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2x1 font-bold mb-4">Lista de Contratos</h1>
      <DataTable columns={columns} data={data} />
    </div>
    </main>
  );
}