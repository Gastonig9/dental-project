import React, { useEffect } from "react";
import Navbar from "../../components/Platform/Navbar";
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { ImPencil } from "react-icons/im";
import axios from "axios";

const mockList = [
  {
    id: 1,
    paciente: "[Nombre paciente]",
  },
  {
    id: 2,
    paciente: "[Nombre paciente]",
  },
  {
    id: 3,
    paciente: "[Nombre paciente]",
  },
  {
    id: 4,
    paciente: "[Nombre paciente]",
  }
];

const ListadoPacientes = () => {
  useEffect(()=>{
    axios
      .get("http://localhost:3000/patient/get-patients")
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])

  return (
    <>
      <Navbar />
      <main className='p-3 mt-[80px] lg:hidden'>
        <section className='border-2 border-black rounded-xl p-2 bg-[#f5f5f5] '>
          {/* input */}
          <div className='flex border-2 rounded-[10px] items-center p-2 gap-2'>
            <IoSearchSharp className='text-xl'/>
            <input type="text" className='outline-none text-[13px] font-semibold bg-transparent' placeholder='Buscar paciente..'/>
          </div>

          {/* list */}
          <div className='flex flex-col gap-3 mt-3'>
            {
              mockList.map(paciente => 
                (
                  <div key={paciente.id} className='flex items-center justify-between bg-[#D9D9D9] py-4 px-2 rounded-[20px] sm:px-8'>
                    <h3 className='text-[16px] font-semibold'> {paciente.paciente} </h3>
                    <h4 className='text-[11px] '>N° Visita: { paciente.id } </h4>
                    <div className='flex items-center gap-2'>
                      <IoIosArrowForward />
                      <ImPencil />
                    </div>
                  </div>
                )
              )
            }

            <button className='text-[13px font-semibold rounded-[10px] bg-acento hover:bg-green-500 self-end p-2 mt-5'>Agregar nuevo paciente</button>
          </div>
        </section>
      </main>

      <main className="mt-[150px] ml-[220px] pr-10 hidden lg:block p-10">
        <section className="border-2 border-black bg-[#f5f5f5] rounded-[35px] max-w-[1594px] h-[826px] overflow-y-scroll shadow-2xl p-10 ">
          {/* header */}
          <div className="flex items-center lg:flex-col-reverse gap-5 newxl:flex-row justify-between w-11/12 ml-auto">
            {/* titles */}
            <div className="text-[19px] text-center font-bold flex gap-[181px] pl-[70px] newxl:pl-[30px] mr-auto">
              <h3>Nombre</h3>
              <div className="flex lg:gap-x-[100px] newxl:gap-[170px]">
                <h3 className="hidden xl:block">Paciente N°</h3>
                <h3 className=" ">Última Visita</h3>

              </div>
            </div>
            {/* input */}
            <div className="flex border border-black rounded-[10px] items-center p-1 gap-2">
              <IoSearchSharp className="text-xl" />
              <input
                type="text"
                className="outline-none text-[19px] poppins font-bold bg-transparent"
                placeholder="Buscar..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-[33px] mt-5">
            {mockList.map((paciente) => (
              <div
                key={paciente.id}
                className="flex items-center justify-between w-full ml-auto bg-[#D9D9D9] rounded-[20px] pl-[96px] py-8 pr-[48px] "
              >
                <div className="text-[19px] font-bold flex gap-[191px] ">
                  <h3>{paciente.paciente}</h3>
                  <h3 className="hidden xl:block">{paciente.id}</h3>
                  <h3 className="newxl:pl-[80px] ">{paciente.id} </h3>
                </div>

                <div className="flex items-center gap-7">
                  <div className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 xl:gap-10">
                    <p className="hidden newxl:block">Ver ficha médica</p>
                    <IoIosArrowForward />
                  </div>
                  <ImPencil />
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end mt-3">
            <button className="text[19px] bg-acento hover:bg-green-500 font-bold rounded-[10px] py-2 px-4 mt-[75px] ">Agregar nuevo paciente</button>
          </div>
        </section>
      </main>
    </>
  );
};

export default ListadoPacientes;
