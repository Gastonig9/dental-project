
import { Dashboard } from "../pages/Dashboard/Dashboard";
import ListadoPacientes from "../pages/PatientManagement/ListadoPacientes";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { NewPatient } from "../pages/PatientManagement/NewPatient";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Landing /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/dashboard" element={ <Dashboard/> } />
      <Route path="/patient-management/new-patient" element={ <NewPatient/> } />
      <Route path="/patient-management/patients-list" element={ <ListadoPacientes /> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
