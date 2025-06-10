import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DonoHomePage from './pages/DonoHomePage';
import MotoristaHomepage from './pages/MotoristaHomepage';
import AvaliacaoMotoristasPage from './pages/AvaliacaoMotoristasPage';
import AvaliarMotoristaPage from './pages/AvaliarMotoristaPage';

function App() {
  return (
    <Router>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dono-home" element={<DonoHomePage />} />
        <Route path="/motorista-home" element={<MotoristaHomepage />} />
        <Route path="/avaliacao-motoristas" element={<AvaliacaoMotoristasPage />} />
        <Route path="/avaliar-motorista/:id" element={<AvaliarMotoristaPage />} />
      </Routes>
    </Router>
  );
}

export default App;
