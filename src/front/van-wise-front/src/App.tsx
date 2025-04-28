import { Outlet } from 'react-router-dom';
import { Flex } from "@radix-ui/themes"; // Se estiver usando o Flex, ou remova caso não precise
import './App.css'



function App() {
  return (
    <div>
      <h1>Wise Vans</h1>
      {/* Aqui você pode colocar o Outlet, que vai renderizar as páginas de acordo com a rota */}
      <Outlet />
    </div>
  );
}


export default App;
