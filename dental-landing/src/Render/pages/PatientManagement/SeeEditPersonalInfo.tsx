import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { token } from '../../../localStorage/token';

export const SeeEditPersonalInfo = () => {
  const { id } = useParams();
  const [, setPatientInfo] = useState({});
  const [allowEdition, setAllowEdition] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/patient/${id}`,{ headers:{Authorization: `Bearer ${token()}`}})
      .then((res) => {
        setPatientInfo(res.data);
        const patient = res.data;
        for (const key in patient) {
          if (Object.prototype.hasOwnProperty.call(patient, key)) {
            setValue(key, patient[key]);
          }
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, [id, setValue]);

  const onSubmit = async (data: any) => {
    try {
      data.dni = Number(data.dni);
      data.age = Number(data.age);
      data.addressNumber = Number(data.addressNumber);

      console.log('DATA', data);
      const { appointments, medicalHistories, ...rest } = data;
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/patient/${id}`,
        rest,
        { headers: { Authorization: `Bearer ${token()}` } }
      );
      setPatientInfo(response.data);
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
              <label htmlFor="name">Nombre</label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname">Apellido</label>
              <input
                id="surname"
                type="text"
                {...register('surname')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Teléfono</label>
              <input
                id="phone"
                type="text"
                {...register('phone')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="dni">DNI</label>
              <input
                id="dni"
                type="number"
                {...register('dni')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="age">Edad</label>
              <input
                id="age"
                type="number"
                {...register('age')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="nationality">Nacionalidad</label>
              <input
                id="nationality"
                type="text"
                {...register('nationality')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
          </div>
          <div className="block lg:flex space-x-0 space-y-2 lg:space-x-9 lg:space-y-0">
            <div className="flex flex-col">
              <label htmlFor="gender">Género</label>
              <select
                id="gender"
                {...register("gender", { required: "El género es obligatorio" })}
                className= "gender-input-select-style"
                disabled={!allowEdition}
              >
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="Otro">Otro</option>
              </select>
              
            </div>
            <div className="flex flex-col">
              <label htmlFor="birthDate">Fecha De Nacimiento</label>
              <input
                id="birthDate"
                type="date"
                {...register('birthDate')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="pEmail">Email</label>
              <input
                id="pEmail"
                type="text"
                {...register('pEmail')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
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
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="addressNumber">Número</label>
              <input
                id="addressNumber"
                type="number"
                {...register('addressNumber')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
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
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="apartment">Dpto</label>
              <input
                id="apartment"
                type="text"
                {...register('apartment')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="locality">Localidad</label>
              <input
                id="locality"
                type="text"
                {...register('locality')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
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
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="socialWork">Obra Social</label>
              <input
                id="socialWork"
                type="text"
                {...register('socialWork')}
                className={`personalInfo-input-style ${
                  !allowEdition ? 'bg-white' : ''
                }`}
                readOnly={!allowEdition}
              />
            </div>
          </div>
        </div>
        <div className="flex mt-6 gap-3 justify-center lg:justify-end">
          <button
            className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]"
            type="button"
            onClick={() => setAllowEdition(!allowEdition)}>
            {!allowEdition ? 'Activar Edición' : 'Desactivar Edición'}
          </button>
          <button className="bg-acento poppins-semibold py-2 px-4 rounded-[8px]">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
