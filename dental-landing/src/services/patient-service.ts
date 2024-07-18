/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { PATIENT_PATHS } from '../constants';
import { token } from '../localStorage/token';

export class PatientService {
  private baseURL: string = '';
  private paths = PATIENT_PATHS;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  async getPatients() {
    const response = await axios.get(
      `${this.baseURL}${this.paths.GET_ALL}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }
}
