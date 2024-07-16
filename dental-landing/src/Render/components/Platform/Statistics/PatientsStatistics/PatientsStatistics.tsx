import { useEffect, useState } from "react";
import Spinner from "../../Spinner";
import { PatientsByAgeChart } from "./PatientsByAgeChart/PatientsByAgeChart";
import { PatientsByGenderChart } from "./PatientsByGenderChart/PatientsByGenderChart";
import { PatientsByTreatmentChart } from "./PatientsByTreatmentChart/PatientsByTreatmentChart";
import { appointmentsServices, patientServices } from "../../../../../services";

export const PatientsStatistics = () => {
  const [data, setData] = useState([]);
  const [dataAppointments, setdataAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    patientServices
      .getPatients()
      .then((res) => {
        setData(res.data.patients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    appointmentsServices
      .getAppointments()
      .then((res) => {
        setdataAppointments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="flex flex-wrap justify-around items-center gap-7">
        <div className="w-full lg:w-[90%] rounded-[35px] p-3 bg-lightgray text-center">
          <h1 className="text-2xl  font-medium poppins-bold">
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
          <PatientsByAgeChart dataForChart={data} />
        </div>
        <div className="w-full lg:w-[30%] rounded-[35px] p-5 bg-lightgray text-center">
          <h1 className="text-2xl font-medium poppins-bold">
            Pacientes por género
          </h1>
          <p>Reporte de pacientes registrados por género</p>
          <PatientsByGenderChart dataForChart={data} />
        </div>
      </div>
    </>
  );
};
