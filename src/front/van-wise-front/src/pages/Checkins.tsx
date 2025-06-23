import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/themebutton";
import axios from "axios";
import React, { useEffect } from "react";
import { AutocompleteInput } from "@/components/ui/hardcomponents/AutocompleteInput";
import { Label } from "@/components/ui/label";

const Checkins = () => {
  const [userId, setUserId] = React.useState("");
  const [routes, setRoutes] = React.useState<any[]>([]);
  const [checkins, setCheckins] = React.useState<any[]>([]);
  const [message, setMessage] = React.useState("");
  const [confirmationModalOpen, setConfirmationModalOpen] = React.useState(false);
  const [selectedCheckin, setSelectedCheckin] = React.useState<any>(null);
  const [actionToConfirm, setActionToConfirm] = React.useState<"CONFIRMED" | "CANCELLED" | "">("");
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [checkinToEdit, setCheckinToEdit] = React.useState<any>(null);
  const [newSaida, setNewSaida] = React.useState("");
  const [newSaidaPlaceId, setNewSaidaPlaceId] = React.useState("");
  const [newDestino, setNewDestino] = React.useState("");
  const [newDestinoPlaceId, setNewDestinoPlaceId] = React.useState("");

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  }, []);

  const fetchAllData = async () => {
    try {
      const [routesRes, checkinsRes] = await Promise.all([
        axios.get("http://localhost:8081/routes"),
        axios.get("http://localhost:8081/checkins")
      ]);
      setRoutes(routesRes.data);
      setCheckins(checkinsRes.data);
    } catch (err) {
      setMessage("Erro ao carregar dados: " + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const findUserCheckinForRoute = (routeId: number) => {
    return checkins.find(c => c.route?.id === routeId && c.usuario?.idUsuario === Number(userId));
  };

  const handleEditStatus = async (checkinId: number, newStatus: string) => {
    const checkinToUpdate = checkins.find(c => c.id === checkinId);
    if (!checkinToUpdate) return;
    const updatedCheckin = { ...checkinToUpdate, status: newStatus };

    try {
      await axios.put(`http://localhost:8081/checkins/${checkinId}`, updatedCheckin);
      setMessage("Status atualizado com sucesso!");
      fetchAllData();
    } catch (err) {
      setMessage("Erro ao atualizar o status: " + (err as Error).message);
    }
  };

  const handleOpenEditModal = (checkin: any) => {
    setCheckinToEdit(checkin); 
    setNewSaida(checkin.saida || "");
    setNewSaidaPlaceId(checkin.saidaPlaceId || "");
    setNewDestino(checkin.destino || "");
    setNewDestinoPlaceId(checkin.destinoPlaceId || "");
    setEditModalOpen(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkinToEdit) return;

    const updatedCheckin = {
      ...checkinToEdit,
      saida: newSaida,
      saidaPlaceId: newSaidaPlaceId,
      destino: newDestino,
      destinoPlaceId: newDestinoPlaceId,
    };

    try {
      await axios.put(`http://localhost:8081/checkins/${checkinToEdit.id}`, updatedCheckin);
      setMessage("Endereços atualizados com sucesso!");
      setEditModalOpen(false);
      fetchAllData();
    } catch (err) {
      setMessage("Erro ao atualizar endereços: " + (err as Error).message);
    }
  };

  const openConfirmationModal = (checkin: any, action: "CONFIRMED" | "CANCELLED") => {
    setSelectedCheckin(checkin);
    setActionToConfirm(action);
    setConfirmationModalOpen(true);
  };

  const handleConfirmation = async () => {
    if (!selectedCheckin || !actionToConfirm) return;
    await handleEditStatus(selectedCheckin.id, actionToConfirm);
    setConfirmationModalOpen(false);
  };

  return (
    <main>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex min-h-screen w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-4xl">
          <p className="text-left mb-2 font-semibold">Minhas Rotas e Check-ins</p>
          {message && <p className="text-center my-2 p-2 bg-secondary rounded-md">{message}</p>}
          <Table className="mt-4">
            <TableCaption>Gerencie seus check-ins para as rotas disponíveis.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID da Rota</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário de Partida</TableHead>
                <TableHead>Meu Status</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route: any) => {
                const userCheckinForThisRoute = findUserCheckinForRoute(route.id);
                return (
                  <TableRow key={route.id}>
                    <TableCell>{route.id}</TableCell>
                    <TableCell>{new Date(route.date || route.route_date).toLocaleDateString("pt-BR")}</TableCell>
                    <TableCell>{route.time || route.route_time}</TableCell>
                    <TableCell>{userCheckinForThisRoute ? userCheckinForThisRoute.status : "Não aplicável"}</TableCell>
                    <TableCell>
                      {userCheckinForThisRoute && (
                        <div className="flex justify-center gap-2">
                          <Button
                            className="bg-green-600 hover:bg-green-700"
                            size="sm"
                            onClick={() => openConfirmationModal(userCheckinForThisRoute, "CONFIRMED")}
                            disabled={userCheckinForThisRoute.status !== 'PENDING'}
                          >
                            Confirmar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => openConfirmationModal(userCheckinForThisRoute, "CANCELLED")}
                            disabled={userCheckinForThisRoute.status === 'CANCELLED'}
                          >
                            Cancelar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleOpenEditModal(userCheckinForThisRoute)}
                          >
                            Partida e Destino
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal de Confirmação de Ação (para status) */}
      <Dialog open={confirmationModalOpen} onOpenChange={setConfirmationModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Ação</DialogTitle>
            <DialogDescription>
              Você tem certeza que deseja {actionToConfirm === 'CONFIRMED' ? 'confirmar' : 'cancelar'} este check-in?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={() => setConfirmationModalOpen(false)}>Não</Button>
            <Button
              variant={actionToConfirm === 'CANCELLED' ? 'destructive' : 'default'}
              onClick={handleConfirmation}
            >
              Sim
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para Editar Endereços */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Endereços do Check-in</DialogTitle>
            <DialogDescription>
              Atualize seu local de partida e destino para a rota {checkinToEdit?.route?.id}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateAddress} className="flex flex-col gap-4 mt-4">
            <div>
              <Label className="block text-sm font-medium mb-1">Local de Saída</Label>
             <AutocompleteInput
                onPlaceSelected={(p) => { setNewSaida(p.formatted_address); setNewSaidaPlaceId(p.place_id); }}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium mb-1">Destino</Label>
               <AutocompleteInput
                onPlaceSelected={(p) => { setNewDestino(p.formatted_address); setNewDestinoPlaceId(p.place_id); }}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Checkins;