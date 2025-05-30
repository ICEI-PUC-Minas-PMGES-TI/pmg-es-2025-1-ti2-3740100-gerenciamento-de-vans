"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";

export function ContractDetailsDialog({
  contract,
  onDeleteContract,
}: {
  contract: {
    id: string;
    name: string;
    email: string;
    status: string;
  };
  onDeleteContract: (id: string) => void; 
}) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 

  const handleDeleteContract = () => {
  console.log(`Tentando excluir o contrato com ID: ${contract.id}`);
  fetch(`http://localhost:8081/contracts/${contract.id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Contrato excluído");
        setIsDeleted(true);
        setTimeout(() => {
          setIsDeleted(false);
        }, 3000);

        onDeleteContract(contract.id); 
      } else if (response.status === 404) {
        console.error("Contrato não encontrado.");
      } else {
        console.error("Erro ao excluir o contrato.");
      }
    })
    .catch((error) => {
      console.error("Erro ao excluir o contrato:", error);
    });
};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Eye />
          <span className="sr-only">Ver Detalhes</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Contrato</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="text-sm font-medium">Status:</span>
            <span
              className={`col-span-3 p-2 rounded text-sm font-medium ${
                contract.status === "Contrato ativo"
                  ? "bg-green-100 text-green-800"
                  : contract.status === "Contrato pendente"
                  ? "bg-orange-100 text-orange-900"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {contract.status}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button
            variant="destructive"
            onClick={() => setShowConfirmation(true)} 
            className="bg-red-500 text-white hover:bg-red-600"
          >
            Excluir Contrato
          </Button>
        </div>
        {isDeleted && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Contrato cancelado com sucesso!
          </div>
        )}
      </DialogContent>

      {}
      {showConfirmation && (
        <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
            </DialogHeader>
            <p>Tem certeza que deseja excluir este contrato?</p>
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  handleDeleteContract();
                  setShowConfirmation(false);
                }}
                className="bg-red-500 text-white hover:bg-red-600"
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Dialog>
  );
}