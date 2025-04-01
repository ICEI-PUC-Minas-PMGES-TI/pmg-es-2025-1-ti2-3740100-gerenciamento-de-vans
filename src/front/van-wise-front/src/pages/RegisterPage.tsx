import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"
import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {  Popover,  PopoverContent,  PopoverTrigger,} from "@/components/ui/popover"


export default function RegisterPage() {
  const [date, setDate] = React.useState<Date>()

  return(
    <main>
      <div className="flex justify-center items-center min-h-screen ">
      <Card className="w-[350px] space=-y-4">
          <CardHeader >
            <CardTitle>Criar Conta</CardTitle>
            <CardDescription>Crie uma conta utilizando seus dados</CardDescription>
          </CardHeader>

          <CardContent>
          <div className="space-y-2">

           <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Tipo de usuário"/>
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
            
            <Label htmlFor="name">Nome</Label>
            <Input type="name" id="name"/>
            <Label htmlFor="sobrenome">Sobrenome</Label>
            <Input type="sobrenome" id="sobrenome"/>
            <Label htmlFor="data">Data de Nascimento</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className={cn("w-[300px] justify-start text-left font-normal", !date && "text-muted-foreground")}>
                  {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus /> 
              </PopoverContent> 
              </Popover>          
            <Label htmlFor="cpf">CPF</Label>
            <Input type="cpf" id="cpf"/>
            <Label htmlFor="tel" >Telefone</Label>
            <Input type="tel" id="telefone"/>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email"/>
            <Label htmlFor="password">Senha</Label>
            <Input type="password" id="password"/>
            <Label htmlFor="password">Confirme sua senha</Label>
            <Input type="password" id="password"/>

            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button className="w-[300px]">Registrar</Button>
            <Button variant="link" className="text-sm">ja tem cadastro ?</Button>
            </CardFooter>
        </Card>
        </div>
    </main>
  )

}

