import { usePatientContext } from "../../../pages/contexts/patientContext";
import { Patient } from "../../../../types/dtos/Patient/NewPatient.type";
import axios from "axios";

export const PersonalInfo = () => {
  const { patientData: patient, setPatientData: setPatient } =
    usePatientContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value } as Patient);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios
        .post("http://localhost:3000/patient", {
          name: "string",
          pEmail: "string",
          phone: 0,
          surname: "string",
          gender: "string",
          dni: 0,
        })
        .then((res) => {
          setPatient(res.data);
        });
      console.log("Patient information saved:", patient);
    } catch (error) {
      console.error("Error saving: ", error);
    }
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3000/patient", {
  //       age: 0,
  //       floor: "string",
  //       street: "string",
  //       nationality: "string",
  //       locality: "string",
  //       establishment: "string",
  //       socialWork: "string",
  //       apartment: "string",
  //       birthDate: "string",
  //       name: "string",
  //       adress: "string",
  //       pEmail: "string",
  //       phone: 0,
  //       surname: "string",
  //       gender: "string",
  //       dni: 0,
  //     });
  //     console.log("Patient information saved:", response.data);
  //     setPaciente(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error saving: ", error);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3000/patient", {
  //       age: paciente?.age,
  //       floor: paciente?.floor,
  //       street: paciente?.street,
  //       nationality: paciente?.nationality,
  //       locality: paciente?.locality,
  //       establishment: paciente?.establishment,
  //       socialWork: paciente?.socialWork,
  //       apartment: paciente?.apartment,
  //       birthDate: paciente?.birthDate,
  //       name: paciente?.name,
  //       adress: paciente?.adress,
  //       pEmail: paciente?.pEmail,
  //       phone: paciente?.phone,
  //       surname: paciente?.surname,
  //       gender: paciente?.gender,
  //       dni: paciente?.dni,
  //     });
  //     console.log("Patient information saved:", response.data);
  //     setPaciente(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error saving: ", error);
  //   }
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className="poppins-semibold text-[19px] mb-4">Datos personales</p>
        <div className="mb-6 poppins-light text-[16px] space-y-4">
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                name="name"
                value={patient?.name || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname">Apellido</label>
              <input
                id="surname"
                type="text"
                name="surname"
                value={patient?.surname || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="dni">DNI</label>
              <input
                id="dni"
                type="number"
                name="dni"
                value={patient?.dni || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                type="number"
                name="age"
                value={patient?.age || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nationality">Nacionalidad</label>
              <input
                id="nationality"
                type="text"
                name="nationality"
                value={patient?.nationality || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="gender">Género</label>
              <input
                id="gender"
                type="text"
                name="gender"
                value={patient?.gender || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthDate">Fecha De Nacimiento</label>
              <input
                id="birthDate"
                type="date"
                name="birthDate"
                value={patient?.birthDate || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pEmail">Email</label>
              <input
                id="pEmail"
                type="text"
                name="pEmail"
                value={patient?.pEmail || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
        </div>
        <p className="poppins-semibold text-[19px] mb-4">Domicilio</p>
        <div className="poppins-light text-[16px] space-y-4">
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="street">Calle</label>
              <input
                id="street"
                type="text"
                name="street"
                value={patient?.street || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Número</label>
              <input
                id="phone"
                type="number"
                name="phone"
                value={patient?.phone || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="floor">Piso</label>
              <input
                id="floor"
                type="text"
                name="floor"
                value={patient?.floor || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apartment">Dpto</label>
              <input
                id="apartment"
                type="text"
                name="apartment"
                value={patient?.apartment || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="locality">localidad</label>
              <input
                id="locality"
                type="text"
                name="locality"
                value={patient?.locality || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="establishment">Establecimiento</label>
              <input
                id="establishment"
                type="text"
                name="establishment"
                value={patient?.establishment || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialWork">Obra Social</label>
              <input
                id="socialWork"
                type="text"
                name="socialWork"
                value={patient?.socialWork || ""}
                onChange={handleChange}
                className="personalInfo-input-style"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
