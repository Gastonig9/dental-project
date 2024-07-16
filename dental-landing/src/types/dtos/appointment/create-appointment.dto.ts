export interface CreateAppointment {
    results: string;
    dentistId: number | null;
    patientId: number | null;
    date: string;
    reason: string;
}