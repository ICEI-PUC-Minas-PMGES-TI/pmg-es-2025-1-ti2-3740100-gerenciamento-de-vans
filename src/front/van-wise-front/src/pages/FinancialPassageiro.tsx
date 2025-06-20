import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

type Boleto = {
  valor: number;
  vencimento: string;
  status: "pendente" | "aguardando" | "pago";
};

const initialBoletos: Boleto[] = [
  { valor: 250, vencimento: "2025-01-07", status: "pendente" },
  { valor: 250, vencimento: "2025-02-07", status: "pendente" },
  { valor: 250, vencimento: "2025-03-07", status: "pendente" },
  { valor: 250, vencimento: "2025-04-07", status: "pendente" },
  { valor: 250, vencimento: "2025-05-07", status: "pendente" },
  { valor: 250, vencimento: "2025-06-07", status: "pendente" },
  { valor: 250, vencimento: "2025-07-07", status: "pendente" },
  { valor: 250, vencimento: "2025-08-07", status: "pendente" },
  { valor: 250, vencimento: "2025-09-07", status: "pendente" },
  { valor: 250, vencimento: "2025-10-07", status: "pendente" },
  { valor: 250, vencimento: "2025-11-07", status: "pendente" },
  { valor: 250, vencimento: "2025-12-07", status: "pendente" },
];

export default function FinanceiroSimples() {
  const [boletos, setBoletos] = useState<Boleto[]>(initialBoletos);
  const [boletoIndexSelecionado, setBoletoIndexSelecionado] = useState<number | null>(null);

  const abrirHome = () => {
    navigate('HomePage.tsx');
  };

  const confirmarPagamento = () => {
    if (boletoIndexSelecionado === null) return;

    setBoletos((prev) =>
      prev.map((b, index) =>
        index === boletoIndexSelecionado ? { ...b, status: "aguardando" } : b
      )
    );

    setTimeout(() => {
      setBoletos((prev) =>
        prev.map((b, index) =>
          index === boletoIndexSelecionado ? { ...b, status: "pago" } : b
        )
      );
    }, 3000);

    setBoletoIndexSelecionado(null);
  };

  return (
    <div>
      {/* Menu superior */}
      <nav className="bg-gray-200 px-6 py-3 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <div className="font-semibold text-gray-800 text-lg">Wise Vans</div>
        <ul className="flex gap-6 text-gray-700 text-sm font-medium">
          <li>
            <button
              onClick={abrirHome}
              className="underline underline-offset-4 decoration-2 decoration-gray-900 focus:outline-none"
              aria-current="page"
            >
              Home
            </button>
          </li>
        </ul>
      </nav>

      <div className="p-6 max-w-4xl mx-auto">
        {!Number.isInteger(boletoIndexSelecionado) ? (
          <>
            <h2 className="text-xl font-bold mb-4">Boletos</h2>
            <table className="w-full border rounded-md overflow-hidden text-sm">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3">Valor</th>
                  <th className="p-3">Vencimento</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Ação</th>
                </tr>
              </thead>
              <tbody>
                {boletos.map((boleto, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-semibold">R$ {boleto.valor.toFixed(2)}</td>
                    <td className="p-3">{boleto.vencimento}</td>
                    <td className="p-3">
                      {boleto.status === "aguardando" ? (
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                          Aguardando Confirmação
                        </span>
                      ) : boleto.status === "pago" ? (
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                          Pago
                        </span>
                      ) : (
                        <span className="text-gray-600">Pendente</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      {boleto.status === "pendente" && (
                        <Button onClick={() => setBoletoIndexSelecionado(index)}>Pagar</Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <Card className="max-w-md mx-auto">
            <CardContent className="flex flex-col items-center pt-6 space-y-4">
              <h2 className="text-xl font-bold text-center">Escaneie o QR Code</h2>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=boleto-${boletoIndexSelecionado}`}
                alt="QR Code"
                className="rounded border"
              />
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setBoletoIndexSelecionado(null)}>
                  Voltar
                </Button>
                <Button onClick={confirmarPagamento}>Confirmar</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
