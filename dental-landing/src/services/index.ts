import { APPOINTMENTS_PATHS } from '../constants/paths/appointments-paths';
import { USER_PATHS } from '../constants/paths/userPaths';
import { AppointmentsServices } from './appointmens-services';
import { UserServices } from './user-services';

const userServices = new UserServices({ paths: USER_PATHS });

const appointmentsServices = new AppointmentsServices({
  paths: APPOINTMENTS_PATHS,
});

export { userServices, appointmentsServices };
