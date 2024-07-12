import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  OdontogramType,
  Prestations,
} from "../../../../types/dtos/Patient/NewPatient.type";
import { getPrestationsByPatientId } from "../../../../Features/services/PatientManagement/PrestationsServices/GetPrestations";
import Odontogram from "../../../components/PatientManagement/Odontogram";
import "../../../components/PatientManagement/Odontogram.css";
import "./Card.css";
import { FaCircle } from "react-icons/fa6";

const SeeEditPrestations = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = parseInt(id || "0", 10);

  const [prestations, setPrestations] = useState<Prestations[]>([]);
  const [selectedPrestation, setSelectedPrestation] =
    useState<Prestations | null>(null);
  const [odontogramData, setOdontogramData] = useState<OdontogramType[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const fetchedPrestations = await getPrestationsByPatientId(patientId);
        console.log("Fetched prestations: ", fetchedPrestations); // Verificar la respuesta
        setPrestations(fetchedPrestations);
        if (fetchedPrestations.length > 0) {
          setSelectedPrestation(fetchedPrestations);
          setOdontogramData(
            fetchedPrestations[fetchedPrestations.length - 1].odontogram
          );
        }
      } catch (error) {
        console.error("Error fetching prestations:", error);
      }
    };

    fetchPrestations();
  }, [patientId]);

  const handlePrestationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedPrestation) {
      setSelectedPrestation({
        ...selectedPrestation,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleOdontogramChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedOdontogramData = odontogramData.map((tooth, i) =>
      i === index
        ? { ...tooth, [name]: name === "toothNum" ? parseInt(value) : value }
        : tooth
    );
    setOdontogramData(updatedOdontogramData);
  };

  const addOdontogramField = () => {
    setOdontogramData([
      ...odontogramData,
      { toothNumber: 0, parts: [""], ref: "" },
    ]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí puedes implementar la lógica para actualizar la prestación
  };

  return (
    <main className="flex mt-[20px] poppins-regular text-[16px] gap-10">
      <section className="relative">
        <Odontogram odontogramData={odontogramData} />
        <div className="py-[15px] pl-[15px] text-[12px] border-black border-[1px] h-[216px] w-[211px] rounded-[30px] absolute left-[37.9%] mt-[40px]">
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

      <section className="relative">
        <div className="card-stick"></div>
        {!editMode ? (
          <section className="flex-col gap-4 max-h-[500px]">
            {prestations.map((prestation) => (
              <div key={prestation.id} className="card card-content">
                <div className="item">
                  <p className="item-title">Fecha</p>
                  <p className="poppins-semibold text-[16px]">
                    {prestation.date}
                  </p>
                </div>
                <div className="item">
                  <p className="item-title">Código</p>
                  <p className="poppins-semibold text-[16px]">
                    {prestation.code}
                  </p>
                </div>
                <div className="item">
                  <p className="item-title">Observaciones</p>
                  <p className="poppins-semibold text-[16px]">
                    {prestation.observations}
                  </p>
                </div>
                <p className="item item-title">{prestation.state}</p>
              </div>
            ))}
            <button
              className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
              onClick={() => setEditMode(true)}
            >
              Activar Edición
            </button>
          </section>
        ) : (
          <section>
            <form onSubmit={handleSubmit} className="flex-col gap-1 mt-2">
              <div>
                <div className="flex flex-col">
                  <label htmlFor="date">Fecha</label>
                  <input
                    className="inputs"
                    type="date"
                    id="date"
                    name="date"
                    value={selectedPrestation?.date || ""}
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
                    value={selectedPrestation?.code || ""}
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
                    value={selectedPrestation?.observations || ""}
                    onChange={handlePrestationChange}
                  />
                </div>
              </div>
              <div className="pt-1">
                <div className="flex justify-end">
                  <button
                    className="bg-acento poppins-semibold py-2 px-4 rounded-[8px] flex"
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
                          id={`parts-${index}`}
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
                  Guardar Cambios
                </button>
                <button
                  className="bg-secondary poppins-semibold py-2 px-4 rounded-[8px] ml-2"
                  type="button"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
    </main>
  );
};

export default SeeEditPrestations;
