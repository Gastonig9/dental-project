import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import Swal from 'sweetalert2'
import { useParams } from 'react-router-dom';
import MedicalHistory from './MedicalHistory';

const SeeEditMedicalHistory = () => {
  enum EnumInfoBoolean {
    SI="SI",
    NO="NO",
    SIN_INFORMACION="SIN_INFORMACION",
  }

  interface PatientFormat {
    patientId: number;
    someDisease: string;
    someTreatment: string;
    consumeMedicaments: string;
    allergyMedicament: string;
    operations: string;
    smokes: EnumInfoBoolean;
    pregnant: EnumInfoBoolean;
    attendance?: string;
    takeSomeMedication?: string;
    pains: EnumInfoBoolean;
    blowToTeeth?: string; //golpe en dientes
    dentalMobility: EnumInfoBoolean;
    swollenFace: EnumInfoBoolean; //cara inchada
    injuries: EnumInfoBoolean; //lesion tejidos blandos
    observations?: string;
  }

  const { id } = useParams()
  const [patientInfo, setPatientInfo] = useState<PatientFormat>({
    patientId: 0,
    someDisease: '',
    someTreatment: '',
    consumeMedicaments: '',
    allergyMedicament: '',
    operations: '',
    smokes: EnumInfoBoolean.SIN_INFORMACION,
    pregnant: EnumInfoBoolean.SIN_INFORMACION,
    attendance: '',
    takeSomeMedication: '',
    pains: EnumInfoBoolean.SIN_INFORMACION,
    blowToTeeth: '', //golpe en dientes
    dentalMobility: EnumInfoBoolean.SIN_INFORMACION,
    swollenFace: EnumInfoBoolean.SIN_INFORMACION, //cara inchada
    injuries: EnumInfoBoolean.SIN_INFORMACION, //lesion tejidos blandos
    observations: '',

  })
  const [allowEdition, setAllowEdition] = useState(false)
  const { register, handleSubmit, reset } = useForm()

  // bringing the patient's medical history from the backend
  useEffect(()=>{
    axios
      .get(`http://localhost:3000/patient/${id}`)
      .then((res)=>{
        setPatientInfo(res.data.medicalHistories[res.data.medicalHistories.length - 1])
      })
      .catch((err)=>{
        console.log(err.response.data.message)
      })
  }, [])

  // showing latest info in the input fields
  useEffect(()=>{
    if(patientInfo){
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
        observations: patientInfo.observations
      })

    }
  },[patientInfo])

  // update info on submit
  const onSubmit = (data: any) => { 
    data.patientId = Number(id)
    
    axios
      .put(`http://localhost:3000/records/${id}`, data)
      .then((res)=>{
        console.log(res)
        Swal.fire({
          title: "Agregado",
          text: "Historia clínica agregada con éxito.",
          icon: "success"
        });
        setAllowEdition(false)
      })
      .catch((err)=>{
        console.log(err.response.data.message)
        Swal.fire({
          title: "Error",
          text: "No se pudo actualizar historia clínica.",
          icon: "error"
        });
      })
   };


  return (
    <>
      <main className='grid gap-y-10 lg:grid-cols-2 lg:-gap-x-10 xl:gap-x-[136px] poppins'>

        {/* FIRST FORM */}
        <div >
          <h3 className='font-bold '>Antecedentes médicos</h3>
          <form className='text-[19px] flex flex-col gap-1 mt-2'>

            <label htmlFor="input1">Sufre alguna enfermdad? Cuál?</label>
            <input 
              id='input1' 
              type="text" 
              {... register("someDisease")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input2">Hace algún tratamiento médico? Cuál?</label>
            <input 
              id='input2' 
              type="text" 
              {... register("someTreatment")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input3">Consume habitualmente medicamentos? Cuál?</label>
            <input 
              id='input3' 
              type="text" 
              {... register("consumeMedicaments")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input4">Es alérgico a algún medicamento? Cuál?</label>
            <input 
              id='input4' 
              type="text" 
              {... register("allergyMedicament")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input5">Fue operado alguna vez? Cuándo?</label>
            <input 
              id='input5' 
              type="text" 
              {... register("operations")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />


            <label htmlFor="input6">Fuma?</label>
            <select id="input6" {... register("smokes")} defaultValue={"SIN_INFORMACION"} 
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`} disabled={!allowEdition}
              >
              <option value="SIN_INFORMACION" disabled>Seleccione opción</option>
              <option  value="SI">SI</option>
              <option  value="NO">NO</option>
            </select> 

            <label htmlFor="input7">Está embarazada? De cuántos meses?</label>
            <select id="input7" {... register("pregnant")} defaultValue={"SIN_INFORMACION"}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`} disabled={!allowEdition}
              >
              <option value="SIN_INFORMACION" disabled>Seleccione opción</option>
              <option  value="SI">SI</option>
              <option  value="NO">NO</option>
            </select>   
          </form>
        </div>

        {/* SECOND FORM */}
        <div>
          <h3 className="font-bold ">Antecedentes odontológicos</h3>
          <form
            className="text-[19px] flex flex-col gap-1 mt-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label htmlFor="input8">Por que asistió a la consulta?</label>
            <input
              id="input8"
              type="text"
              {...register("attendance")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input9">Tomó algún medicamento? Cuál?</label>
            <input
              id="input9"
              type="text"
              {...register("takeSomeMedication")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input10">Ha tenido dolor? Describa el tipo</label>
            <select
              id="input10"
              {...register("pains")}
              defaultValue={"SIN_INFORMACION"}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              disabled={!allowEdition}
            >
              <option value="SIN_INFORMACION" disabled>
                Seleccione opción
              </option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>

            <label htmlFor="input11">
              Sufrió algún golpe en los dientes? Cómo se produjo?
            </label>
            <input
              id="input11"
              type="text"
              {...register("blowToTeeth")}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            />

            <label htmlFor="input12">Tiene movilidad en sus dientes?</label>
            <select
              id="input12"
              {...register("dentalMobility")}
              defaultValue={"SIN_INFORMACION"}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              disabled={!allowEdition}
            >
              <option value="SIN_INFORMACION" disabled>
                Seleccione opción
              </option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>

            <label htmlFor="input13">Ha tenido la cara hinchada?</label>
            <select
              id="input13"
              {...register("swollenFace")}
              defaultValue={"SIN_INFORMACION"}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              disabled={!allowEdition}
            >
              <option value="SIN_INFORMACION" disabled>
                Seleccione opción
              </option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>

            <label htmlFor="input14">Presenta lesión en tejidos blandos?</label>
            <select
              id="input14"
              {...register("injuries")}
              defaultValue={"SIN_INFORMACION"}
              className={`py-1 px-4 rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              disabled={!allowEdition}
            >
              <option value="SIN_INFORMACION" disabled>
                Seleccione opción
              </option>
              <option value="SI">SI</option>
              <option value="NO">NO</option>
            </select>

            <label htmlFor="input15">Observaciones</label>
            <textarea
              id="input15"
              rows={4}
              {...register("observations")}
              className={`resize-none p-2  rounded-lg ${!allowEdition ? 'bg-slate-200 outline-none' : ''}`}
              readOnly={!allowEdition}
            ></textarea>

            <div className='flex gap-3 justify-end'>
              <button  className='bg-acento hover:bg-green-500 py-2 px-4 rounded-lg self-end mt-3' type='button' onClick={()=> setAllowEdition(!allowEdition)}> { !allowEdition ? 'Activar Edición' : 'Desactivar Edición' } </button>
              <button  className='bg-acento hover:bg-green-500 py-2 px-4 rounded-lg self-end mt-3'>Guardar</button>
            </div>
          </form>
        </div>


      </main>
    </>

  )
}

export default SeeEditMedicalHistory