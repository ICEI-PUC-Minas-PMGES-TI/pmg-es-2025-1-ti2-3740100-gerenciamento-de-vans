import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Link } from "react-router-dom"



export default function RegisterPage() {
  const [date, setDate] = React.useState<Date>()

  return (
    <main>
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-[500px] space=-y-4">
          <CardHeader >
            <h1 className="text-2xl font-bold">Crie Sua Conta</h1>
            <CardDescription>Crie uma conta utilizando seus dados</CardDescription>
          </CardHeader>

          <CardContent>
          {/* Dropdown para escolher o usuário */}
            <div className="space-y-2">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo de Usuario</SelectLabel>
                    <SelectItem value="responsavel">Responsável</SelectItem>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="motorista">Motorista</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            {/* Fim do dropdown */}

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="name" className="mb-1 block">Nome</Label>
                  <Input type="name" id="name" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="sobrenome" className="mb-1 block">Sobrenome</Label>
                  <Input type="sobrenome" id="sobrenome" />
                   </div>
              </div>

            {/* Calendario para data de Nascimento */}
            <div className="flex gap-3">
              <div className="flex-1">
              <Label htmlFor="data" className="mb-1 block">Data de Nascimento</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full h-10 justify-start text-left font-normal", !date && "text-muted-foreground")}>
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              </div>         
            {/* Fim do calendario */}           
            <div className="flex-1">
              <Label htmlFor="tel" className="mb-1 block">Telefone</Label>
              <Input type="tel" id="telefone" className="h-10" />
              </div>
              </div>

              <Label htmlFor="cpf">CPF</Label>
              <Input type="cpf" id="cpf" />
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" />
              <Label htmlFor="password">Senha</Label>
              <Input type="password" id="password" />
              <Label htmlFor="password">Confirme sua senha</Label>
              <Input type="password" id="password" />

            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button className="w-full cursor-pointer">Registrar</Button>
            <div className="text-center text-sm">
              ja possui cadastro?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Entre com sua conta
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  )

}

