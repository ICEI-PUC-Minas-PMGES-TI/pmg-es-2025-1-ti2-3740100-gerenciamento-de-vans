import { ModeToggle } from "@/components/ui/themebutton";
import { Card, CardContent,  } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";


export default function FinancialPage() {

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="flex flex-row items-center">
            <div className="flex flex-col items-center mr-12">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src="https://github.com/shadcn.png" className="rounded-full object-cover"/>
          </Avatar>
          <h1 className="text-xl font-bold text-center">Nome do Dono</h1>
          </div>

          <CardContent className="flex justify-between w-full px-0 gap-4">
          <div className="text-center">
                <p className="text-2xl font-bold">Rotas</p>
                <p className="text-2xl font-medium mt-1">12</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">Alunos</p>
                <p className="text-2xl font-medium mt-1">40</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">Vans</p>
                <p className="text-2xl font-medium mt-1">40</p>
              </div>
          </CardContent>
          </div>
        </Card>
      </div>
    </main>
  );
}