import React, { useState } from "react";

import { Prestacion } from "../../../types/dtos/Patient/NewPatient.type";
import { usePatientContext } from "../../pages/contexts/patientContext";
import Odontogram from "../../components/PatientManagement/Odontogram";

const MedicalServices: React.FC = () => {
  const { patientData, setPatientData } = usePatientContext();
  const [form, setForm] = useState<Prestacion>({
    date: "",
    observation: "",
    code: "",
    specialty: "",
    teeth: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientData) {
      setPatientData((prevData: any) => ({
        ...prevData,
        services: [...(prevData?.services || []), form],
      }));
    }
    // Reset form
    setForm({
      date: "",
      observation: "",
      code: "",
      specialty: "",
      teeth: [],
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <label htmlFor="date">Fecha:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="observation">Observaciones:</label>
          <textarea
            id="observation"
            name="observation"
            value={form.observation}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="code">Código:</label>
          <input
            type="text"
            id="code"
            name="code"
            value={form.code}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <div>
          <label htmlFor="specialty">Especialidad:</label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={form.specialty}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Añadir Prestación
        </button>
      </form>
      <Odontogram />
    </div>
  );
};

export default MedicalServices;
