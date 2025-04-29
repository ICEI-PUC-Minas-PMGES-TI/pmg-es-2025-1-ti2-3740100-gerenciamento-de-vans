import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ResponsibleHomePage() {
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Responsável - Início</h1>
        <div className="flex gap-2">
          <Button variant="default">Notificações</Button>
          <Button variant="secondary">Financeiro</Button>
          <Button variant="secondary">Relatórios</Button>
          <Button variant="secondary">Suporte</Button>
          <Button variant="ghost">Perfil</Button>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4">Informações</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>Mensagem 1</Card>
          <Card>Mensagem 2</Card>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Filhos</h2>
        <div className="flex space-x-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="bg-muted rounded-full w-16 h-16" />
              <p className="mt-2">Nome Filho</p>
              <Button variant="link" className="text-sm">Notificar</Button>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Notificações</h2>
        <div className="space-y-2">
          <Card>Mensagem do Motorista 1</Card>
          <Card>Mensagem do Motorista 2</Card>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Contatos</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="outline">Motorista</Button>
          <Button variant="outline">Filho</Button>
          <Button variant="outline">Colégio</Button>
        </div>
      </section>
    </div>
  );
}
