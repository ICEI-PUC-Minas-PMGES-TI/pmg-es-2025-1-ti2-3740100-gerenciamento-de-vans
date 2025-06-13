import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import axios from "axios";
import { ModeToggle } from "@/components/ui/themebutton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { AutocompleteInput } from "@/components/ui/hardcomponents/AutocompleteInput";


const MyRoutes = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [driverId, setDriverId] = useState("");
  const [message, setMessage] = useState("");
  const [routes, setRoutes] = useState([]);
  const [origem, setOrigem] = useState("");
  const [origemPlaceId, setOrigemPlaceId] = useState("");


  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/routes");
      setRoutes(res.data);
    } catch (err) {
      setMessage("Erro ao carregar rotas: " + (err as Error).message);
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/routes", {
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
              <Label htmlFor="time">Horário</Label>
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
                  console.log("Selecionado:", place); // Veja se place.place_id aparece aqui!
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
                </TableRow>
              ))}


            </TableBody>
          </Table>
        </form>




      </div>

    </main>
  );
}

export default MyRoutes;
