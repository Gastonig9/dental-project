import { Dentist } from '../dtos/dentist/dentist.type';
import { Patient } from '../dtos/Patient/NewPatient.type';
// import { Patient } from '../dtos/Patient/create-patient.type';

export interface SearchPatientInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredPatients: Patient[];
  handlePatientSelected: (patient: Patient) => void;
}

export interface SelectInputProps {
  titleSelect: string;
  id: string;
  options: string[] | Dentist[];
  selectDentist?: (dentist: Dentist) => void;
  selectReason?: (reason: string) => void;
  mtInput?: string;
}
