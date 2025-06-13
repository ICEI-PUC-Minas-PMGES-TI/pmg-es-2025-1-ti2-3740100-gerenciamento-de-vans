import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ModeToggle } from "@/components/ui/themebutton";
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { APIProvider, Map, ControlPosition } from '@vis.gl/react-google-maps';
import { AutocompleteInput } from "@/components/ui/hardcomponents/AutocompleteInput";
import DirectionsMap from "@/components/ui/hardcomponents/DirectionsMap";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

const Checkins = () => {

  React.useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      setUserId("");
    }
  }, []);


  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedRoute, setSelectedRoute] = React.useState<any>(null);
  const [message, setMessage] = React.useState("");
  const [time, setTime] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [destino, setDestino] = React.useState("");
  const [driverId, setDriverId] = React.useState("");
  const [date, setDate] = React.useState("");
  const [checkins, setCheckins] = React.useState<any[]>([]);
  const [checkinDate, setCheckinDate] = React.useState("");
  const [checkinTime, setCheckinTime] = React.useState("");
  const [checkinDestino, setCheckinDestino] = React.useState("");
  const [destinoPlaceId, setCheckinDestinoPlaceId] = React.useState<string>("");
  const [userId, setUserId] = React.useState("");
  const [routeId, setRouteId] = React.useState("");
  const [routes, setRoutes] = React.useState([]);
  const [showUserCheckins, setShowUserCheckins] = React.useState(false);
  const placePickerRef = useRef<any>(null);

  // Filter checkins for the current user
  const userCheckins = React.useMemo(
    () => checkins.filter((c: any) => String(c.user_id || c.userId) === String(userId)),
    [checkins, userId]
  );

  //Mostrar os checkins
  const fetchCheckins = async () => {
    try {
      const res = await axios.get("http://localhost:8080/checkins");
      setCheckins(res.data);
    } catch (err) {
      setMessage("Erro ao carregar checkins: " + (err as Error).message);
    }
  };

  useEffect(() => {
    if (placePickerRef.current) {
      placePickerRef.current.addEventListener('gmpx-placechange', (event: any) => {
        const place = event.detail;
        setCheckinDestino(place.formattedAddress || "");
      });
    }
  }, [modalOpen]);

  useEffect(() => {
    fetchCheckins();
  }, []);

  //Mostrar as rotas
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/checkins", {
        date: formatDate(selectedRoute.date || selectedRoute.route_date),
        time: selectedRoute.time || selectedRoute.route_time,
        status: "PENDING",
        destino: checkinDestino,
        destinoPlaceId: destinoPlaceId,
        usuarioId: Number(userId),
        routeId: selectedRoute.id,
      });
      setMessage("checkin enviado com sucesso!")
      setModalOpen(false);
      fetchCheckins();
    } catch (err) {
      setMessage("Erro ao enviar checkin: " + (err as Error).message);
    }
  }

  const handleEditStatus = async (chekinId: number, newStatus: string) => {
    try {
      await axios.put(`http://localhost:8080/checkins/${chekinId}`, {
        status: newStatus
      })
      setMessage("Status atualizado com sucesso!");
      fetchCheckins();
    } catch (err) {
      setMessage("Erro ao atualizar o status: " + (err as Error).message);
    }
  };

  //abrir modal
  const openCheckinModal = (route: number) => {
    setSelectedRoute(route);
    setModalOpen(true);
  }

  const formatDate = (dateObj: any) => {
    if (typeof dateObj === "string" && dateObj.includes("-")) return dateObj;
    const d = new Date(dateObj);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };



  return (
    <main>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      {/*Rotas disponiveis*/}
      <div className="flex min-h-screen w-full justify-center p-6 md:p-10">
        <div className="w-full max-w-3xl mr-8">
          <p className="text-left mb-2 font-semibold">Rotas Disponíveis</p>
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
                    <Button
                      className="bg-gray-600 hover:bg-gray-700 text-white"
                      type="button"
                      onClick={() => openCheckinModal(route)}
                    >
                      Checkin</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            
          </Table>

        </div>
      </div>

      {/*Modal checkin*/}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent aria-describedby="modal-desc">
          <DialogHeader>
            <DialogTitle>Fazer Checkin</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col items-center gap-4 justify-center mt-6">
              <AutocompleteInput
                onPlaceSelected={(place) => {
                  console.log("PLACE AUTOCOMPLETE:", place);
                  setCheckinDestino(place.formatted_address);
                  setCheckinDestinoPlaceId(place.place_id)
                }}
              />              
              <div className="flex flex-row gap-4 mt-2">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Confirmar Checkin
                </Button>
                <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                  Cancelar
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/*Checkins confirmados*/}

    </main>
  );
};

export default Checkins;