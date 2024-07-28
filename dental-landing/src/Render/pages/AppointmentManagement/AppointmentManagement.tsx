import Navbar from "../../components/Platform/Navbar";
import { Calendar } from "../../components/Platform/Calendar/Calendar";
import { Link } from "react-router-dom";

const AppointmentManagement = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div>
      <Navbar />
      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10 justify-center">
        <Calendar userData={userData} />
        {userData.role_name != "ASSOCIATED" && (
          <Link to={`/create-appointment`}>
            <div className="w-[85%] flex justify-end mt-[80px]">
              <button className="w-[250px] text[19px] bg-acento hover:bg-green-500 font-bold rounded-[10px] py-2 px-4">
                Agendar turno
              </button>
            </div>
          </Link>
        )}
      </main>
      <main className="p-3 mt-[80px] lg:hidden w-">
        <Calendar userData={userData} />
        {userData.role_name != "ASSOCIATED" && (
          <Link to={`/create-appointment`}>
            <div className="w-[85%] flex justify-center ">
              <button className="w-[200px] text[19px] bg-acento hover:bg-green-500 font-bold rounded-[10px] py-2 px-4 mt-8">
                Agendar turno
              </button>
            </div>
          </Link>
        )}
      </main>
    </div>
  );
};

export default AppointmentManagement;
