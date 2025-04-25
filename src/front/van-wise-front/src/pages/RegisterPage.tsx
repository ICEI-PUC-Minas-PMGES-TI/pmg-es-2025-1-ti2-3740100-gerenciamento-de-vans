import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Link } from "react-router-dom"
import { ModeToggle } from "@/components/ui/themebutton"



export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação no front-end
    if (!nome || !sobrenome || !email || !senha || !confirmaSenha || !telefone || !cpf || !dataNascimento || !tipoUsuario) {
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
      const response = await axios.post("http://localhost:8080/api/usuarios/registrar", {
        nome,
        sobrenome,
        email,
        senha,
        telefone,
        cpf,
        dataNascimento,
        tipoUsuario,
      });

      if (response.status === 201) {
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
      <div className="flex justify-center items-center min-h-screen ">
        <Card className="w-[500px] space=-y-4">
          <div className="absolute top-4 right-4">
            <ModeToggle />
          </div>

          <CardHeader >
            <h1 className="text-2xl font-bold">Crie Sua Conta</h1>
            <CardDescription>Crie uma conta utilizando seus dados</CardDescription>
          </CardHeader>

          <CardContent>
          {/* Dropdown para escolher o usuário */}
            <div className="space-y-2">
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
                    <SelectItem value="responsavel">Responsável</SelectItem>
                    <SelectItem value="aluno">Aluno</SelectItem>
                    <SelectItem value="motorista">Motorista</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            {/* Fim do dropdown */}

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

              <div className="flex gap-3">
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
              <Input maskType="phone" id="telefone" className="h-10" />
              </div>
              </div>

              <Label htmlFor="cpf">CPF</Label>
              <Input
                maskType="cpf"
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />

              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="password">Senha</Label>
              <Input
                type="password"
                id="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
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

      {/* Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-6 rounded shadow-lg text-center">
              <p>{modalMessage}</p>
              <Button className="mt-4" onClick={() => setIsModalOpen(false)}>
              Fechar
      </Button>
      </div>
      </div>  
      )}
    </main>
  )

}

