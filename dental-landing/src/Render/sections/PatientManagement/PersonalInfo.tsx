import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { usePatientContext } from '../../pages/contexts/patientContext';
import { Patient } from '../../../types/dtos/Patient/NewPatient.type';
import { token } from '../../../localStorage/token';

export const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Patient>();
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
      data.addressNumber = Number(data.addressNumber);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient`,
        data,
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      setPatient(response.data);
      Swal.fire({
        title: 'Guardado',
        text: 'Información personal guardada con éxito.',
        icon: 'success',
      });
      console.log('Patient information saved:', response.data);
    } catch (error) {
      console.error('Error saving: ', error);
      let text = 'Ocurrió un error al guardar la información.';
      let title = 'Error';

      if (error instanceof AxiosError) {
        if (error?.response?.status === 409) {
          title = 'Campo Repetido';
          text = error.response.data.message;
        }
      }
      Swal.fire({
        title,
        text,
        icon: 'error',
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
                {...register('name', { required: 'El nombre es obligatorio' })}
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
                {...register('surname', {
                  required: 'El apellido es obligatorio',
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
                {...register('phone', {
                  required: 'El teléfono es obligatorio',
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
                {...register('dni', { required: 'El DNI es obligatorio' })}
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
                {...register('age', { required: 'La edad es obligatoria' })}
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
                {...register('nationality')}
                className="personalInfo-input-style"
              />
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="gender">
                Género<span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                {...register('gender', {
                  required: 'El género es obligatorio',
                })}
                className="gender-input-select-style">
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
                {...register('birthDate', {
                  required: 'La fecha de nacimiento es obligatoria',
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
                {...register('pEmail', { required: 'El email es obligatorio' })}
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
                {...register('street')}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressNumber">Número</label>
              <input
                id="addressNumber"
                type="number"
                {...register('addressNumber')}
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
                {...register('floor')}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apartment">Dpto</label>
              <input
                id="apartment"
                type="text"
                {...register('apartment')}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="locality">Localidad</label>
              <input
                id="locality"
                type="text"
                {...register('locality')}
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
                {...register('establishment')}
                className="personalInfo-input-style"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialWork">Obra Social</label>
              <input
                id="socialWork"
                type="text"
                {...register('socialWork')}
                className="personalInfo-input-style"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 lg:mt-0 flex justify-center lg:justify-end">
          <button
            type="submit"
            className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
