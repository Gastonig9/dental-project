import Navbar from "../../components/Platform/Navbar";
import { AddAppointment } from "../../components/Platform/AddAppointment/AddAppointment";

const CreateAppointment = () => {
  return (
    <>
      <Navbar />
      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10 justify-center">
        <AddAppointment />
      </main>
      <main className="p-3 mt-[80px] lg:hidden w-full">
        <AddAppointment />
      </main>
    </>
  );
};

export default CreateAppointment;
