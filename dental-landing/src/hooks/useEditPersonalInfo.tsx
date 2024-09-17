/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { patientServices } from "../services";
import { useForm } from "react-hook-form";

export const useEditPersonalInfo = () => {
  const { id } = useParams();
  const [, setPatientInfo] = useState({});
  const { register, handleSubmit, setValue } = useForm();
  const [allowEdition, setAllowEdition] = useState(false);

  useEffect(() => {
    patientServices.getPatient(id)
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

      const response = await patientServices.updatePatient(id, data);
      setPatientInfo(response.data);
      Swal.fire({
        title: "Guardado",
        text: "Información personal guardada con éxito.",
        icon: "success",
      });
    } catch (error) {
      const text = "Ocurrió un error al guardar la información.";
      const title = "Error";
      Swal.fire({
        title,
        text,
        icon: "error",
      });
    }
  };
  return {
    onSubmit,
    handleSubmit,
    register,
    setAllowEdition,
    allowEdition
  };
};
