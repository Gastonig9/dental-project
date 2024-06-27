import Example from "../pages/Example/Example";
import Example2 from "../pages/Example2/Example2";
import Example3 from "../pages/Example3/Example3";
import ListadoPacientes from "../pages/GestionDePacientes/ListadoPacientes";
import { Landing } from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Landing /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/*" element={ <NotFound /> } />
      <Route path="/gestionDePacientes/listadoPacientes" element={ <ListadoPacientes /> } />
    </Routes>
  );
}

export default App;
