import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { ModeToggle } from "@/components/ui/themebutton";
import axios from "axios";
import { MapPin } from "lucide-react";


interface StudentCheckin {
    nome: string;
    destino: string;
    status: string;
}

const routeId = 1

const RoutesPage = () => {
    const [routeStatus, setRouteStatus] = useState<string>("");
    const [students, setStudents] = useState<StudentCheckin[]>([]);
    const dataHoje = new Date().toLocaleDateString("pt-BR");

    const handleRouteAction = async (action: "iniciar" | "pausar" | "finalizar" | "cancelar" | "expandir") => {
        let endpoint = "";
        switch (action) {
            case "iniciar":
                endpoint = `/routes/${routeId}/iniciar`;
                break;
            case "pausar":
                endpoint = `/routes/${routeId}/pausar`;
                break;
            case "finalizar":
                endpoint = `/routes/${routeId}/finalizar`;
                break;
            default:
                return;
        }
        try {
            await axios.put(`http://localhost:8080${endpoint}`);
            const res = await axios.get(`http://localhost:8080/routes/${routeId}`);
            setRouteStatus(res.data.status);
        } catch (err) {
            alert("Erro ao executar ação na rota.");
            console.error(err);
        }
    }




    useEffect(() => {
        axios
            .get(`http://localhost:8080/checkin/route/${routeId}`)
            .then((res) => {
                const alunos = res.data.map((checkin: any) => ({
                    nome: checkin.user.username,
                    destino: checkin.destino,
                    status: checkin.status
                }))
                setStudents(alunos);
            })
            .catch((err) => {
                console.error("Erro ao buscar check-ins:", err);
            });
        axios
            .get(`http://localhost:8080/routes/${routeId}`)
            .then((res) => {
                setRouteStatus(res.data.status);
            })
            .catch((err) => {
                console.error("Erro ao buscar status da rota:", err);
            });
    }, []);


    return (

        <div className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Rota do dia:</h2>
            <ModeToggle />

            <div className="w-full h-64 bg-gray-200 border border-gray-400 rounded-md flex flex-col  text-xl font-semibold text-gray-600 p-6 overflow-y-auto">
                <h3 className="mb-2 text-lg font-bold">Pontos de Destino</h3>
                <div className="flex gap-12 w-full justify-center items-center">
                    {students
                        .filter((aluno) => aluno.destino)
                        .map((aluno, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-gray-300 rounded shadow px-6 py-4 flex flex-col items-center min-w-[180px]"
                            >
                                <span className="font-bold text-base mb-2">{aluno.nome}</span>
                                <MapPin />
                                <span className="text-gray-700">{aluno.destino}</span>
                            </div>
                        ))}
                </div>
                {students.filter((aluno) => aluno.destino).length === 0 && (
                    <span className="text-gray-400">Nenhum destino cadastrado.</span>
                )}
                <h3 className="mb-2 text-lg font-bold mt-4">
                    Status da rota:
                    <span className="font-bold text-base text-gray-700 ml-2">{routeStatus || " Carregando..."}</span>
                </h3>
            </div>


            <div className="flex gap-4">
                <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">EXPANDIR A ROTA</button>
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    onClick={() => handleRouteAction("iniciar")}
                >
                    INICIAR A ROTA
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    onClick={() => handleRouteAction("pausar")}
                >
                    PAUSAR A ROTA
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                    onClick={() => handleRouteAction("finalizar")}
                >
                    FINALIZAR ROTA
                </button>
            </div>

            <div className="mt-10 border border-gray-400 rounded">
                <div className="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
                    <h3 className="text-lg font-semibold">ALUNOS</h3>
                    <span className="text-sm text-gray-600">{dataHoje}</span>
                </div>

                <table className="w-full table-auto text-left">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 border">Nome</th>
                            <th className="px-4 py-2 border">Destino</th>
                            <th className="px-4 py-2 border">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((aluno, index) => (
                            <tr key={index}>
                                <td className="px-4 py-2 border">{aluno.nome}</td>
                                <td className="px-4 py-2 border">{aluno.destino}</td>
                                <td className="px-4 py-2 border flex items-center gap-2">
                                    <Clock size={16} className="text-gray-600" />
                                    {aluno.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RoutesPage;



