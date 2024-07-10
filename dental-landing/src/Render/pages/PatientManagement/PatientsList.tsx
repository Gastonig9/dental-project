import { useEffect, useState } from "react";
import Navbar from "../../components/Platform/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import axios from "axios";
import Spinner from "../../components/Platform/Spinner";
import { Link } from "react-router-dom";

interface PatientsModel {
  id: Number;
  name: String;
  surname: String;
  gender: String;
  pEmail: String;
  dni: Number;
  phone: Number;
  adress: String;
  appointments: [];
  medicalHistories: [];
}

const PatientsList = () => {
  const [data, setData] = useState<PatientsModel[]>([]);
  const [patients, setPatients] = useState<PatientsModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState('');
  const [inputDataMobile, setInputDataMobile] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/patient/get-patients`)
      .then((res) => {
        setData(res.data.patients);
        setPatients(res.data.patients);
        console.log(res.data.patients);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: any) => {
    setInputData(e.target.value);
  };
  const handleChangeMobile = (e: any) => {
    setInputDataMobile(e.target.value);
  };

  useEffect(() => {
    const arrayOfFoundNames = data.filter(
      (patient) =>
        patient.name.toLowerCase().indexOf(inputData.toLowerCase().trim()) >
          -1 ||
        patient.surname.toLowerCase().indexOf(inputData.toLowerCase().trim()) >
          -1
    );
    setPatients(arrayOfFoundNames);
  }, [inputData]);

  useEffect(() => {
    const arrayOfFoundNames = data.filter(
      (patient) =>
        patient.name
          .toLowerCase()
          .indexOf(inputDataMobile.toLowerCase().trim()) > -1 ||
        patient.surname
          .toLowerCase()
          .indexOf(inputDataMobile.toLowerCase().trim()) > -1
    );
    setPatients(arrayOfFoundNames);
  }, [inputDataMobile]);

  return (
    <>
      <Navbar />
      {/* mobile layout */}
      <main className="p-3 mt-[80px] lg:hidden">
        <section className="border-2 border-black rounded-xl p-2 bg-[#f5f5f5] ">
          {/* input */}
          <div className="flex border-2 rounded-[10px] items-center p-2 gap-2">
            <IoSearchSharp className="text-xl" />
            <input
              type="text"
              className="outline-none text-[13px] font-semibold bg-transparent"
              placeholder="Buscar paciente.."
              onChange={handleChangeMobile}
              value={inputDataMobile}
            />
          </div>

          {/* list */}

          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              {patients.length > 0}
              {patients.map((paciente, index) => (
                <div
                  key={index}
                  className="grid grid-cols-8 items-center justify-between bg-[#D9D9D9] py-4 px-2 rounded-[20px] sm:px-8">
                  <h3 className="text-[16px] font-semibold col-span-4">
                    {paciente.name} {paciente.surname}
                  </h3>
                  <h4 className="text-[11px] text-center col-span-2">
                    N° DNI: {String(paciente.dni)}{' '}
                  </h4>
                  <div className="flex items-center justify-end gap-2 col-span-2">
                    <Link
                      to={`/patient-management/seeEditPatient/${paciente.id}`}
                      className="bg-[#f5f5f5] p-2 rounded-lg ">
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>
              ))}

              <button className="text-[13px font-semibold rounded-[10px] bg-acento hover:bg-green-500 self-end p-2 mt-5">
                Agregar nuevo paciente
              </button>
            </div>
          )}
        </section>
      </main>

      {/* desktop layout */}
      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10 ">
        <section className="border-2 border-black bg-[#f5f5f5] rounded-[35px] max-w-[1594px] h-[826px]  shadow-2xl p-10 relative xxl:mx-auto z-2">
          {/* header */}
          <div className="grid newxl:grid-cols-12 gap-2 newxl:gap-0">
            {/* titles */}
            <div className="grid grid-cols-6 text-[19px] text-center font-bold order-2 newxl:order-1 newxl:col-span-9">
              <h3 className="col-span-3 lg:col-span-2 text-left pl-[140px] ">
                Nombre
              </h3>
              <h3 className="hidden xl:block lg:col-span-2 xl:pr-[120px] newxl:text-right newxl:pr-5 ">
                N° de DNI
              </h3>
              <h3 className="col-span-3 text-center pl-[70px] xl:text-left xl:col-span-2 xl:pl-0 newxl:text-right newxl:pr-7">
                N° Teléfono
              </h3>
            </div>
            {/* input */}
            <div className="flex border border-black rounded-[10px] items-center p-1 gap-2 order-1 newxl:order-2 newxl:col-span-3">
              <IoSearchSharp className="text-xl" />
              <input
                type="text"
                className="outline-none text-[19px] poppins font-bold bg-transparent"
                placeholder="Buscar.."
                onChange={handleChange}
                value={inputData}
              />
            </div>
          </div>

          {/* list of patients */}
          {loading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-y-[33px] mt-5 overflow-y-scroll h-[546px] ">
              {patients.map((paciente) => (
                <div
                  key={String(paciente.id)}
                  className="grid grid-cols-12 justify-between w-full ml-auto bg-[#D9D9D9] rounded-[20px] pl-[96px] py-9 pr-[48px] ">
                  <div className="grid col-span-10 grid-cols-2 items-center xl:grid-cols-6 text-[19px] font-bold flex ">
                    <h3 className="xl:col-span-2">
                      {paciente.name} {paciente.surname}
                    </h3>
                    <h3 className="hidden xl:block text-right xl:text-center xl:col-span-2">
                      {String(paciente.dni)}
                    </h3>
                    <h3 className="text-center xl:col-span-2">
                      {String(paciente.phone)}{' '}
                    </h3>
                  </div>

                  <div className="flex col-span-2 items-center gap-7 justify-end">
                    <Link
                      className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 xl:gap-[10]"
                      to={`/patient-management/seeEditPatient/${paciente.id}`}>
                      <p className="hidden newxl:block">Ver ficha médica</p>
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Link
            className="text[19px] bg-acento hover:bg-green-500 font-bold rounded-[10px] py-2 px-4 mt-[63px] absolute bottom-10 right-10"
            to="/patient-management/new-patient">
            Agregar nuevo paciente
          </Link>
        </section>
      </main>
    </>
  );
};

export default PatientsList;
