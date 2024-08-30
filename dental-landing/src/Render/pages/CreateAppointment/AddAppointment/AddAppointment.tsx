/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, GoBack } from "../../../components/UI";
import { SearchPatientInput, SelectInput, DateTimeInput, TimeInput } from ".";
import {
  usePatientSearch,
  useDentistSearch,
  useSendaDataAppointment,
} from "../../../../hooks";

export const AddAppointment = () => {
  // use this hook for the patient input managment
  const {
    filteredPatients,
    patientSelected,
    searchTerm,
    setSearchTerm,
    handlePatientSelected,
    setPatientSelected,
  } = usePatientSearch();
  // use this hook for the dentist input managment
  const { dentists, dentistSelected, handleDentistSelected } =
    useDentistSearch();
  // use this hook for the data appointment managment
  const {
    handleReasonChange,
    handleDateChange,
    handleTimeChange,
    handleCreateAppointment,
  } = useSendaDataAppointment(dentistSelected, patientSelected);

  return (
    <>
      <GoBack path="appointments" titleGoBack="Atras" />
      <div className="w-full flex justify-center">
        <div className="w-[90%] flex flex-col items-center rounded-[35px] bg-lightgray border border-[#424242] p-4 md:p-6">
          <h1 className="poppins-semibold text-[24px] md:text-[33px] mb-6">
            Agregar nuevo turno
          </h1>
          <div className="w-full flex flex-col lg:flex-row justify-evenly items-center gap-4">
            <SearchPatientInput
              searchTerm={searchTerm}
              setSearchTerm={(term) => {
                setSearchTerm(term);
                setPatientSelected(null);
              }}
              filteredPatients={filteredPatients}
              handlePatientSelected={handlePatientSelected}
            />
            <SelectInput
              id="profesional"
              options={dentists}
              selectDentist={handleDentistSelected}
              titleSelect="Seleccionar profesional"
            />
          </div>
          <div className="w-full flex flex-col justify-evenly items-center gap-4 mt-4">
            <DateTimeInput
              onDateChange={handleDateChange}
              title="Seleccionar fecha"
            />
            <div className="w-full flex flex-col lg:flex-row justify-evenly items-center gap-4 mt-4">
              <TimeInput onTimeChange={handleTimeChange} />
              <SelectInput
                id="consulta"
                options={["Arreglo", "Conducto", "Consulta de rutina"]}
                titleSelect="Tipo de consulta"
                selectReason={handleReasonChange}
              />
            </div>
          </div>
          <Button
            widthButton="w-full"
            justifyButton="center"
            titleButton="Agendar"
            isLink={false}
            marginTop="5"
            onAction={handleCreateAppointment}
          />
        </div>
      </div>
    </>
  );
};
