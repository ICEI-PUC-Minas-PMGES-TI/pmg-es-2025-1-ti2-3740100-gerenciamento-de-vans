"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";
import { FormContract } from "./FormContract";

interface NewContractModalProps {
  onAddContract: (newContract: { id: string; name: string; email: string; status: string; pdfFile?: File | null }) => void;
}

export function NewContractModal({ onAddContract }: NewContractModalProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Contrato
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Contrato</DialogTitle>
        </DialogHeader>
        <FormContract
          onSuccess={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          onAddContract={onAddContract}
        />
      </DialogContent>
    </Dialog>
  );
}