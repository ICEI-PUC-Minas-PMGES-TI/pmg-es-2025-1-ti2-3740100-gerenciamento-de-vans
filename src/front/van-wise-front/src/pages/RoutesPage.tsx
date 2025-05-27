import React from "react";
import { Clock } from "lucide-react";

const students = [
{ nome: "Aluno 1", destino: "Destino A", status: "Aguardando" },
{ nome: "Aluno 2", destino: "Destino B", status: "Aguardando" },
{ nome: "Aluno 3", destino: "Destino C", status: "Aguardando" }
];

const RoutesPage = () => {
const dataHoje = new Date().toLocaleDateString("pt-BR");

return (
    <div className="p-8 space-y-6">
    <h2 className="text-2xl font-bold">Rota do dia:</h2>

    <div className="w-full h-64 bg-gray-200 border border-gray-400 rounded-md flex items-center justify-center text-xl font-semibold text-gray-600">
        ROTA
    </div>

    <div className="flex gap-4">
        <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">EXPANDIR A ROTA</button>
        <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">INICIAR A ROTA</button>
        <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded">PAUSAR A ROTA</button>
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