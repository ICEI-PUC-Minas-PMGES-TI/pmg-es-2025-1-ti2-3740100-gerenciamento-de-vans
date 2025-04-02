import { Label } from "@/components/ui/label"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"



export default function LoginPage() {
  return (
    <main>
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <Card className="overflow-hidden bg-[#1a1a1a] text-white border-[#333]">
          <CardContent className="grid p-0 md:grid-cols-2 h-500px">
            <form className="p-6 md:p-10">
              <div className="flex flex-col gap-8">
                <div className="flex flex-col items-start">
                  <h1 className="text-2xl font-bold">Bem Vindo</h1>
                  <p className="text-balance text-muted-foreground">Entre em sua conta da wise</p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" className="bg-[#222] border-[#333]" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link to="/forgotpassword" className="ml-auto text-sm underline-offset-2 hover:underline">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" className="bg-[#222] border-[#333]" required />
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  Login
                </Button>
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



)
}