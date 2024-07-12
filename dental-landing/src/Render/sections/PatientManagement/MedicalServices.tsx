import React, { useState } from "react";
import {
  Prestations,
  OdontogramType,
} from "../../../types/dtos/Patient/NewPatient.type";
import { usePatientContext } from "../../pages/contexts/patientContext";
import { addPrestation } from "../../../Features/services/PatientManagement/PrestationsServices/PrestationsServices";
import Odontogram from "../../components/PatientManagement/Odontogram";
import "../../components/PatientManagement/Odontogram.css";
import { FaCircle } from "react-icons/fa6";
import Swal from "sweetalert2";

const MedicalServices = () => {
  const { patientData, setPatientData } = usePatientContext();
  const patientId = patientData?.id;

  const [prestationData, setPrestationData] = useState({
    date: "",
    code: "",
    observations: "",
    state: "",
  });

  const [odontogramData, setOdontogramData] = useState<OdontogramType[]>([]);

  // Maneja cambios en el formulario de prestaciones
  const handlePrestationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrestationData({
      ...prestationData,
      [e.target.name]: e.target.value,
    });
    console.log("PrestationData: ", prestationData);
  };

  // Maneja cambios en los campos del odontograma
  const handleOdontogramChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newOdontogramData = [...odontogramData];
    newOdontogramData[index] = {
      ...newOdontogramData[index],
      [e.target.name]:
        e.target.name === "toothNum"
          ? parseInt(e.target.value)
          : e.target.value,
    };
    setOdontogramData(newOdontogramData);
    console.log(`handleOdontogramChange:`, odontogramData);
  };

  // Agrega un nuevo campo para el odontograma
  const addOdontogramField = () => {
    setOdontogramData([
      ...odontogramData,
      { toothNumber: 0, parts: [""], ref: "" },
    ]);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPrestation: Prestations = {
      date: prestationData.date,
      code: prestationData.code,
      state: prestationData.state,
      odontogram: odontogramData,
    };

    try {
      // Usar axios con PrestationsServices
      await addPrestation(newPrestation, patientId!);
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
      Swal.fire({
        title: "Error",
        text: "No se han podido agregar correctamente, por favor intente de nuevo.",
        icon: "error",
      });
      console.error("Error al agregar prestación:", error);
    }
  };

  return (
    <main className="flex mt-[20px] poppins-regular text-[16px] gap-10">
      <section className="relative">
        <Odontogram odontogramData={odontogramData} />
        <div className="flex-fow py-[15px] pl-[15px] text-[12px] border-black border-[1px] h-[216px] w-[211px] rounded-[30px] absolute left-[37.9%] mt-[40px]">
          <h2 className="text-[16px] poppins-semibold mb-3">Referencias</h2>
          <div className="flex gap-2 mb-3">
            <FaCircle fill="#ff0000" />
            Prestaciones Existentes
          </div>
          <div className="flex gap-2 mb-3">
            <FaCircle fill="#0000ff" />
            Prestaciones Requeridas
          </div>
          <div className="flex gap-2 mb-3">
            <FaCircle fill="#000000" />
            Diente ausente o a extraer
          </div>
          <div className="flex gap-2 mb-3">
            <FaCircle fill="#008000" />
            Prótesis fija/removible
          </div>
          <div className="flex gap-2">
            <FaCircle fill="#ffd700" />
            Corona
          </div>
        </div>
      </section>

      <section>
        <form onSubmit={handleSubmit} className="flex-col gap-1 mt-2">
          {/* <h2>Datos de Prestación</h2> */}
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
              <input
                className="inputs h-[132px] block resize-none overflow-hidden"
                type="text"
                id="observations"
                name="observations"
                value={prestationData.observations}
                onChange={handlePrestationChange}
              />
            </div>
          </div>

          {/* <h2>Datos del Odontograma</h2> */}
          <div className="pt-1 ">
            <div className="flex justify-end">
              <button
                className="bg-acento poppins-semibold py-2 px-4 rounded-[8px] flex "
                type="button"
                onClick={addOdontogramField}
              >
                Diente +
              </button>
            </div>
            <div className="mt-4 p-2 bg-[#f5f5f5] border border-[#424242] rounded-[8px] w-[290px] mb-2 max-h-[300px] overflow-y-auto">
              {odontogramData.map((tooth, index) => (
                <div key={index} className="mb-2 border-b-2 border-black">
                  <div className="mb-2">
                    <label
                      htmlFor={`toothNum-${index}`}
                      className="block text-sm font-medium"
                    >
                      No. Diente:
                    </label>
                    <input
                      type="number"
                      id={`toothNum-${index}`}
                      name="toothNum"
                      value={tooth.toothNumber}
                      onChange={(e) => handleOdontogramChange(index, e)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor={`part-${index}`}
                      className="block text-sm font-medium "
                    >
                      Parte del Diente:
                    </label>
                    <select
                      id={`part-${index}`}
                      name="part"
                      value={tooth.parts}
                      onChange={(e) => handleOdontogramChange(index, e)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="">Seleccione una parte</option>
                      <option value="top">Arriba</option>
                      <option value="bottom">Abajo</option>
                      <option value="left">Izquierda</option>
                      <option value="right">Derecha</option>
                      <option value="center">Centro</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor={`ref-${index}`}
                      className="block text-sm font-medium "
                    >
                      Prestación Dental:
                    </label>
                    <select
                      id={`ref-${index}`}
                      name="ref"
                      value={tooth.ref}
                      onChange={(e) => handleOdontogramChange(index, e)}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    >
                      <option value="">Seleccione una prestación</option>
                      <option value="Prestaciones Existentes">
                        Prestaciones Existentes
                      </option>
                      <option value="Prestaciones Requeridas">
                        Prestaciones Requeridas
                      </option>
                      <option value="Diente ausente o a extraer">
                        Diente ausente o a extraer
                      </option>
                      <option value="Prótesis fija/removible">
                        Prótesis fija/removible
                      </option>
                      <option value="Corona">Corona</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
              type="submit"
            >
              Guardar
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default MedicalServices;
