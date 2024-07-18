/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DENTIST_PATHS } from '../constants';
import { token } from '../localStorage/token';

export class DentistService {
  private baseURL: string = '';
  private paths = DENTIST_PATHS;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  async getDentists() {
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
