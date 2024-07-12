import axios from "axios";
import {
  PrestationRequest,
  Prestations,
} from "../../../../types/dtos/Patient/NewPatient.type";
import { PRESTATION_PATHS } from "../../../../constants";
const { CREATE } = PRESTATION_PATHS;

export const addPrestation = async (
  prestationData: Prestations,
  patientId: number
) => {
  const requestData: PrestationRequest = {
    state: "PENDING", // or 'REALIZED'
    patientId: patientId!,
    date: prestationData.date,
    code: prestationData.code,
    observations: prestationData.observations || "",
    odontogram: prestationData.odontogram.map((tooth) => ({
      toothNumber: tooth.toothNum,
      parts: [tooth.part],
      ref: tooth.ref,
    })),
  };

  return await axios.post(
    `${import.meta.env.VITE_API_URL}${CREATE}`,
    requestData
  );
};
