import { Dashboard } from "../pages/Dashboard/Dashboard";
import ListadoPacientes from "../pages/PatientManagement/ListadoPacientes";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { NewPatient } from "../pages/PatientManagement/NewPatient";
import { ForgotPassword } from "../pages/Login/ForgotPassword";
import UpdatePassword from "../pages/Login/UpdatePassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/reset-password" element={<UpdatePassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patient-management/new-patient" element={<NewPatient />} />
      <Route path="/*" element={<NotFound />} />
      <Route
        path="/gestionDePacientes/listadoPacientes"
        element={<ListadoPacientes />}
      />
      <Route
        path="/patient-management/patients-list"
        element={<ListadoPacientes />}
      />
    </Routes>
  );
}

export default App;
