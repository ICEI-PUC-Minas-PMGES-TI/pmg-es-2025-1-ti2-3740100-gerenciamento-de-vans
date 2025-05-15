"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const contractSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Por favor, insira um email válido"),
  pdfFile: z.instanceof(File).optional(),
});

interface FormContractProps {
  onSuccess: () => void;
  onCancel: () => void;
  onAddContract: (newContract: { id: string; name: string; email: string; status: string; pdfFile?: File | null}) => void;
}

export function FormContract({ onSuccess, onAddContract }: FormContractProps) {
  const form = useForm<z.infer<typeof contractSchema>>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      name: "",
      email: "",
      pdfFile: undefined,
    },
  });

  const fileRef = form.register("pdfFile");

  function onSubmit(values: z.infer<typeof contractSchema>) {
    fetch("http://localhost:8080/contracts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        status: "Contrato pendente",
        pdfFile: values.pdfFile,
      }),
    })
      .then((response) => response.json())
      .then((newContract) => {
        onAddContract(newContract); 
        onSuccess(); 
      })
      .catch((error) => {
        console.error("Erro ao cadastrar contrato:", error);
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4"
      >
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
        <FormField
          control={form.control}
          name="pdfFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contrato PDF</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept=".pdf" 
                  {...fileRef}
                  onChange={(e) => {
                    field.onChange(e.target.files?.[0]);
                  }}
                />
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
  );
}