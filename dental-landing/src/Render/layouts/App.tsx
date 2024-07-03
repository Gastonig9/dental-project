import { Dashboard } from "../pages/Dashboard/Dashboard";

import GestionTurnos from "../pages/GestionTurnos/GestionTurnos";
import { Landing } from "../pages/Landing/Landing";
import { Login } from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { NewPatient } from "../pages/PatientManagement/NewPatient";
import PatientsList from "../pages/PatientManagement/PatientsList";
import { SeeEditPatient } from "../pages/PatientManagement/SeeEditPatient";
import { ForgotPassword } from "../pages/Login/ForgotPassword";
import { ResetPassword } from "../pages/Login/ResetPassword";
import { AuthProvider } from "../pages/contexts/AuthContext";
import PrivateRoute from "../guards/PrivateRoute";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<NotFound />} />
          <Route path="/patient-management/patients-list" element={ <PatientsList /> } />
          <Route path="/patient-management/seeEditPatient/:id" element={ <SeeEditPatient /> } />
        {/* <Route path="/patient-management/new-patient" element={<NewPatient />}/> */}
        {/* PROTECTED ROUTES */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/appointments" element={<GestionTurnos />} />
          <Route path="/patient-management/new-patient" element={<NewPatient />}/>
        </Route>
        {/* PROTECTED ROUTES */}
      </Routes>
    </AuthProvider>
  );
}

export default App;
