import { Appointment } from "../appointment/appointment.type"

export interface Dentist {
    id: number
    fullname: string
    notes: string
    appointments: Appointment[]
}