import { useState } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/themebutton";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8081/usuarios/login', { email, senha: password });
      console.log(response.data); // Login bem-sucedido
      // Aqui você pode redirecionar para outra página ou armazenar o token de autenticação
    } catch (err: any) {
      setError('Email ou senha inválidos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-4xl">
          <Card className="overflow-hidden">
            <div className="absolute top-4 right-4">
              <ModeToggle />
            </div>
            <CardContent className="grid p-0 md:grid-cols-2 h-500px">
              <form onSubmit={handleLogin} className="p-6 md:p-10">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col items-start">
                    <h1 className="text-2xl font-bold">Bem Vindo</h1>
                    <p className="text-balance text-muted-foreground">Entre em sua conta da wise</p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <Link to="/forgotpassword" className="ml-auto text-sm underline-offset-2 hover:underline">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
                    {loading ? 'Carregando...' : 'Login'}
                  </Button>
                  {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                  <div className="text-center text-sm">
                    Não possui uma conta?{" "}
                    <Link to="/register" className="underline underline-offset-4">
                      Cadastre-se
                    </Link>
                  </div>
                </div>
              </form>
              <div className="relative hidden md:block">
                <img
                  src="/vanescolar.jpg"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                  alt="Van"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
