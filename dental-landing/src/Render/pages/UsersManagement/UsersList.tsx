import { useEffect, useState } from "react";
import Navbar from "../../components/Platform/Navbar";
import Spinner from "../../components/Platform/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { token } from "../../../localStorage/token";

// icons
import { IoSearchSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import { BsTrash } from "react-icons/bs";

interface userModel {
  email: string;
  firstName: string;
  lastName: string;
  id: number;
  password: string;
  resetPasswordToken: boolean;
  role_name: string;
}

const UsersList = () => {
  const [inputData, setInputData] = useState('');
  const [data, setData] = useState<userModel[]>([]);
  const [users, setUsers] = useState<userModel[]>([]);
  const [isDeletionActive, setIsDeletionActive] = useState(false);
  const [booleanArray, setBooleanArray] = useState(Array(users.length).fill(false));
  const [loading, setLoading] = useState(false)
  const [activeUser, setActiveUser] = useState('')

  const handleChange = (e: any) => {
    setInputData(e.target.value);
  };

  function fetchData() {
    setLoading(true)
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/user`,{headers:{
        "Authorization":`Bearer ${token()}`
      }})
      .then((res) => {
        setData(res.data);
        setUsers(res.data);
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      });
  }

  // fill list from backend
  useEffect(() => {
    fetchData();
    const user = localStorage.getItem('user');
    if(user){
      const userObject = JSON.parse(user)
      setActiveUser(userObject.email)
    }
  }, []);

  // filtering by name
  useEffect(() => {
    const arrayOfFoundNames = data.filter(
      (user) =>
        user.firstName.toLowerCase().indexOf(inputData.toLowerCase().trim()) > -1 || user.lastName.toLowerCase().indexOf(inputData.toLowerCase().trim()) > -1 
    );
    setUsers(arrayOfFoundNames);
  }, [inputData]);

  // handle deleting for desktop
  const handleDelete = async (id: number, firstName: string, lastName: string) => {
    const result = await Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${firstName} ${lastName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar.',
      cancelButtonText: 'No, volver.',
    });

    if (result.isConfirmed) {
      axios
        .delete(`${import.meta.env.VITE_API_URL}/api/user/${id}`,{
          headers:{
            Authorization:`Bearer ${token()}`
          }
        })
        .then(() => {
          Swal.fire({
            toast: true,
            timerProgressBar: true,
            position: 'top-right',
            showConfirmButton: false,
            showCloseButton: true,
            title: 'Usuario eliminado',
            icon: 'success',
            timer: 3000,
          });
          fetchData();
        })
        .catch(() => {
          Swal.fire(
            'Ocurrió un error',
            'Ocurrió un error al eliminar a este usuario.',
            'error'
          );
        });
    }
  };

 //handle click when selecting users - toggle circle color
  const handleSelectUsers = (index: number) => {
    setBooleanArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });

  }

  // saving in an array all the id's to be deleted
  const handleGroupDeletion = async() =>{
    
    const arrayOfIds = booleanArray.map((state, index) => {
      if(state){
        return users[index].id
      }
    })

    const finalArray = arrayOfIds.filter(value => value !== undefined)

    if(finalArray.length){
      const result = await Swal.fire({
        title: `${finalArray.length} ${finalArray.length > 1 ? 'usuarios serán eliminados.' : 'usuario será eliminado.'}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar.",
        cancelButtonText: "Volver",
      });
      
      if(result.isConfirmed){
        arrayOfIds.forEach(id => {
          if(id){
            axios
              .delete(`${import.meta.env.VITE_API_URL}/api/user/${id}`, {
                headers: {
                  Authorization: `Bearer ${token()}`
                },
              } )
              .then(()=>{
                Swal.fire({
                  toast: true,
                  timerProgressBar: true,
                  position: "top-right",
                  showConfirmButton: false,
                  showCloseButton: true,
                  title: "Usuario eliminado",
                  icon: "success",
                  timer: 3000,
                });
                fetchData();
                setBooleanArray(Array(users.length).fill(false))
              })
              .catch(()=>{
                Swal.fire(
                  "Ocurrió un error",
                  "Ocurrió un error al eliminar a este usuario.",
                  "error"
                );
              })
          }
        })
        
      }
    } else {

    }
  }
  return (
    <>
      <Navbar />
      <main className="mt-[90px] lg:mt-[150px] lg:ml-[220px] lg:p-10 ">
        <section className="lg:border-2 lg:border-black lg:bg-[#f5f5f5] lg:rounded-[35px] max-w-[1594px] lg:h-[826px] lg:shadow-2xl p-3 lg:p-10 xxl:mx-auto">
          {/* list of users */}
          <div className="overflow-y-scroll lg:h-[630px] ">
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
            {loading ? <Spinner /> :      
            <div className="flex flex-col lg:grid gap-6 lg:gap-5 mt-5">
              {isDeletionActive && (
                <h3 className="text-[19px] text-center font-bold lg:hidden">
                  Selecciona usuarios
                </h3>
              )}
              {users.map((user, index) => (
                <div key={user.id}>
                  {/* desktop cards */}
                  <div className="hidden lg:grid lg:grid-cols-3 text-center text-[19px] bg-[#d9d9d9] p-5 rounded-[20px] items-center font-bold">
                    {/* pic and name */}
                    <div className="flex items-center gap-10 px-10">
                      <img
                        src={
                          user.role_name === "ASSOCIATED"
                          ? "https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png"
                          : user.role_name === "SECRETARY"
                          ? "https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png"
                          : user.role_name === "OWNER"
                          ? "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/employee_person_man_business_office_businessman_people_male_worker-512.png"
                          : ""
                        }
                        alt="User pic"
                        className="w-[88px] rounded-full"
                      />
                      <h3> {user.firstName} {user.lastName} {activeUser === user.email &&<span>(Tú)</span>}</h3>
                    </div>

                    {/* role */}
                    <h3> {user.role_name} </h3>

                    {/* info and delete btns */}
                    <div className="flex items-center gap-2 newxl:gap-10 justify-end newxl:px-10">
                      <Link
                        className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 lg:gap-1 newxl:gap-[70px]" 
                        to={`/user-management/edit-user/${user.id}`}>
                        <p>Ver información</p>
                        <IoIosArrowForward />
                      </Link>

                      {activeUser === user.email && <BsTrash
                        className="text-transparent"
                      />}

                      {activeUser !== user.email && <BsTrash
                        onClick={() => handleDelete(user.id, user.firstName, user.lastName)}
                        className="cursor-pointer"
                      />}
                    </div>
                  </div>
                  {/* mobile cards */}
                  <div className="lg:hidden grid grid-cols-4 text-[16px] bg-[#d9d9d9] p-2 rounded-[20px] items-center font-bold max-w-[500px] mx-auto">
                    <div className="col-span-1 relative">
                      <img
                        src={
                          user.role_name === "ASSOCIATED"
                          ? "https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png"
                          : user.role_name === "SECRETARY"
                          ? "https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png"
                          : user.role_name === "OWNER"
                          ? "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/employee_person_man_business_office_businessman_people_male_worker-512.png"
                          : ""
                        }
                        alt="User pic"
                        className="rounded-full w-[90px] "
                      />

                      {/* circle to select users */}
                      {isDeletionActive && activeUser !== user.email &&(
                        <div
                          className={`size-6 border-2 border-black rounded-full absolute top-1/2 translate-y-[-50%] ${
                            booleanArray[index] ? 'bg-acento' : ''
                          }`}
                          onClick={() => handleSelectUsers(index)}></div>
                      )}
                    </div>
                    <div className="col-span-3 flex flex-col items-center justify-center gap-2">

                      <h3> {user.firstName} {user.lastName} {activeUser === user.email &&<span>(Tú)</span>}</h3>

                      <h3> {user.role_name} </h3>
                      {!isDeletionActive && (
                        <Link
                          className="bg-[#f5f5f5] rounded-[10px] flex items-center p-2 font-semibold text-[16px] gap-2 px-5 w-full justify-center max-w-[260px] "
                          to={`/user-management/edit-user/${user.id}`}>
                          <p>Ver información</p>
                          <IoIosArrowForward />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            }
          </div>

          {/* delete & add users btns */}
          {!isDeletionActive && <div className="flex flex-col gap-5 mt-7">
            <Link
              className="text-[19px] font-bold bg-acento hover:bg-green-500 self-center rounded-[10px] py-[12px] px-[10px] lg:ml-auto"
              to="/user/create-user"
            >
              Agregar nuevo empleado
            </Link>
            <button
              className="lg:hidden text-[19px] font-bold bg-[#f5f5f5] hover:bg-gray-300 self-center rounded-[10px] py-[12px] px-[10px] "
              onClick={() => setIsDeletionActive(true)}
            >
              Eliminar empleados
            </button>
          </div>}

          {/* actions to delete */}
          {isDeletionActive && <div className="flex flex-col gap-5 mt-7">
            <button
              className="lg:hidden text-[19px] font-bold bg-acento hover:bg-green-500 self-center rounded-[10px] py-[12px] px-[10px] "
              onClick={handleGroupDeletion}
            >
              Eliminar usuarios
            </button>
            <button
              className="lg:hidden text-[19px] font-bold bg-[#f5f5f5] hover:bg-gray-300 self-center rounded-[10px] py-[12px] px-[10px] "
              onClick={() => setIsDeletionActive(false)}
            >
              Cancelar
            </button>
          </div>}
        </section>
      </main>
    </>
  );
};

export default UsersList;
