import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import Swal from "sweetalert2";
import { usePatientContext } from "../../../Features/contexts/patientContext";
import { Patient } from "../../../types/dtos/Patient/NewPatient.type";
import { token } from "../../../localStorage/token";

export const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Patient>();
  const { patientData: patient, setPatientData: setPatient } =
    usePatientContext();

  const birthDate = watch("birthDate");
  const [maxDate, setMaxDate] = useState("");
  const [minDate, setMinDate] = useState("");

  // MAX AND MIN DATE FOR BIRTHDAY INPUT
  useEffect(() => {
    const today = new Date();
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 100);
    
    setMaxDate(today.toISOString().split('T')[0]);
    setMinDate(hundredYearsAgo.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (patient) {
      for (const key in patient) {
        if (Object.prototype.hasOwnProperty.call(patient, key)) {
          setValue(key as keyof Patient, patient[key as keyof Patient]);
        }
      }
    }
  }, [patient, setValue]);

  // AUTOFILL FOR AGE INPUTT
  useEffect(() => {
    if (birthDate) {
      const birth = new Date(birthDate);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const m = today.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        age--;
      }
      setValue("age", age > 0 ? age : 0);
    }
  }, [birthDate, setValue]);

  const onSubmit = async (data: Patient) => {
    try {
      data.dni = Number(data.dni);
      data.age = Number(data.age);
      data.addressNumber = Number(data.addressNumber);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient`,
        data,
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      setPatient(response.data);
      Swal.fire({
        title: "Guardado",
        text: "Información personal guardada con éxito.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error saving: ", error);
      let text = "Ocurrió un error al guardar la información.";
      let title = "Error";

      if (error instanceof AxiosError) {
        if (error?.response?.status === 409) {
          title = "Campo Repetido";
          text = error.response.data.message;
        }
      }
      Swal.fire({
        title,
        text,
        icon: "error",
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="poppins-semibold text-[19px] mb-4">Datos personales</p>
        <div className="mb-6 poppins-light text-[16px] space-y-4">
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="name">
                Nombre<span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                {...register("name", {
                  required: "El nombre es obligatorio",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "El nombre solo debe contener letras",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname">
                Apellido<span className="text-red-500">*</span>
              </label>
              <input
                id="surname"
                type="text"
                {...register("surname", {
                  required: "El apellido es obligatorio",
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "El apellido solo debe contener letras",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.surname && (
                <p className="text-red-500">{errors.surname.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">
                Teléfono<span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="text"
                {...register("phone", {
                  required: "El teléfono es obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El teléfono solo debe contener números",
                  },
                  minLength: {
                    value: 7,
                    message: "El teléfono debe tener al menos 7 dígitos",
                  },
                  maxLength: {
                    value: 15,
                    message: "El teléfono no puede tener más de 15 dígitos",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="dni">
                DNI<span className="text-red-500">*</span>
              </label>
              <input
                id="dni"
                type="number"
                min={0}
                {...register("dni", {
                  required: "El DNI es obligatorio",
                  validate: {
                    length: (value) =>
                      (String(value).length >= 7 &&
                        String(value).length <= 10) ||
                      "El DNI debe tener entre 7 y 10 dígitos",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.dni && (
                <p className="text-red-500">{errors.dni.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">
                Edad<span className="text-red-500">*</span>
              </label>
              <input
                id="age"
                type="number"
                min={0}
                max={100}
                {...register("age", {
                  required: "La edad es obligatoria",
                  validate: {
                    length: (value) =>
                      String(value).length <= 3 ||
                      "La edad no puede tener más de 3 dígitos",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.age && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="nationality">Nacionalidad</label>
              <input
                id="nationality"
                type="text"
                {...register("nationality", {
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "La nacionalidad solo debe contener letras",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.nationality && (
                <p className="text-red-500">{errors.nationality.message}</p>
              )}
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="gender">
                Género<span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                {...register("gender", {
                  required: "El género es obligatorio",
                })}
                className="gender-input-select-style"
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthDate">
                Fecha De Nacimiento<span className="text-red-500">*</span>
              </label>
              <input
                id="birthDate"
                type="date"
                max={maxDate}
                {...register("birthDate", {
                  required: "La fecha de nacimiento es obligatoria",
                  validate: {
                    validDate: (value) => {
                      const date = new Date(value);
                      const today = new Date();
                      const hundredYearsAgo = new Date();
                      hundredYearsAgo.setFullYear(today.getFullYear() - 100);
                      if (date >= today) {
                        return "La fecha de nacimiento debe ser anterior a hoy";
                      }
                      if (date <= hundredYearsAgo) {
                        return "La fecha de es anterior a 100 años";
                      }
                      return true;
                    },
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.birthDate && (
                <p className="text-red-500">{errors.birthDate.message}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label htmlFor="pEmail">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                id="pEmail"
                type="text"
                {...register("pEmail", {
                  required: "El email es obligatorio",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Ingrese un email válido",
                  },
                })}
                className="personalInfo-input-style"
              />
              {errors.pEmail && (
                <p className="text-red-500">{errors.pEmail.message}</p>
              )}
            </div>
          </div>
        </div>

        <p className="poppins-semibold text-[19px] mb-4">Domicilio</p>
        <div className="poppins-light text-[16px] space-y-4">
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
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
              <label htmlFor="addressNumber">Número</label>
              <input
                id="addressNumber"
                type="number"
                {...register("addressNumber")}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
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
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
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
        <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end">
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
