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
      
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
