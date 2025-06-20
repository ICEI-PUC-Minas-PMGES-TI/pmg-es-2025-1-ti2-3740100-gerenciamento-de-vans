import { columns } from "@/components/ui/hardcomponents/financialColumns";
import { FinancialDataTable } from "@/components/ui/hardcomponents/financialData-table";
import type { Payment } from "@/components/ui/hardcomponents/financialColumns";
import { useEffect, useState } from "react";

async function getMotoristaData(): Promise<Payment[]>{
  return [
    {
      id: "m1",
      amount: 75.50,
      status: "Pago",
      email: "aluno.A@example.com",
    },
    {
      id: "m2",
      amount: 75.50,
      status: "Pendente",
      email: "aluno.B@example.com",
    },
  ]
}

export default function FinancialMotoristaPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getMotoristaData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <main className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Meu Extrato Financeiro</h1>
        <p className="text-muted-foreground">
          Acompanhe aqui os pagamentos recebidos dos seus passageiros.
        </p>
        <FinancialDataTable columns={columns} data={data} />      
      </div>
    </main>
  );
}