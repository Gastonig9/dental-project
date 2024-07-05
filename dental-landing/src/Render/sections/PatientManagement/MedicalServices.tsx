import { useState } from "react";
import { usePatientContext } from "../../pages/contexts/patientContext";
import Odontogram from "../../components/PatientManagement/Odontogram";
import { ToothDetail } from "../../../types/dtos/Patient/NewPatient.type";

const MedicalServices = () => {
  const { patientData, setPatientData } = usePatientContext();
  const [toothNumber, setToothNumber] = useState<number>(0);
  const [toothPosition, setToothPosition] = useState<string>("center");
  const [toothReference, setToothReference] = useState<string>("");

  const handleAddToothDetail = () => {
    if (!patientData) return;
    const updatedTeeth = JSON.parse(
      patientData.odontograma || "[]"
    ) as ToothDetail[];
    updatedTeeth.push({
      toothNumber,
      position: toothPosition,
      reference: toothReference,
    });
    setPatientData({
      ...patientData,
      odontograma: JSON.stringify(updatedTeeth),
    });
  };

  const handleResetTeeth = () => {
    if (!patientData) return;
    setPatientData({ ...patientData, odontograma: "[]" });
  };

  return (
    <div>
      <h2>Medical Services</h2>
      <div>
        <label>Diente Número:</label>
        <input
          type="number"
          value={toothNumber}
          onChange={(e) => setToothNumber(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Parte del Diente:</label>
        <select
          value={toothPosition}
          onChange={(e) => setToothPosition(e.target.value)}
        >
          <option value="center">Centro</option>
          <option value="top">Arriba</option>
          <option value="bottom">Abajo</option>
          <option value="left">Izquierda</option>
          <option value="right">Derecha</option>
        </select>
      </div>
      <div>
        <label>Referencia del Diente:</label>
        <select
          value={toothReference}
          onChange={(e) => setToothReference(e.target.value)}
        >
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
      <button onClick={handleAddToothDetail}>Agregar Detalle de Diente</button>
      <button onClick={handleResetTeeth}>Resetear Dientes</button>
      <Odontogram />
    </div>
  );
};

export default MedicalServices;
