import { useEffect, useState } from "react";
import { Contract, columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/contract-page-components/data-table";
import { ModeToggle } from "@/components/ui/themebutton";
import { NewContractModal } from "@/components/ui/contract-page-components/NewContractModal";


/*async function getData(): Promise<Contract[]> {
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
*/
export default function ContractForm() {
  const [data, setData] = useState<Contract[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  function generateRandomId(length: number): string {
    let id = "";
    for (let i = 0; i < length; i++) {
      id += Math.floor(Math.random() * 10);
    }
    return id;
  }

  function handleAddContract(newContract: Omit<Contract, "id">) {
    const contractWithId = { ...newContract, id: generateRandomId(8) };
    setData((prevData) => [...prevData, contractWithId]);
  }

  function handleDeleteContract(contractId: string) {
    setData((prevData) => prevData.filter((contract) => contract.id !== contractId));
  }

  return (
    <main>
    <div className="absolute top-4 right-4">
     <ModeToggle />
    </div>
    <div className="container mx-auto p-4">
      <h1 className="text-2x1 font-bold mb-4">Lista de Contratos</h1>
      <DataTable
        columns={columns}
        data={data}
        onAddContract={handleAddContract}
        onDeleteContract={handleDeleteContract}
      />
    </div>
    </main>
  );
}