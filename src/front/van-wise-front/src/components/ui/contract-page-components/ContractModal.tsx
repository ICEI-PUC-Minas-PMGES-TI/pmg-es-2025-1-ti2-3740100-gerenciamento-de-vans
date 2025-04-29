"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react"

export function ContractDetailsDialog({ contract }: { 
  contract: { 
    id: string; 
    name: string; 
    email: string; 
    status: string 
  } 
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye/>
          <span className="sr-only">Ver Detalhes</span>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Contrato</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Campos ID, Nome e Email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">ID:</span>
            <span className="col-span-3 p-2 bg-muted rounded">
              {contract.id}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Nome:</span>
            <span className="col-span-3 p-2 bg-muted rounded">
              {contract.name}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Email:</span>
            <span className="col-span-3 p-2 bg-muted rounded">
              {contract.email}
            </span>
          </div>
          
          {/* Campo Status com cores temáticas */}
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            <span className={`col-span-3 p-2 rounded ${
              contract.status === "Contrato ativo"
                ? "bg-success/20 text-success-foreground"
                : "bg-warning/20 text-warning-foreground"
            }`}>
              {contract.status}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}