import React from "react";
import Navbar from "../../components/Platform/Navbar";
import { Calendar } from "../../components/Platform/Calendar";

const GestionTurnos = () => {
  return (
    <div>
      <Navbar />
      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10 justify-center">
        <Calendar />
      </main>
      <main className="p-3 mt-[80px] lg:hidden">
        <Calendar />
      </main>
    </div>
  );
};

export default GestionTurnos;
