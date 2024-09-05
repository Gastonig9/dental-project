/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import { PATIENT_PATHS } from '../constants';
import { token } from '../localStorage/token';
import { PatientFormat } from '../types/dtos/Patient/PatientFormat';

export class PatientService {
  private baseURL: string;
  private paths = PATIENT_PATHS;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  async getPatients(): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`${this.baseURL}${this.paths.GET_ALL}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching patients:", error);
      throw error;
    }
  }

  async getPatient(id: string | undefined): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.get(`${this.baseURL}${this.paths.GET_PATIENT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token()}`,
        },
      });
      return response;
    } catch (error) {
      console.error(`Error fetching patient with ID ${id}:`, error);
      throw error;
    }
  }

  async createRecord(patientInfo: PatientFormat): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(
        `${this.baseURL}${this.paths.CREATE_RECORD}`,
        patientInfo,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error creating record:", error);
      throw error;
    }
  }

  async updateRecord(id: string | undefined, data: any): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.put(
        `${this.baseURL}${this.paths.UPDATE_RECORD}/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(`Error updating record with ID ${id}:`, error);
      throw error;
    }
  }
}
