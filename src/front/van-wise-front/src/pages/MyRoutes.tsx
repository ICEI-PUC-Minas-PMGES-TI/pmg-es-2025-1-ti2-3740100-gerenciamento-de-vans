import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModeToggle } from "@/components/ui/themebutton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { AutocompleteInput } from "@/components/ui/hardcomponents/AutocompleteInput";
import { set } from "zod";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";


const MyRoutes = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [driverId, setDriverId] = useState("");
  const [message, setMessage] = useState("");
  const [routes, setRoutes] = useState([]);
  const [origem, setOrigem] = useState("");
  const [origemPlaceId, setOrigemPlaceId] = useState("");
  const [addPassengerModalOpen, setAddPassengerModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  const [passengerUserId, setPassengerUserId] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");
  const [userSearchResults, setUserSearchResults] = useState<any[]>([]);




  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:8081/routes");
      setRoutes(res.data);
    } catch (err) {
      setMessage("Erro ao carregar rotas: " + (err as Error).message);
    }
  };

  const handleSearchUsersByEmail = async (email: string) => {
    if (email.length < 3) {
      setUserSearchResults([]);
      return;
    }
    try {
      // Este endpoint precisará ser criado no seu backend
      const res = await axios.get(`http://localhost:8081/usuarios/search-by-email?email=${email}`);
      setUserSearchResults(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários por email:", err);
      setUserSearchResults([]);
    }
  };


   const handleAddPassenger = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoute || !passengerUserId ) {
      console.log("Ação bloqueada. Valores atuais:", {
        route: selectedRoute,
        userId: passengerUserId,
      });
      setMessage("Por favor, preencha a ID do usuário e o destino.");
      return;
    }
    try {
      await axios.post(`http://localhost:8081/checkins`, {
        date: selectedRoute.date || selectedRoute.route_date,
        time: selectedRoute.time || selectedRoute.route_time,
        status: "PENDING",
        destino: "",
        destinoPlaceId: "",
        usuarioId: Number(passengerUserId),
        routeId: selectedRoute.id,
      });
      setMessage(`Passageiro adicionado à rota ${selectedRoute.id} com sucesso!`);
      setAddPassengerModalOpen(false);
      setPassengerUserId("");
      setPassengerEmail(""); 
      setUserSearchResults([]); 
    } catch (erro: any) {
      setMessage("Erro ao adicionar passageiro: " + erro.response?.data?.message || erro.message);
    }
  };


  const handleOpenAddPassengerModal = (route: any) => {
    setSelectedRoute(route);
    setAddPassengerModalOpen(true);
  }

  useEffect(() => {
    fetchRoutes();
  }, []);;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8081/routes", {
        date,
        time,
        status: "PENDENTE",
        origem,
        origemPlaceId,
        driver: {
          id: Number(driverId),
          user_type: "Motorista"
        }
      });
      setMessage("Rota criada com sucesso!");
      fetchRoutes();
    } catch (error: any) {
      setMessage("Erro ao criar rota: " + error.response?.data?.message || error.message);
    }
  };


  return (
    <main>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex min-h-screen w-full  justify-center p-6 md:p-10">

        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-6 itemns-end">
            <div className="grid gap-2">
              <Label htmlFor="date" >Data</Label>
              <Input
                type="date"
                id="data"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="time">Horário de Partida</Label>
              <Input
                type="time"
                id="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="origem">Endereço de Partida</Label>
              <AutocompleteInput
                onPlaceSelected={(place) => {
                  console.log("Selecionado:", place); 
                  setOrigem(place.formatted_address);
                  setOrigemPlaceId(place.place_id);
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="driverId">ID do Motorista</Label>
              <Input
                type="number"
                id="driverId"
                value={driverId}
                onChange={e => setDriverId(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="h-10 cursosr-pointer self-end">
              Criar Rota
            </Button>
          </div>

          <Table className="mt-10">
            <TableCaption>Lista de Rotas</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route: any) => (
                <TableRow key={route.id}>
                  <TableCell>{route.id}</TableCell>
                  <TableCell>
                    {route.date
                      ? new Date(route.date).toLocaleDateString("pt-BR")
                      : route.route_date
                        ? new Date(route.route_date).toLocaleDateString("pt-BR")
                        : ""}
                  </TableCell>
                  <TableCell>{route.time || route.route_time}</TableCell>
                  <TableCell>{route.status}</TableCell>
                  <TableCell>
                    <Link to={`/routes/${route.id}`}>
                      <Button variant="outline" size="sm">Ver rota</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                       <Button variant="secondary" size="sm" onClick={() => handleOpenAddPassengerModal(route)}>
                      Adicionar Passageiro
                      </Button>                  
                    </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </form>

         <Dialog open={addPassengerModalOpen} onOpenChange={setAddPassengerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Passageiro à Rota {selectedRoute?.id}</DialogTitle>
            <DialogDescription>
              Busque o passageiro pelo e-mail e adicione o endereço de destino.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddPassenger} className="mt-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="passengerEmail">Email do Passageiro</Label>
                <Input
                  id="passengerEmail"
                  type="email"
                  value={passengerEmail}
                  onChange={(e) => {
                    setPassengerEmail(e.target.value);
                    handleSearchUsersByEmail(e.target.value)
                  }}
                  placeholder="Insira a Email do usuário"
                  required
                />
                 {userSearchResults.length > 0 && (
                  <ul className="border rounded-md max-h-40 overflow-y-auto bg-background">
                    {userSearchResults.map((user) => (
                      <li
                        key={user.idUsuario}
                        className="p-2 hover:bg-accent cursor-pointer"
                        onClick={() => {
                          setPassengerUserId(user.idUsuario);
                          setPassengerEmail(user.email);
                          setUserSearchResults([]);
                        }}
                      >
                        {user.nome} ({user.email})
                      </li>
                    ))}
                  </ul>
                )}
              </div> 
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="outline" onClick={() => setAddPassengerModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar à Rota</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      </div>

    </main>
  );
}

export default MyRoutes;
