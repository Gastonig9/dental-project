import { PatientsByAgeChart, PatientsByGenderChart, PatientsByTreatmentChart } from "..";
import Spinner from "../../../../components/Platform/Spinner";
import { useAppointmentSearch, usePatientSearch } from "../../../../../hooks";

export const PatientsStatistics = () => {
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { patients, loading: loadingPatients } = usePatientSearch();
  const { appointments: dataAppointments, loading: loadingAppointments  } = useAppointmentSearch(userData)

  if (loadingPatients || loadingAppointments) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-wrap justify-around items-center gap-7">
      <div className="w-full lg:w-[90%] rounded-[35px] p-3 bg-lightgray text-center">
        <h1 className="text-2xl font-medium poppins-bold">
          Pacientes por tratamiento
        </h1>
        <p>Reporte de pacientes por tratamiento</p>
        <PatientsByTreatmentChart
          dataAppointmentsForChart={dataAppointments}
        />
      </div>
      <div className="w-full lg:w-[30%] rounded-[35px] p-5 bg-lightgray text-center">
        <h1 className="text-2xl font-medium poppins-bold">Rango de edad</h1>
        <p>Reporte de pacientes por rango de edad </p>
        <PatientsByAgeChart dataForChart={patients} />
      </div>
      <div className="w-full lg:w-[30%] rounded-[35px] p-5 bg-lightgray text-center">
        <h1 className="text-2xl font-medium poppins-bold">
          Pacientes por género
        </h1>
        <p>Reporte de pacientes registrados por género</p>
        <PatientsByGenderChart dataForChart={patients} />
      </div>
    </div>
  );
};
