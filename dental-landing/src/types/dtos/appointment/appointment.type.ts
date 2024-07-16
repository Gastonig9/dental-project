/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Appointment {
    date: Date
    dentistId: number
    id?: number
    odontograma?: any
    patientId: number
    reason: string
    results: string
    state: 'PENDING' | 'CANCEL' | 'REALIZED'
}