import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/ui/hardcomponents/Layout.tsx';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import ContractForm from './pages/ContractForm.tsx';
import HomePage from './pages/HomePage.tsx';
import MotoristaHomepage from './pages/MotoristaHomepage.tsx';
import Checkins from './pages/Checkins.tsx';
import RoutesPage from './pages/RoutesPage.tsx';
import MyRoutes from './pages/MyRoutes.tsx';
import DonoRedeHomepage from './pages/DonoHomePage.tsx';
import FinancialPassageiro from './pages/FinancialPassageiro.tsx';
import { ProtectedRoute } from './components/ui/hardcomponents/ProtectedRoute.tsx';
import FinancialPage from './pages/FinancialPage.tsx';
import FinancialMotoristaPage from './pages/FinancialMotorista.tsx';
import AvaliacaoPage from './pages/AvaliacaoPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas (sem Navbar) */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />

          {/* Rotas Protegidas (com Navbar) */}
          <Route element={<Layout />}>
            {/* Rotas para Dono */}
            <Route element={<ProtectedRoute allowedRoles={['donoderede']} />}>
              <Route path='/DonoHomePage' element={<DonoRedeHomepage />} />
              <Route path='/financial' element={<FinancialPage />} />
            </Route>

            {/* Rotas para Motorista */}
            <Route element={<ProtectedRoute allowedRoles={['motorista']} />}>
              <Route path='/MotoristaHomePage' element={<MotoristaHomepage />} />
              <Route path='/myroutes' element={<MyRoutes />} />
              <Route path='/routes/:routeId' element={<RoutesPage />} />
              <Route path='/financialmotorista' element={<FinancialMotoristaPage />} />
            </Route>

            {/* Rotas para Responsável */}
            <Route element={<ProtectedRoute allowedRoles={['responsavel']} />}>
              <Route path='/homepage' element={<HomePage />} />
              <Route path='/checkin' element={<Checkins />} />
              <Route path='/financialpassageiro' element={<FinancialPassageiro />} />
              <Route path='/contractform' element={<ContractForm />} />
              <Route path='/avaliacoes' element={<AvaliacaoPage />}/>
            </Route>
          </Route>        
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);