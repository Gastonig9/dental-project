import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Landing } from "../pages/Landing/Landing";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Landing /> } />
      <Route path="/login" element={ <Login /> } />
      <Route path="/dashboard" element={ <Dashboard/> } />
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
