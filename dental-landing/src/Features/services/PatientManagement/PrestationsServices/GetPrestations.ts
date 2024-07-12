import axios from "axios";
import { PRESTATION_PATHS } from "../../../../constants";

const { GET_BY_PATIENT_ID } = PRESTATION_PATHS;

export const getPrestationsByPatientId = async (patientId: number) => {
  try {
    const url = `${
      import.meta.env.VITE_API_URL
    }${GET_BY_PATIENT_ID}?patientId=${patientId}`;

    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.error("Error in getPrestationsByPatientId:", error);

    throw error;
  }
};
