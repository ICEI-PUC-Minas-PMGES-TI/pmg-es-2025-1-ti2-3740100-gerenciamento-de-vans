import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//pages import
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme appearance="dark" >
      <BrowserRouter>
      <Routes>
       <Route path='/' element={<App />}/>
       <Route path='/login' element={<LoginPage />}/>
       <Route path='/register' element={<RegisterPage />}/>
       <Route path='/forgotpassword' element={<ForgotPasswordPage />}/>
      
      </Routes>
   
    </BrowserRouter>
    </Theme>
  </StrictMode>,
)
