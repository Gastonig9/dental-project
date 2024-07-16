// MedicalServices.tsx
import React, { useState } from "react";
import { OdontogramType } from "../../../types/dtos/Patient/NewPatient.type";
import Odontogram from "../../components/PatientManagement/Odontogram";
import { Reference } from "../../components/PatientManagement/Reference";
import { PrestationForm } from "../../components/PatientManagement/PrestationForm";
import "../../components/PatientManagement/Odontogram.css";

const MedicalServices: React.FC = () => {
  const [odontogramData, setOdontogramData] = useState<OdontogramType[]>([]);

  return (
    <main className="flex mt-[20px] poppins-regular text-[16px] gap-10">
      <section className="relative">
        <Odontogram odontogramData={odontogramData} />
        <Reference />
      </section>

      <section className="relative">
        <PrestationForm
          odontogramData={odontogramData}
          setOdontogramData={setOdontogramData}
        />
      </section>
    </main>
  );
};

export default MedicalServices;
