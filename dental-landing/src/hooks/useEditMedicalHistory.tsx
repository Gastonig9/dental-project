/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { PatientFormat, EnumInfoBoolean } from "../types/dtos/Patient/PatientFormat";
import { patientServices } from "../services";

export const useEditMedicalHistory = () => {
  const { id } = useParams();
  const [patientInfo, setPatientInfo] = useState<PatientFormat>({
    patientId: Number(id),
    someDisease: "",
    someTreatment: "",
    consumeMedicaments: "",
    allergyMedicament: "",
    operations: "",
    smokes: EnumInfoBoolean.SIN_INFORMACION,
    pregnant: EnumInfoBoolean.SIN_INFORMACION,
    attendance: "",
    takeSomeMedication: "",
    pains: EnumInfoBoolean.SIN_INFORMACION,
    blowToTeeth: "",
    dentalMobility: EnumInfoBoolean.SIN_INFORMACION,
    swollenFace: EnumInfoBoolean.SIN_INFORMACION,
    injuries: EnumInfoBoolean.SIN_INFORMACION,
    observations: "",
  });
  const [allowEdition, setAllowEdition] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const res = await patientServices.getPatient(id);

        if (!res.data.medicalHistories.length) {
          await patientServices.createRecord(patientInfo);
        }

        setPatientInfo(res.data.medicalHistories[res.data.medicalHistories.length - 1]);
      } catch (error) {
        Swal.fire(
          "Ocurrió un error",
          "Ocurrió un error al obtener la información del paciente.",
          "error"
        );
      }
    };

    fetchPatientData();
  }, [id]);

  useEffect(() => {
    if (patientInfo) {
      reset({
        someDisease: patientInfo.someDisease,
        someTreatment: patientInfo.someTreatment,
        consumeMedicaments: patientInfo.consumeMedicaments,
        allergyMedicament: patientInfo.allergyMedicament,
        operations: patientInfo.operations,
        smokes: patientInfo.smokes,
        pregnant: patientInfo.pregnant,
        attendance: patientInfo.attendance,
        takeSomeMedication: patientInfo.takeSomeMedication,
        pains: patientInfo.pains,
        blowToTeeth: patientInfo.blowToTeeth,
        dentalMobility: patientInfo.dentalMobility,
        swollenFace: patientInfo.swollenFace,
        injuries: patientInfo.injuries,
        observations: patientInfo.observations,
      });
    }
  }, [patientInfo]);

  const onSubmit = async (data: any) => {
    data.patientId = Number(id);

    try {
      await patientServices.updateRecord(id, data);
      Swal.fire({
        title: "Agregado",
        text: "Historia clínica agregada con éxito.",
        icon: "success",
      });
      setAllowEdition(false);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al actualizar la historia clínica.",
        icon: "error",
      });
    }
  };

  return {
    patientInfo,
    allowEdition,
    setAllowEdition,
    register,
    handleSubmit,
    onSubmit,
  };
};
