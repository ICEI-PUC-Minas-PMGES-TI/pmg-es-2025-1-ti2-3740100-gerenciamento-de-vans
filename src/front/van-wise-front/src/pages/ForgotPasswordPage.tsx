import { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@radix-ui/themes";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/themebutton";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/usuarios/recover-password", {
        email: email,
      });

      setMensagem(response.data); // Sucesso
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        setMensagem("Email não encontrado");
      } else {
        setMensagem("Erro ao enviar email de recuperação");
      }
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-[400px] flex flex-col justify-center">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <CardHeader>
          <CardTitle className="text-center">Recuperar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col justify-center flex-grow">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Enviar email de recuperação
            </Button>
          </form>
          {mensagem && <p className="text-center text-sm text-red-500">{mensagem}</p>}
          <div className="text-center text-sm">
            Voltar para página de{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}


