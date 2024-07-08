import { userRoles } from '../../../constants';

export interface RegisterRequestDto {
  email: string;
  password: string;
  username: string;
  fullname: string;
  role_name: (typeof userRoles)[keyof typeof userRoles];
}
