import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DriverHomePage() {
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Motorista - Início</h1>
        <div className="flex gap-2">
          <Button variant="default">Minhas Rotas</Button>
          <Button variant="secondary">Financeiro</Button>
          <Button variant="secondary">Relatórios</Button>
          <Button variant="secondary">Suporte</Button>
          <Button variant="ghost">Perfil</Button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card>Mapa</Card>
        <Card>Passageiros</Card>
        <Card>Histórico</Card>
        <Card>Agenda</Card>
        <Card className="col-span-2">Mural de Notificações</Card>
        <Card className="col-span-2">Infos do Motorista</Card>
      </section>
    </div>
  );
}