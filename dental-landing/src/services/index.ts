import { BASE_URL } from '../constants';
import { AppointmentsServices } from './appointmens-services';
import { UserServices } from './user-services';

const userServices = new UserServices();

const appointmentsServices = new AppointmentsServices({
  baseURL: BASE_URL,
});

export { userServices, appointmentsServices };
