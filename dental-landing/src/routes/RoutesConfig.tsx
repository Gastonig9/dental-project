import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../Render/guards/PrivateRoute";
import {
  Reports,
  CreateUser,
  CreateAppointment,
  AppointmentManagement,
  UsersList,
  PatientsList,
  NewPatient,
  ResetPassword,
  ForgotPassword,
  SeeEditPatient,
  EditUserInfo,
  NotFound,
  Login,
  // Landing,
  Dashboard
} from "../Render/pages";

const RoutesConfig = () => (
  <Routes>
    {/* <Route path="/" element={<Landing />} /> */}
    <Route path="/" element={<Login />} />
    <Route path="/user/forgot-password" element={<ForgotPassword />} />
    <Route path="/user/reset-password" element={<ResetPassword />} />
    <Route path="/*" element={<NotFound />} />
    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/appointments" element={<AppointmentManagement />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/patient-management/new-patient" element={<NewPatient />} />
      <Route
        path="/patient-management/patients-list"
        element={<PatientsList />}
      />
      <Route
        path="/patient-management/seeEditPatient/:id"
        element={<SeeEditPatient />}
      />
      <Route path="/users-management/users-list" element={<UsersList />} />
      <Route path="/create-appointment" element={<CreateAppointment />} />
      <Route path="/user/create-user" element={<CreateUser />} />
      <Route path="/user-management/edit-user/:id" element={<EditUserInfo />} />
    </Route>
  </Routes>
);

export default RoutesConfig;
