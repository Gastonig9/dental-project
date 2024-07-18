import React, { useState } from "react";
import {
  OdontogramType,
  Prestations,
} from "../../../types/dtos/Patient/NewPatient.type";
import { addPrestation } from "../../../Features/services/PatientManagement/PrestationsServices/PostPrestations";
import { usePatientContext } from "../../pages/contexts/patientContext";
import Swal from "sweetalert2";
import "./Odontogram.css";
import { OdontogramForm } from "./OdontogramForm";

interface PrestationFormProps {
  odontogramData: OdontogramType[];
  setOdontogramData: React.Dispatch<React.SetStateAction<OdontogramType[]>>;
}

export const PrestationForm: React.FC<PrestationFormProps> = ({
  odontogramData,
  setOdontogramData,
}) => {
  const { patientData, setPatientData } = usePatientContext();
  const patientId = patientData?.id;

  const getCurrentDate = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [prestationData, setPrestationData] = useState({
    date: getCurrentDate(),
    code: "",
    observations: "",
    state: "PENDING",
  });

  // Maneja cambios en el formulario de prestaciones
  const handlePrestationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPrestationData({
      ...prestationData,
      [e.target.name]: e.target.value,
    });
    console.log("PrestationData: ", prestationData);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientId) {
      Swal.fire({
        title: "Error",
        text: "Asegúrate de crear una ficha médica.",
        icon: "error",
      });
      return;
    }

    const newPrestation: Prestations = {
      patientId: patientId,
      date: prestationData.date,
      code: prestationData.code,
      state: prestationData.state,
      observations: prestationData.observations,
      odontogram: odontogramData,
    };

    try {
      // Usar axios con PrestationsServices
      await addPrestation(newPrestation, patientId);
      console.log("Prestation info saved:", newPrestation);

      // Verifica si prestations está definido, si no, inicializa como un array vacío
      const updatedPrestations = patientData?.prestations
        ? patientData.prestations
        : [];

      // Actualiza el contexto del paciente con los nuevos datos de prestaciones
      if (patientData) {
        setPatientData({
          ...patientData,
          prestations: [...updatedPrestations, newPrestation],
        });
      }

      // Limpiar formularios
      // setPrestationData({ date: "", code: "", observations: "" });
      // setOdontogramData([]);

      Swal.fire({
        title: "Agregado",
        text: "Se han agregado prestaciones de manera correcta.",
        icon: "success",
      });
    } catch (error) {
      let errorMessage =
        "No se han podido agregar correctamente, por favor intente de nuevo.";
      if (error instanceof Error) {
        console.error("Error al agregar prestación:", error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        console.error(
          "Error al agregar prestación:",
          (error as any).response.data
        );
        errorMessage = (error as any).response.data.message || errorMessage;
      } else {
        console.error("Error al agregar prestación:", error);
      }
      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-col gap-1 mt-2 absolute top-[-10px]"
    >
      <div>
        <div className="flex flex-col">
          <label htmlFor="date">Fecha</label>
          <input
            className="inputs"
            type="date"
            id="date"
            name="date"
            value={prestationData.date}
            onChange={handlePrestationChange}
            required
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="code">Código</label>
          <input
            className="inputs"
            type="text"
            id="code"
            name="code"
            value={prestationData.code}
            onChange={handlePrestationChange}
          />
        </div>
      </div>
      <div>
        <div className="flex flex-col">
          <label htmlFor="observations">Observaciones</label>
          <textarea
            className="inputs h-[132px] block resize-none overflow-hidden"
            id="observations"
            name="observations"
            rows={4}
            value={prestationData.observations}
            onChange={handlePrestationChange}
          />
        </div>
      </div>

      {/* <h2>Datos del Odontograma</h2> */}
      <OdontogramForm
        odontogramData={odontogramData}
        setOdontogramData={setOdontogramData}
      />
      <div className="flex justify-end">
        <button
          className="bg-acento poppins-medium py-2 px-4 rounded-[8px]"
          type="submit"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
