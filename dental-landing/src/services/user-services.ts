import { USER_PATHS } from '../constants';
import { apiClient } from '../apiClient/axios';
import { CreateUserType } from '../types';

export class UserServices {
  private paths = USER_PATHS;

  async login({ email, password }: { email: string; password: string }) {
    const response = await apiClient.post(
      `${this.paths.LOGIN}`,
      {
        email,
        password,
      },
      {
        headers: {
          'Remove-Authorization': true,
        },
      }
    );
    return response;
  }

  async register(data: CreateUserType) {
    const response = await apiClient.post(`${this.paths.REGISTER}`, data);
    return response;
  }
}
