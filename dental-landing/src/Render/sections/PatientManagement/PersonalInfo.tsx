import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { usePatientContext } from "../../pages/contexts/patientContext";
import { Patient } from "../../../types/dtos/Patient/NewPatient.type";

export const PersonalInfo = () => {
  const { register, handleSubmit, setValue } = useForm<Patient>();
  const { patientData: patient, setPatientData: setPatient } =
    usePatientContext();

  useEffect(() => {
    if (patient) {
      for (const key in patient) {
        if (Object.prototype.hasOwnProperty.call(patient, key)) {
          setValue(key as keyof Patient, patient[key as keyof Patient]);
        }
      }
    }
  }, [patient, setValue]);

  const onSubmit = async (data: Patient) => {
    try {

      data.dni = Number(data.dni);
      data.age = Number(data.age);
      data.phone = Number(data.phone);


      const response = await axios.post("http://localhost:3000/patient", data);
      setPatient(response.data);
      Swal.fire({
        title: "Guardado",
        text: "Información personal guardada con éxito.",
        icon: "success",
      });
      console.log("Patient information saved:", response.data);
    } catch (error) {
      console.error("Error saving: ", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al guardar la información.",
        icon: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="poppins-semibold text-[19px] mb-4">Datos personales</p>
        <div className="mb-6 poppins-light text-[16px] space-y-4">
          <div className="flex space-x-9">
            <div className="flex flex-col">
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                {...register("name")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname">Apellido</label>
              <input
                id="surname"
                type="text"
                {...register("surname")}
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
                {...register("dni")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                type="number"
                {...register("age")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nationality">Nacionalidad</label>
              <input
                id="nationality"
                type="text"
                {...register("nationality")}
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
                {...register("gender")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthDate">Fecha De Nacimiento</label>
              <input
                id="birthDate"
                type="date"
                {...register("birthDate")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pEmail">Email</label>
              <input
                id="pEmail"
                type="text"
                {...register("pEmail")}
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
                {...register("street")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Número</label>
              <input
                id="phone"
                type="number"
                {...register("phone")}
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
                {...register("floor")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apartment">Dpto</label>
              <input
                id="apartment"
                type="text"
                {...register("apartment")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="locality">Localidad</label>
              <input
                id="locality"
                type="text"
                {...register("locality")}
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
                {...register("establishment")}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialWork">Obra Social</label>
              <input
                id="socialWork"
                type="text"
                {...register("socialWork")}
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
