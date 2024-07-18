import axios from "axios";
import { PRESTATION_PATHS } from "../../../../constants/paths/prestationsPatch";
import { token } from "../../../../localStorage/token";

const { GET_BY_PATIENT_ID } = PRESTATION_PATHS;

export const getPrestationsByPatientId = async (patientId: number) => {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }${GET_BY_PATIENT_ID}?patientId=${patientId}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token()}` },
    });

    return response.data;
  } catch (error) {
    console.error("Error in getPrestationsByPatientId:", error);

    throw error;
  }
};
