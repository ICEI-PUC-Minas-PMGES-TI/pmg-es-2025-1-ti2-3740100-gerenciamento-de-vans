import { useEffect, useState } from "react";
import { Contract, columns } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/contract-page-components/data-table";
import { ModeToggle } from "@/components/ui/themebutton";


export default function ContractForm() {
  const [data, setData] = useState<Contract[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/contracts")
      .then((response) => response.json())
      .then((contracts) => setData(contracts))
      .catch((error) => console.error("Erro ao carregar contratos:", error));
  }, []);


  return (
    <main>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Lista de Contratos</h1>
        <DataTable
          columns={columns}
          data={data}
          onAddContract={(newContract) => {
            fetch("http://localhost:8081/contracts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newContract),
            })
              .then((response) => response.json())
              .then((savedContract) => setData((prevData) => [...prevData, savedContract]))
              .catch((error) => console.error("Erro ao adicionar contrato:", error));
          }}
        />
      </div>
    </main>
  );
}