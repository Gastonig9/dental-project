import { Appointment } from "../dtos/appointment/appointment.type";
import { Patient } from "../dtos/Patient/NewPatient.type";

export interface DataChartProps {
    dataForChart: Patient[]
}

export interface DataAppointmentsChartProps {
    dataAppointmentsForChart: Appointment[]
}