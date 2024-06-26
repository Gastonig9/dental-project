import { Landing } from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";
import { PatientManage } from "../pages/PatientManagement/PatientManage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/patients" element={<PatientManage />} />
    </Routes>
  );
}

export default App;
