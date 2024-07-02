import { PathsType } from '../constants/paths/userPaths';
import { BaseServices } from './base-services';

export class UserServices extends BaseServices<{
  id: number;
  email: string;
  username: string;
  fullname: string;
  password: string;
  resetPasswordToken: null;
  role_name: string;
}> {
  constructor({ paths }: { paths: PathsType }) {
    super({ paths });
  }
}
