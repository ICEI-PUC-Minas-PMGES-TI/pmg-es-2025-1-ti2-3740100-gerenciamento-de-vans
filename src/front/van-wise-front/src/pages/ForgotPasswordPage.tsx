import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@radix-ui/themes";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


export default function ForgotPasswordPage() {
  return (
    <main className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-[400px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-center">Recuperar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col justify-center flex-grow">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" required />
          </div>
          <Button type="submit" className="w-full cursor-pointer">
            Enviar email de recuperação
          </Button>
          <div className="text-center text-sm">
            Voltar para pagina de{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>

  )
}
