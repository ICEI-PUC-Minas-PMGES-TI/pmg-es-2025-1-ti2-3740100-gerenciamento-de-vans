import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { ModeToggle } from "@/components/ui/themebutton";
import axios from "axios";
import { MapPin } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DirectionsMap from "@/components/ui/hardcomponents/DirectionsMap";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDistance } from "geolib";
import { boolean } from "zod";
import { useMap } from '@vis.gl/react-google-maps';




interface StudentCheckin {
    nome: string;
    destino: string;
    status: string;
}

const RoutesPage = () => {
    const { routeId } = useParams();
    const routeIdNumber = Number(routeId);
    const [routeStatus, setRouteStatus] = useState<string>("");
    const [students, setStudents] = useState<StudentCheckin[]>([]);
    const dataHoje = new Date().toLocaleDateString("pt-BR");
    const navigate = useNavigate();
    const [routeData, setRouteData] = useState({
        origem: "",
        destino: "",
        paradas: [] as string[],
    })

    useEffect(() => {
        let origemDaRota = "";

        axios
            .get(`http://localhost:8081/routes/${routeId}`)
            .then((res) => {
                setRouteStatus(res.data.status);
                origemDaRota = res.data.origemPlaceId || "";
            })
            .catch((err) => {
                console.error("Erro ao buscar status da rota:", err);
            })
            .finally(() => {
                axios
                    .get(`http://localhost:8081/checkins/route/${routeIdNumber}`)
                    .then(async (res) => {
                        const alunos = res.data.map((checkin: any) => ({
                            nome: checkin.usuario?.nome || checkin.usuario?.username || "Sem nome",
                            destino: checkin.destino,
                            destinoPlaceId: checkin.destinoPlaceId,
                            status: checkin.status
                        }));
                        setStudents(alunos);
                        const destinos = alunos
                            .filter((a: { destinoPlaceId: string; }) => a.destinoPlaceId && a.destinoPlaceId.trim() !== "")
                            .map((a: { destinoPlaceId: string; }) => a.destinoPlaceId);

                        setRouteData({
                            origem: origemDaRota,
                            destino: destinos[destinos.length - 1] || "",
                            paradas: destinos.slice(0, -1),
                        });
                    })
                    .catch((err) => {
                        console.error("Erro ao buscar check-ins:", err);
                    });
            });
    }, [routeId, routeIdNumber]);


    const handleRouteAction = async (action: "iniciar" | "pausar" | "finalizar" | "cancelar" | "expandir") => {
        let endpoint = "";
        let method: "put" | "delete" = "put";
        switch (action) {
            case "iniciar":
                endpoint = `/routes/${routeId}/iniciar`;
                break;
            case "pausar":
                endpoint = `/routes/${routeId}/pausar`;
                break;
            case "finalizar":
                const confirmed = window.confirm("Tem certeza que deseja finalizar e excluir esta rota? Esta ação não pode ser desfeita.");
                if (!confirmed) return;
                endpoint = `/routes/${routeId}/finalizar`;
                method = "put";
                break;
            default:
                return;
        }
        try {
            if (method === "put") {
                await axios.put(`http://localhost:8081${endpoint}`);
                const res = await axios.get(`http://localhost:8081/routes/${routeId}`);
                setRouteStatus(res.data.status);
            }
        } catch (err) {
            alert("Erro ao executar ação na rota.");
            console.error(err);
        }
    }





    return (
        <React.Fragment>
            <div className="w-fullrounded-md flex flex-col text-xl font-semibold p-6">
                <h3 className="mb-2 text-lg font-bold">Pontos de Destino</h3>
                <div className="w-full h-[500px] mb-6 relative overflow-hidden rounded-md border border-gray-300">
                    <DirectionsMap
                        origem={routeData.origem}
                        destino={routeData.destino}
                        paradas={routeData.paradas}
                    />
                </div>
                {students.filter((aluno) => aluno.destino).length === 0 && (
                    <span className="text-gray-400">Nenhum destino cadastrado.</span>
                )}
                <h3 className="mb-2 text-lg font-bold mt-4">
                    Status da rota:
                    <span className="font-bold text-base text-gray-700 ml-2">{routeStatus || " Carregando..."}</span>
                </h3>
                <div className="mb-4">
                    <span className="font-semibold">Ponto de partida: </span>
                    <span className="text-gray-700">
                        {routeData.origem
                            ? routeData.origem
                            : "Endereço de origem não cadastrado ou inválido."}
                    </span>
                </div>
            </div>

            <div className="flex gap-4">
                <Button >EXPANDIR A ROTA</Button>
                <Button onClick={() => handleRouteAction("iniciar")}>INICIAR A ROTA</Button>
                <Button onClick={() => handleRouteAction("pausar")}>PAUSAR A ROTA</Button>
                <Button onClick={() => handleRouteAction("finalizar")}>FINALIZAR ROTA</Button>
            </div>

            <div className="mt-10 border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-white">
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b">
                    <h3 className="text-lg font-semibold text-gray-800 text-center">Alunos</h3>
                    <span className="text-sm text-gray-500">{dataHoje}</span>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Destino</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((aluno, index) => (
                            <TableRow key={index} className="hover:bg-gray-50 transition">
                                <TableCell>{aluno.nome}</TableCell>
                                <TableCell>{aluno.destino}</TableCell>
                                <TableCell className="flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    <span className="capitalize">{aluno.status}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </React.Fragment>
    );
};

export default RoutesPage;



