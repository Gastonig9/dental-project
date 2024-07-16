import Navbar from "../../components/Platform/Navbar";
import { Calendar } from "../../components/Platform/Calendar/Calendar";
import { Button } from "../../components/UI/Button/Button";

const AppointmentManagement = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div>
      <Navbar />
      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10 justify-center">
        <Calendar userData={userData} />
      </main>
      <main className="p-3 mt-[80px] lg:hidden w-">
        <Calendar userData={userData} />
      </main>
      {userData.role_name != "ASSOCIATED" && (
        <Button
          justifyButton="center"
          titleButton="Agregar nuevo turno"
          widthButton="[80%]"
        />
      )}
    </div>
  );
};

export default AppointmentManagement;
