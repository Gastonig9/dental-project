import { userRoles } from '../../../constants';

export interface UserAuthResponseDto {
  token: string;
  user: {
    email: string;
    username: string;
    fullname: string;
    resetPasswordToken: string;
    role_name: (typeof userRoles)[keyof typeof userRoles];
  };
}
