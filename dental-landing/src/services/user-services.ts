import axios from "axios";
import { USER_PATHS } from "../constants";
import { CreateUserType } from "../types";
import { token } from "../localStorage/token";

export class UserServices {
  private paths = USER_PATHS;
  private baseURL: string;

  constructor({ baseURL }: { baseURL: string }) {
    this.baseURL = baseURL;
  }

  async login({ email, password }: { email: string; password: string }) {
    const response = await axios.post(
      `${this.baseURL}${this.paths.LOGIN}`,
      {
        email,
        password,
      }
    );
    return response;
  }
  async register(data: CreateUserType) {
    const response = await axios.post(
      `${this.baseURL}${this.paths.REGISTER}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token()}`
        },
      }
    );
    return response;
  }
}
