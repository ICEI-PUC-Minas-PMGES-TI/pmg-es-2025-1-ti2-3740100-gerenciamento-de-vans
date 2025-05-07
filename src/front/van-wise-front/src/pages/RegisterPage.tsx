import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/themebutton";
import { PlusIcon, TrashIcon, UserIcon } from "lucide-react";
import axios from "axios";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Campos específicos para responsável

  const [isResponsavel, setIsResponsavel] = useState(false);
  const [isFilhoModalOpen, setIsFilhoModalOpen] = useState(false);
  const [filhoNome, setFilhoNome] = useState("");
  const [filhoSobrenome, setFilhoSobrenome] = useState("");
  const [filhoCpf, setFilhoCpf] = useState("");
  const [filhoDataNascimento, setFilhoDataNascimento] = useState("");
  const [filhosCadastrados, setFilhosCadastrados] = useState<{ nome: string; sobrenome: string; cpf: string; dataNascimento: string; }[]>([]);

  // Campos específicos para motorista
  const [cnh, setCnh] = useState("");
  const [antt, setAntt] = useState("");

  // Campos específicos para dono de rede
  const [cnpj, setCnpj] = useState("");
  


  const handleReponsavelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsResponsavel(e.target.checked);
    if (e.target.checked) {
      setIsFilhoModalOpen(true);
    }
  };

  const handleCadastrarFilho = () => {
    if (!filhoNome || !filhoSobrenome || !filhoCpf || !filhoDataNascimento) {
      setIsFilhoModalOpen(true);
      return;
    }
    const novoFilho = {
      nome: filhoNome,
      sobrenome: filhoSobrenome,
      cpf: filhoCpf,
      dataNascimento: filhoDataNascimento,
    };

    setFilhosCadastrados([...filhosCadastrados, {
      nome: filhoNome,
      sobrenome: filhoSobrenome,
      cpf: filhoCpf,
      dataNascimento: filhoDataNascimento,
    }])


    setFilhosCadastrados([...filhosCadastrados, novoFilho]);
    console.log('Novo filho cadastrado:', novoFilho);
    console.log('Lista atualizada de filhos:', [...filhosCadastrados, novoFilho]);
    setModalMessage(`filho ${filhoNome} ${filhoSobrenome} cadastrado com sucesso!`);

    setIsModalOpen(true);
    setIsFilhoModalOpen(false);
    setFilhoNome("");
    setFilhoSobrenome("");
    setFilhoCpf("");
    setFilhoDataNascimento("");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação no front-end
    if (
      !nome || !sobrenome || !email || !senha || !confirmaSenha || !telefone || !cpf ||
      !dataNascimento || !cep || !rua || !bairro || !cidade || !estado || !numero || !complemento || !tipoUsuario ||
      (tipoUsuario === "motorista" && (!cnh || !antt)) ||
      (tipoUsuario === "donoderede" && !cnpj)
    ) {
      setModalMessage("Por favor, preencha todos os campos obrigatórios.");
      setIsModalOpen(true);
      return;
    }
    

    // Verificar se as senhas coincidem
    if (senha !== confirmaSenha) {
      setModalMessage("As senhas não coincidem.");
      setIsModalOpen(true);
      return;
    }

    try {
      // Enviar dados para o backend
      const response = await axios.post("http://localhost:8081/usuarios/salvar", {
        nome,
        sobrenome,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        tipoUsuario,
        cep,
        rua,
        bairro,
        cidade,
        estado,
        numero,
        complemento,
        ...(tipoUsuario === "donoderede" && { cnpj }),
        ...(tipoUsuario === "motorista" && { cnh, antt }),
        filhos: isResponsavel ? filhosCadastrados : []
      });

      if (response.status === 200 || response.status === 201) {
        setModalMessage("Cadastro realizado com sucesso!");
      } else {
        setModalMessage("Erro ao registrar. Tente novamente.");
      }
      setIsModalOpen(true);
    } catch (error: any) {
      // Exibir mensagem de erro do back-end, se disponível
      const errorMessage = error.response?.data || "Erro ao registrar. Tente novamente.";
      setModalMessage(errorMessage);
      setIsModalOpen(true);
    }
  };

  return (
    <main>
      <div className={`flex justify-center items-center min-h-screen ${isModalOpen || isFilhoModalOpen ? "blur-sm" : ""}`}>
        <Card className="w-[600px] space-y-4">
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>

          <CardHeader>
            <h1 className="text-2xl font-bold">Crie Sua Conta</h1>
            <CardDescription>Crie uma conta utilizando seus dados</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <Select
                value={tipoUsuario}
                onValueChange={(value) => setTipoUsuario(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipo de Usuario</SelectLabel>
                    <SelectItem value="responsavel">Responsável/Maior de idade</SelectItem>
                    <SelectItem value="motorista">Motorista</SelectItem>
                    <SelectItem value="donoderede">Dono de rede</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Checkbox para maior de idade */}
              {tipoUsuario === "responsavel" && (
                <>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="responsavel"
                      checked={isResponsavel}
                      onChange={handleReponsavelChange}
                    />
                    <Label htmlFor="responsavel">Sou responsável</Label>
                  </div>

                  {isResponsavel && ( // Só mostra a seção de filhos se for responsável
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold flex items-center gap-2">
                          {/* Certifique-se de importar UserIcon */}
                          <UserIcon className="w-4 h-4" />
                          Filhos Cadastrados
                        </h3>
                        <span className="text-sm">
                          {filhosCadastrados.length}
                        </span>
                      </div>

                      {filhosCadastrados.length > 0 ? (
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          {filhosCadastrados.map((filho, index) => (
                            <div key={index} className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{filho.nome} {filho.sobrenome}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setFilhosCadastrados(filhosCadastrados.filter((_, i) => i !== index));
                                }}
                              >
                                {/* Certifique-se de importar TrashIcon */}
                                <TrashIcon className="w-4 h-4 text-red-500" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>
                          <p>Nenhum filho cadastrado</p>
                        </div>
                      )}

                      <Button
                        variant="outline"
                        className="w-full mt-3"
                        onClick={() => setIsFilhoModalOpen(true)}
                      >

                        <PlusIcon className="w-4 h-4 mr-2" />
                        Adicionar Menor
                      </Button>
                    </div>
                  )}
                </>
              )}

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="name" className="mb-1 block">
                    Nome
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="sobrenome" className="mb-1 block">
                    Sobrenome
                  </Label>
                  <Input
                    type="text"
                    id="sobrenome"
                    value={sobrenome}
                    onChange={(e) => setSobrenome(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="data" className="mb-1 block">
                    Data de Nascimento
                  </Label>
                  <Input
                    type="date"
                    id="data"
                    max={new Date().toISOString().split("T")[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 100))
                      .toISOString()
                      .split("T")[0]}
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </div>

                <div className="flex-1">
                  <Label htmlFor="tel" className="mb-1 block">Telefone</Label>
                  <Input
                    maskType="phone"
                    id="telefone"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                  />
                </div>
              </div>
              {/* Campo caso seja dono de rede */}
              {tipoUsuario === "donoderede" && (
                <>
                <Label htmlFor="cnpj" className="mb-1 block">CNPJ</Label>
                <Input
                maskType="cnpj"
                id="cnpj"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0000-00"
                />
                </>
              )}
              {/* Campo caso seja motorista */}
              {tipoUsuario === "motorista" && (
                <>
                  <Label htmlFor="cnh" className="mb-1 block">CNH</Label>
                  <Input
                    maskType="cnh"
                    id="cnh"
                    value={cnh}
                    onChange={(e) => setCnh(e.target.value)}
                    placeholder="Número da CNH"
                  />

                  <Label htmlFor="antt" className="mb-1 block">Registro ANTT</Label>
                  <Input
                    maskType="antt"
                    id="antt"
                    value={antt}
                    onChange={(e) => setAntt(e.target.value)}
                    placeholder="Número do registro ANTT"
                  />

                </>
              )}

              <Label htmlFor="cpf" className="mb-1 block">CPF</Label>
              <Input
                maskType="cpf"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
              />
              
              
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="CEP" className="mb-1 block">CEP</Label>
                  <Input
                    maskType="cep"
                    id="cep"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    placeholder="00000-000"
                  />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="rua" className="mb-1 block">Rua</Label>
                    <Input
                    type="text"
                    id="rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                    />
                  </div>          
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="cidade" className="mb-1 block">Cidade</Label>
                  <Input
                    type="text"
                    id="cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="estado" className="mb-1 block">Estado</Label>
                  <Input
                  type="text"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <Label htmlFor="bairro" className="mb-1 block">Bairro</Label>
                  <Input
                  type="text"
                  id="bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  />

                </div>
                <div className="flex-1">
                  <Label htmlFor="complemento" className="mb-1 block">Complemento</Label>
                  <Input
                  type="text"
                  id="complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="numero" className="mb-1 block">Número</Label>
                  <Input
                  type="number"
                  id="numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  />

                </div>
              </div>

              <Label htmlFor="email" className="mb-1 block">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="password" className="mb-1 block">Senha</Label>
              <Input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Label htmlFor="confirmPassword" className="mb-1 block">Confirme sua senha</Label>
              <Input
                type="password"
                id="confirmPassword"
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <Button className="w-full cursor-pointer" onClick={handleRegister}>
              Registrar
            </Button>
            <div className="text-center text-sm">
              Já possui cadastro?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Entre com sua conta
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {isFilhoModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">
              {filhosCadastrados.length > 0
                ? `Adicionar ${filhosCadastrados.length + 1}º Filho`
                : "Dados do Menor"}</h2>
            <div className="space-y-6">

              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="filhoNome" className="mb-1 block">
                    Nome
                  </Label>
                  <Input
                    type="text"
                    id="filhoNome"
                    value={filhoNome}
                    onChange={(e) => setFilhoNome(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="filhoSobrenome" className="mb-1 block">
                    Sobrenome
                  </Label>
                  <Input
                    type="text"
                    id="filhoSobrenome"
                    value={filhoSobrenome}
                    onChange={(e) => setFilhoSobrenome(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="filhoDataNacimento" className="mb-1 block">
                    Data de Nascimento
                  </Label>
                  <Input
                    type="date"
                    id="filhoDataNacimento"
                    max={new Date().toISOString().split("T")[0]}
                    min={new Date(new Date().setFullYear(new Date().getFullYear() - 100))
                      .toISOString()
                      .split("T")[0]}
                    value={filhoDataNascimento}
                    onChange={(e) => setFilhoDataNascimento(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="filhoCpf" className="mb-1 block">CPF</Label>
                  <Input
                    maskType="cpf"
                    id="filhoCpf"
                    value={filhoCpf}
                    onChange={(e) => setFilhoCpf(e.target.value)}
                  />
                </div>
              </div>

              {filhosCadastrados.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Filhos cadastrados: </h3>
                  <ul className="space y-2">
                    {filhosCadastrados.map((filho, index) => (
                      <li key={index} className="text-sm">
                        {index + 1}. {filho.nome} {filho.sobrenome} (CPF: {filho.cpf}, Data de Nascimento: {filho.dataNascimento})
                      </li>
                    ))}
                  </ul>

                </div>
              )}

              <div className="mt-3 flex justify-end space-x-2">
                <Button variant={"destructive"}
                  onClick={() => {
                    setIsFilhoModalOpen(false)
                    setIsResponsavel(false);
                    setFilhosCadastrados([]);
                  }}>
                  Cancelar
                </Button>

                <div className="flex gap-3">
                  <Button onClick={handleCadastrarFilho}>
                    Cadastrar Filho
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <p className="text-xl font-bold mb-4">{modalMessage}</p>
            <div className="flex justify-center">
              <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
