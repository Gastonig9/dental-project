import React, { useEffect, useState } from "react";
import Navbar from "../../components/Platform/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";

// icons
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BsTrash } from "react-icons/bs";

interface userModel {
  email: string;
  fullname: string;
  id: number;
  password: string;
  resetPasswordToken: boolean;
  role_name: string;
  username: string;
}

const UsersList = () => {
  const mockList = [
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      pic: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001879.png",
    },
    {
      id: 2,
      name: "John Doe2",
      role: "Admin",
      pic: "https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001879.png",
    },
    {
      id: 3,
      name: "Mary Jane",
      role: "Secretary",
      pic: "https://cdn3.iconfinder.com/data/icons/avatar-set-2/512/Avata_06-512.png",
    },
  ];
  const [inputData, setInputData] = useState("");
  const [data, setData] = useState<userModel[]>([]);
  const [users, setUsers] = useState<userModel[]>([]);


  const handleChange = (e: any) => {
    setInputData(e.target.value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(()=>{
    const arrayOfFoundNames = data.filter(user => user.fullname.toLowerCase().indexOf(inputData.toLowerCase().trim()) > -1)
    setUsers(arrayOfFoundNames)
  }, [inputData])

  return (
    <>
      <Navbar />
      <main className="mt-[90px] lg:mt-[150px] lg:ml-[220px] lg:p-10">
        <section className="lg:border-2 lg:border-black lg:bg-[#f5f5f5] lg:rounded-[35px] max-w-[1594px] lg:h-[826px]  lg:shadow-2lg p-3 lg:p-10 relative xxl:mx-auto overflow-y-scroll">
          {/* desktop title */}
          <div className="lg:grid lg:grid-cols-3 text-center text-[19px]">
            <h3 className="hidden lg:block font-bold">Nombre</h3>
            <h3 className="hidden lg:block font-bold">Rol</h3>
            <div className="flex lg:justify-end">
              <div className="w-full max-w-[450px] mx-auto lg:mx-0 lg:max-w-[320px] flex items-center p-1 gap-2 border border-black rounded-[10px]">
                <IoSearchSharp className="text-lg" />
                <input
                  type="text"
                  className="outline-none poppins font-bold bg-transparent "
                  placeholder="Buscar..."
                  onChange={handleChange}
                  value={inputData}
                />
              </div>
            </div>
          </div>

          {/* users rows */}
          <div className="flex flex-col lg:grid gap-6 lg:gap-5 mt-5">
            {users.map((user) => (
              <div key={user.id}>
                {/* desktop cards */}
                <div
                  className="hidden lg:grid lg:grid-cols-3 text-center text-[19px] bg-[#d9d9d9] p-5 rounded-[20px] items-center font-bold"
                >
                  {/* pic and name */}
                  <div className="flex items-center gap-10 px-10">
                    <img
                      src={user.role_name === 'OWNER' ? 'https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png' : user.role_name === 'SECRETARY' ? 'https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png' : ''}
                      alt="User pic"
                      className="w-[88px] rounded-full"
                    />
                    <h3> {user.fullname} </h3>
                  </div>

                  {/* role */}
                  <h3> {user.role_name} </h3>

                  {/* info and delete btns */}
                  <div className="flex items-center gap-2 newxl:gap-10 justify-end newxl:px-10">
                    <Link
                      className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 lg:gap-1 newxl:gap-[70px]"
                      to={`/patient-management/seeEditPatient/${user.id}`}
                    >
                      <p>Ver información</p>
                      <IoIosArrowForward />
                    </Link>

                    <BsTrash />
                  </div>
                </div>

                {/* mobile cards */}
                <div className="lg:hidden grid grid-cols-4 text-[16px] bg-[#d9d9d9] p-2 rounded-[20px] items-center font-bold max-w-[500px] mx-auto" >
                  <div className="col-span-1">
                    <img
                      src={user.role_name === 'OWNER' ? 'https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png' : user.role_name === 'SECRETARY' ? 'https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png' : ''}
                      alt="User pic"
                      className="rounded-full w-[90px] "
                    />
                  </div>
                  <div className="col-span-3 flex flex-col items-center justify-center gap-2">
                    <h3> {user.fullname} </h3>
                    <h3> {user.role_name} </h3>
                    <Link
                      className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 px-5 w-full justify-center max-w-[260px] "
                      to={`/patient-management/seeEditPatient/${user.id}`}
                    >
                      <p>Ver información</p>
                      <IoIosArrowForward />
                    </Link>
                  </div>
                </div>
              </div >
            ))}
          </div>

          {/* delete & add users btns */}
          <div className="flex flex-col gap-5 mt-7">
            <button className="text-[19px] font-bold bg-acento hover:bg-green-500 self-center rounded-[10px] py-[12px] px-[10px] lg:absolute right-10 bottom-10">
              Agregar nuevo usuario
            </button>
            <button className="lg:hidden text-[19px] font-bold bg-[#f5f5f5] hover:bg-gray-300 self-center rounded-[10px] py-[12px] px-[10px] ">
              Eliminar usuarios
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default UsersList;
