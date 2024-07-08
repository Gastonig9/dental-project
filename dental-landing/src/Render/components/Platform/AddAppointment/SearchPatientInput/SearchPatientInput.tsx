import React from 'react';
import { SearchPatientInputProps } from '../../../../../types/props/add-appointment.props';

export const SearchPatientInput: React.FC<SearchPatientInputProps> = ({
  searchTerm,
  setSearchTerm,
  filteredPatients,
  handlePatientSelected,
}) => {
  return (
    <div className="w-full lg:w-[30%] rounded-[15px] bg-lightgray border border-[#424242] relative">
      <input
        type="text"
        id="buscar-paciente"
        className="w-full rounded-[15px] bg-lightgray p-4 focus:outline-none focus:ring-2 focus:ring-[#76ffa8] focus:border-[#76ffa8] text-[20px] md:text-[25px]"
        placeholder="Buscar paciente"
        value={searchTerm}
        autoComplete="off"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      {searchTerm && filteredPatients.length > 0 && (
        <div className="absolute top-full left-0 right-0 max-h-[200px] overflow-y-auto bg-white border border-[#424242] rounded-[15px] z-10">
          {filteredPatients.map((patient) => (
            <div
              key={patient.dni}
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handlePatientSelected(patient)}>
              {patient.name} {patient.surname}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
