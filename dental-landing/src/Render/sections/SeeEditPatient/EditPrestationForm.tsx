import React, { useState } from "react";
import {
  OdontogramType,
  Prestations,
} from "../../../types/dtos/Patient/NewPatient.type";
import { EditOdontogramForm } from "./EditOdontogramForm";
import { addPrestation } from "../../../Features/services/PatientManagement/PrestationsServices/PostPrestations";
import Swal from "sweetalert2";

const FDI_TEETH_NUMBERS = new Set([
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36,
  35, 34, 33, 32, 31, 48, 47, 46, 45, 44, 43, 42, 41, 51, 52, 53, 54, 55, 61,
  62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
]);
const VALID_PARTS = ["top", "left", "right", "bottom", "center"];
const VALID_REFS = [
  "Prestaciones Existentes",
  "Prestaciones Requeridas",
  "Diente ausente o a extraer",
  "Prótesis fija/removible",
  "Corona",
];

interface EditPrestationsFormProps {
  odontogramData: OdontogramType[];
  setOdontogramData: React.Dispatch<React.SetStateAction<OdontogramType[]>>;
  setEditMode: (editMode: boolean) => void;
  patientId: number;
}

const EditPrestationsForm: React.FC<EditPrestationsFormProps> = ({
  odontogramData,
  setOdontogramData,
  setEditMode,
  patientId,
}) => {
  const [prestationData, setPrestationData] = useState({
    date: "",
    code: "",
    observations: "",
    state: "PENDING",
  });

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
        text: "Falta el ID del paciente.",
        icon: "error",
      });
      return;
    }

    // Validación fecha
    if (!prestationData.date) {
      Swal.fire({
        title: "Error",
        text: "Debes añadir una fecha.",
        icon: "error",
      });
      return;
    }
    // Validación odontograma vacio
    if (odontogramData.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos de la prestación deben estar completos.",
        icon: "error",
      });
      return;
    }

    // Validar datos del odontograma
    for (const tooth of odontogramData) {
      if (!FDI_TEETH_NUMBERS.has(tooth.toothNumber)) {
        Swal.fire({
          title: "Error",
          text: `El número del diente ${tooth.toothNumber} no es válido.`,
          icon: "error",
        });
        return;
      }

      if (!tooth.parts.every((part) => part && VALID_PARTS.includes(part))) {
        Swal.fire({
          title: "Error",
          text: `Una o más partes del diente ${tooth.toothNumber} no son válidas.`,
          icon: "error",
        });
        return;
      }

      if (!VALID_REFS.includes(tooth.ref)) {
        Swal.fire({
          title: "Error",
          text: `La referencia para el diente ${tooth.toothNumber} no es válida.`,
          icon: "error",
        });
        return;
      }
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

      Swal.fire({
        title: "Agregado",
        text: "Se han agregado prestaciones de manera correcta.",
        icon: "success",
      });
      setEditMode(false);
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
            required
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
      {/* OdontogramForm */}
      <EditOdontogramForm
        odontogramData={odontogramData}
        setOdontogramData={setOdontogramData}
      />
      <div className="flex justify-between">
        <button
          className="bg-red-300 poppins-medium py-2 px-3 rounded-[8px] ml-2"
          type="button"
          onClick={() => setEditMode(false)}
        >
          Cancelar
        </button>
        <button
          className="bg-acento poppins-medium py-2 px-3 rounded-[8px]"
          type="submit"
          onClick={handleSubmit}
        >
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};

export default EditPrestationsForm;
