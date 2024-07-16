/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { APPOINTMENTS_PATHS } from '../constants';
import { token } from '../localStorage/token';
import { CreateAppointment } from '../types/dtos/appointment/create-appointment.dto';
import { UpdateAppointmentState } from '../types/dtos/appointment/update-appointment-state.dto';

export class AppointmentsServices {
  private baseURL: string = '';
  private paths = APPOINTMENTS_PATHS;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  async getAppointments() {
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

  async createAppointment(data: CreateAppointment) {
    const response = await axios.post(
      `${this.baseURL}${this.paths.CREATE_APPOINTMENT}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }

  async getByDentistAppointmentId(id: any) {
    const response = await axios.get(
      `${this.baseURL}${this.paths.GET_BY_DENTIST_ID}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }

  async changeAppointmentState(data: UpdateAppointmentState) {
    const response = await axios.put(
      `${this.baseURL}${this.paths.UPDATE_APPOINTMENT_STATE}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }

  async updateAppointment(appointmentId: string, newData: any) {
    const response = await axios.put(
      `${this.baseURL}${this.paths.UPDATE_APPOINTMENT}/${appointmentId}`,
      newData,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }
}
