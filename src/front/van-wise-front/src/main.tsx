import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './components/ui/theme-provider.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages import
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';
import ContractForm from './pages/ContractForm.tsx';
import HomePage from './pages/HomePage.tsx';
import MotoristaHomepage from './pages/MotoristaHomepage.tsx';
import DonoHomePage from './pages/DonoHomePage.tsx';
import AvaliacaoMotoristasPage from './pages/AvaliacaoMotoristasPage';
import AvaliarMotoristaPage from './pages/AvaliarMotoristaPage';





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
       <Route path='/' element={<App />}/>
       <Route path='/login' element={<LoginPage />}/>
       <Route path='/register' element={<RegisterPage />}/>
       <Route path='/forgotpassword' element={<ForgotPasswordPage />}/>
       <Route path='/contractform' element={<ContractForm />}/>
       <Route path='/homepage' element={<HomePage />}/>
        <Route path='/MotoristaHomepage' element={<MotoristaHomepage />}/>
        <Route path='/DonoHomePage' element={<DonoHomePage />}/>
        <Route path='/avaliacao-motoristas' element={<AvaliacaoMotoristasPage />}/>
        <Route path='/avaliar-motorista/:id' element={<AvaliarMotoristaPage />}/>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
