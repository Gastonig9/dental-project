export enum EnumInfoBoolean {
    SI = 'SI',
    NO = 'NO',
    SIN_INFORMACION = 'SIN_INFORMACION',
}

export interface PatientFormat {
    patientId: number;
    someDisease: string;
    someTreatment: string;
    consumeMedicaments: string;
    allergyMedicament: string;
    operations: string;
    smokes: EnumInfoBoolean;
    pregnant: EnumInfoBoolean;
    attendance?: string;
    takeSomeMedication?: string;
    pains: EnumInfoBoolean;
    blowToTeeth?: string; //golpe en dientes
    dentalMobility: EnumInfoBoolean;
    swollenFace: EnumInfoBoolean; //cara inchada
    injuries: EnumInfoBoolean; //lesion tejidos blandos
    observations?: string;
}