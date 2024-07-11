import { APPOINTMENTS_PATHS } from '../constants';

export class AppointmentsServices {
  private baseURL: string;
  private paths = APPOINTMENTS_PATHS;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }
}
