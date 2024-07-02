import { PathsType } from '../constants/paths/userPaths';
import { BaseServices } from './base-services';

export class AppointmentsServices extends BaseServices {
  constructor({ paths }: { paths: PathsType }) {
    super({ paths });
  }
}
