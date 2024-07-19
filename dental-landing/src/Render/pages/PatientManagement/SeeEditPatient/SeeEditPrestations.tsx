import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  OdontogramType,
  Prestations,
} from "../../../../types/dtos/Patient/NewPatient.type";
import { getPrestationsByPatientId } from "../../../../Features/services/PatientManagement/PrestationsServices/GetPrestations";
import { Reference } from "../../../components/PatientManagement/Reference";
import Odontogram from "../../../components/PatientManagement/Odontogram";
import EditPrestationsForm from "../../../components/PatientManagement/SeeEditPrestations/EditPrestationForm";
import PrestationCards from "../../../components/PatientManagement/SeeEditPrestations/PrestationCard";
import "../../../components/PatientManagement/Odontogram.css";
import "./Card.css";

const SeeEditPrestations = () => {
  const [odontogramData, setOdontogramData] = useState<OdontogramType[]>([]);
  const { id } = useParams<{ id: string }>();
  const patientId = parseInt(id || "0", 10);

  const [prestations, setPrestations] = useState<Prestations[]>([]);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const fetchedPrestations = await getPrestationsByPatientId(patientId);
        setPrestations(fetchedPrestations);
        if (fetchedPrestations.length > 0) {
          setOdontogramData(
            fetchedPrestations[fetchedPrestations.length - 1].odontogram
          );
        }
      } catch (error) {
        console.error("Error fetching prestations:", error);
      }
    };

    fetchPrestations();
  }, [editMode, patientId]);

  return (
    <main className="flex mt-[20px] poppins-regular text-[16px] gap-4">
      <section className="relative">
        <Odontogram odontogramData={odontogramData} />
        <Reference />
      </section>
      <section className="relative h-[600px]">
        {editMode ? (
          <EditPrestationsForm
            odontogramData={odontogramData}
            setOdontogramData={setOdontogramData}
            setEditMode={setEditMode}
            patientId={patientId}
          />
        ) : (
          <>
            <PrestationCards prestations={prestations} />
            <div className="absolute right-[77px] bottom-0">
              <button
                className="bg-acento poppins-semibold py-3 px-3 rounded-[10px]"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                Agregar nueva prestación
              </button>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default SeeEditPrestations;
