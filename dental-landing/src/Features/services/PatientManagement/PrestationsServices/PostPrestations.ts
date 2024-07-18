import axios from "axios";
import {
  PrestationRequest,
  Prestations,
} from "../../../../types/dtos/Patient/NewPatient.type";
import { PRESTATION_PATHS } from "../../../../constants/paths/prestationsPatch";
import { token } from "../../../../localStorage/token";
const { CREATE } = PRESTATION_PATHS;

export const addPrestation = async (
  prestationData: Prestations,
  patientId: number
) => {
  const requestData: PrestationRequest = {
    state: "PENDING", // or 'REALIZED'
    patientId: patientId,
    date: prestationData.date,
    code: prestationData.code,
    observations: prestationData.observations || "",
    odontogram: prestationData.odontogram.map((tooth) => ({
      toothNumber: tooth.toothNumber,
      parts: tooth.parts,
      ref: tooth.ref,
    })),
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}${CREATE}`,
      requestData,
      {
        headers: { Authorization: `Bearer ${token()}` },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred");
    }
  }
};
