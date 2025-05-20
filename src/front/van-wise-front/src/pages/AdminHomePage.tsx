import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminHomePage() {
  return (
    <div className="p-6 space-y-8">
      <header className="flex justify-between items-center border-b pb-4">
        <h1 className="text-2xl font-bold">Dono da Rede - Início</h1>
        <div className="flex gap-2">
          <Button variant="default">Minhas Rotas</Button>
          <Button variant="secondary">Financeiro</Button>
          <Button variant="secondary">Relatórios</Button>
          <Button variant="secondary">Suporte</Button>
          <Button variant="default">Adicionar Motorista</Button>
          <Button variant="default">Cadastrar Veículo</Button>
          <Button variant="ghost">Perfil</Button>
        </div>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-4">Frota</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="min-w-[140px] text-center">
              <div className="w-20 h-20 mx-auto bg-muted rounded-full" />
              <p>Modelo: xxxx</p>
              <p>Placa: xxxx</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Motoristas Ativos</h2>
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="min-w-[120px] text-center">
              <div className="w-16 h-16 bg-muted rounded-full mx-auto" />
              <p>Nome: xxxx</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Rotas Ativas</h2>
        <Card className="text-center">Nenhuma rota ativa no momento.</Card>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Avaliações</h2>
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="w-60 p-4">
              <p className="italic">“This service brings so much value! I LOVE IT!”</p>
              <div className="mt-2 text-yellow-500">★★★★★</div>
              <p className="text-sm">Alex Turner</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
