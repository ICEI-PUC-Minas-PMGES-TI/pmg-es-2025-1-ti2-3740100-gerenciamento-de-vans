"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const contractSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um email válido"),
  
})

interface FormContractProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function FormContract({}: FormContractProps) {
  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  function onSubmit(values: z.infer<typeof contractSchema>) {
    console.log("Dados do contrato:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Cliente</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full">
          Cadastrar Contrato
        </Button>
      </form>
    </Form>
  )
}