import { useState } from "react";
import { usePatientContext } from "../../pages/contexts/patientContext";
import { ToothDetail } from "../../../types/dtos/Patient/NewPatient.type";
import Odontogram from "../../components/PatientManagement/Odontogram";

const toothPositions = ["Arriba", "Abajo", "izquierda", "Derecha", "Centro"];
const toothReferences = [
  "Prestaciones Existentes",
  "Prestaciones Requeridas",
  "Diente ausente o a extraer",
  "Prótesis fija/removible",
  "Corona",
  "Sin Prestaciones",
];

const MedicalServices = () => {
  const { patientData, setPatientData } = usePatientContext();
  const [toothNumber, setToothNumber] = useState<number>(0);
  const [position, setPosition] = useState<string>("Centro");
  const [reference, setReference] = useState<string>("Sin Prestaciones");

  const handleAddToothDetail = () => {
    if (patientData) {
      const newDetail: ToothDetail = { toothNumber, position, reference };
      const updatedOdontograma = JSON.stringify([
        ...JSON.parse(patientData.odontograma || "[]"),
        newDetail,
      ]);
      setPatientData({ ...patientData, odontograma: updatedOdontograma });
    }
  };

  const handleResetOdontograma = () => {
    if (patientData) {
      setPatientData({ ...patientData, odontograma: JSON.stringify([]) });
    }
  };

  return (
    <div>
      <h2>Medical Services</h2>
      <div>
        <label>
          N# Diente:
          <input
            type="number"
            value={toothNumber}
            onChange={(e) => setToothNumber(parseInt(e.target.value))}
          />
        </label>
        <label>
            Sección:
          <select
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          >
            {toothPositions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
        </label>
        <label>
          Referencia:
          <select
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          >
            {toothReferences.map((ref) => (
              <option key={ref} value={ref}>
                {ref}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleAddToothDetail}>Agregar Prestación</button>
        <button onClick={handleResetOdontograma}>Reset</button>
      </div>
      <Odontogram />
    </div>
  );
};

export default MedicalServices;
