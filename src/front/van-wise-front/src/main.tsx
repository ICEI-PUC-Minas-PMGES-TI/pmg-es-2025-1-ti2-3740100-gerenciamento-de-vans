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
import Checkins from './pages/Checkins.tsx';
import RoutesPage from './pages/RoutesPage.tsx';
import MyRoutes from './pages/MyRoutes.tsx';



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
          <Route path='/' element={<App />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<ForgotPasswordPage />} />
          <Route path='/contractform' element={<ContractForm />} />
          <Route path='/homepage' element={<HomePage />} />
          <Route path='/mootoristahomepage' element={< MotoristaHomepage />} />
          <Route path='/routes/:routeId' element={<RoutesPage />} />
          <Route path='/myroutes' element={<MyRoutes />} />
          <Route path='/checkin' element={<Checkins />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
