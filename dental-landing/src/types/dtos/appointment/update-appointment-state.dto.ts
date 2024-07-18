export interface UpdateAppointmentState {
    appointmentId: number
    state: "CANCEL" | "REALIZED"
}