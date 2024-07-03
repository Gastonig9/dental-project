import { usePatientContext } from "../../pages/contexts/patientContext";
import { ToothDetail } from "../../../types/dtos/Patient/NewPatient.type";

const Odontogram = () => {
  const { patientData } = usePatientContext();
  const odontograma: ToothDetail[] = JSON.parse(
    patientData?.odontograma || "[]"
  );

  return (
    <div>
      <h3>Odontograma</h3>
      <div>
        {odontograma.map((toothDetail, index) => (
          <div key={index}>
            <p>Diente: {toothDetail.toothNumber}</p>
            <p>Parte: {toothDetail.position}</p>
            <p>Referencia: {toothDetail.reference}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Odontogram;
