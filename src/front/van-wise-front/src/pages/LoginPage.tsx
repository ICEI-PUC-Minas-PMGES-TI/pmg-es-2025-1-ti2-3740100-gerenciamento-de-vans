import { useState } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/themebutton";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [loginData, setLoginData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    

    try {
      const response = await axios.post('http://localhost:8081/usuarios/login', loginData);
      console.log(response.data); // Login bem-sucedido
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      const userType = response.data.tipoUsuario.toLowerCase();
      if (userType === "donoderede" || userType === "motorista" || userType === "responsavel") {
        localStorage.setItem("userType", userType);
        localStorage.setItem("userId", response.data.idUsuario); 

        if(userType === "motorista") {
          navigate("/MotoristaHomepage");
        }
        else if (userType === "donoderede"){
          navigate("/DonoHomePage");
        }
        else if (userType === "responsavel") {
          navigate("/HomePage");
        }
      } else {
        setError("Tipo de usuário inválido.");
      }
    } catch (err: any) {
      setError('Email ou senha inválidos');
      console.error(err);
    } finally {
      setLoading(false);
    } 

  };

  return (
    <main>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Bem Vindo</h1>
              <p className="text-balance text-muted-foreground">
                Entre em sua conta da wise
              </p>
            </div>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={loginData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  name="senha"
                  type="password"
                  required
                  // 3. Corrigido o valor para corresponder ao estado
                  value={loginData.senha}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Login'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Não possui uma conta?{" "}
              <Link to="/register" className="underline">
                Cadastre-se
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <img
            src="\unnamed.png" 
            alt="Van Escolar"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </main>
  );
}
