import { ModeToggle } from "@/components/ui/themebutton";
import { Card, CardContent, } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { columns } from "@/components/ui/hardcomponents/financialColumns";
import { FinancialDataTable } from "@/components/ui/hardcomponents/financialData-table";
import type { Payment } from "@/components/ui/hardcomponents/financialColumns";
import { useEffect, useState } from "react";

async function getData(): Promise<Payment[]>{
  return [
    {
      id: "1",
      amount: 100,
      status: "Pago",
      email: "roger@gmail.com",
    },
    {
      id: "2",
      amount: 100,
      status: "Vencido",
      email: "alexandre@gmail.com",
    },
    {
      id: "3",
      amount: 100,
      status: "Pendente",
      email: "shanksoruivo@gmail.com",
    },


  ]
  }
  

export default function FinancialPage() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    async function fetchData() {
      const result = await getData();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="rounded-md max-w-[900px] w-full mt-8">
        <Card className="p-6 w-full">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-col items-center mr-6">
              <Avatar className="w-20 h-20 mb-3">
                <AvatarImage src="https://github.com/shadcn.png" className="rounded-full object-cover" />
              </Avatar>
              <h1 className="text-lg font-bold text-center">Nome do Dono</h1>
            </div>

            <CardContent className="flex justify-center w-full px-0 space-x-40">
              <div className="text-center">
                <p className="text-xl font-bold">Rotas</p>
                <p className="text-xl font-medium mt-0">12</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">Alunos</p>
                <p className="text-xl font-medium mt-0">40</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">Vans</p>
                <p className="text-xl font-medium mt-0">40</p>
              </div>
            </CardContent>
          </div>
        </Card>
        <h1 className="text-2x1 font-bold mb-4 mt-5">Extrato de Alunos</h1>
        <FinancialDataTable columns={columns} data={data} />      
      </div>
    </main>
  );
}