import { useEffect, useState } from 'react';
import Navbar from '../../components/Platform/Navbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

// icons
import { IoSearchSharp } from 'react-icons/io5';
import { IoIosArrowForward } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';

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
  const [inputData, setInputData] = useState('');
  const [data, setData] = useState<userModel[]>([]);
  const [users, setUsers] = useState<userModel[]>([]);
  const [isDeletionActive, setIsDeletionActive] = useState(false);
  const [usersToBeDeleted, setUsersToBeDeleted] = useState<Number[]>([]);
  const [booleanArray, setBooleanArray] = useState(
    Array(users.length).fill(false)
  );

  const handleChange = (e: any) => {
    setInputData(e.target.value);
  };

  function fetchData() {
    axios
      .get('http://localhost:3000/api/user')
      .then((res) => {
        setData(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // fill list from backend
  useEffect(() => {
    fetchData();
  }, []);

  // filtering by name
  useEffect(() => {
    const arrayOfFoundNames = data.filter(
      (user) =>
        user.fullname.toLowerCase().indexOf(inputData.toLowerCase().trim()) > -1
    );
    setUsers(arrayOfFoundNames);
  }, [inputData]);

  // handle deleting for desktop
  const handleDelete = async (id: number, name: string) => {
    const result = await Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${name} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar.',
      cancelButtonText: 'No, volver.',
    });

    if (result.isConfirmed) {
      axios
        .delete(`http://localhost:3000/api/user/${id}`)
        .then((res) => {
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
        .catch((err) => {
          Swal.fire(
            'Ocurrió un error',
            'Ocurrió un error al eliminar a este usuario.',
            'error'
          );
        });
    }
  };

  //handle click when selecting users to delete
  const handleSelectUsers = (index: number) => {
    setBooleanArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = !newArray[index];
      return newArray;
    });
  };

  console.log(usersToBeDeleted);

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
                          user.role_name === 'OWNER'
                            ? 'https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png'
                            : user.role_name === 'SECRETARY'
                            ? 'https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png'
                            : ''
                        }
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
                        to={`/user-management/edit-user/${user.id}`}>
                        <p>Ver información</p>
                        <IoIosArrowForward />
                      </Link>

                      <BsTrash
                        onClick={() => handleDelete(user.id, user.fullname)}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* mobile cards */}
                  <div className="lg:hidden grid grid-cols-4 text-[16px] bg-[#d9d9d9] p-2 rounded-[20px] items-center font-bold max-w-[500px] mx-auto">
                    <div className="col-span-1 relative">
                      <img
                        src={
                          user.role_name === 'OWNER'
                            ? 'https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png'
                            : user.role_name === 'SECRETARY'
                            ? 'https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png'
                            : ''
                        }
                        alt="User pic"
                        className="rounded-full w-[90px] "
                      />

                      {/* circle to select users */}
                      {isDeletionActive && (
                        <div
                          className={`size-6 border-2 border-black rounded-full absolute top-1/2 translate-y-[-50%] ${
                            booleanArray[index] ? 'bg-acento' : ''
                          }`}
                          onClick={() => handleSelectUsers(index)}></div>
                      )}
                    </div>
                    <div className="col-span-3 flex flex-col items-center justify-center gap-2">
                      <h3> {user.fullname} </h3>
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
          </div>

          {/* delete & add users btns */}
          {!isDeletionActive && (
            <div className="flex flex-col gap-5 mt-7">
              <Link
                className="text-[19px] font-bold bg-acento hover:bg-green-500 self-center rounded-[10px] py-[12px] px-[10px] lg:ml-auto"
                to="/link-to-add-user/">
                Agregar nuevo usuario
              </Link>
              <button
                className="lg:hidden text-[19px] font-bold bg-[#f5f5f5] hover:bg-gray-300 self-center rounded-[10px] py-[12px] px-[10px] "
                onClick={() => setIsDeletionActive(true)}>
                Eliminar usuarios
              </button>
            </div>
          )}

          {/* actions to delete */}
          {isDeletionActive && (
            <div className="flex flex-col gap-5 mt-7">
              <button
                className="lg:hidden text-[19px] font-bold bg-acento hover:bg-green-500 self-center rounded-[10px] py-[12px] px-[10px] "
                onClick={() => alert('na')}>
                Eliminar usuarios
              </button>
              <button
                className="lg:hidden text-[19px] font-bold bg-[#f5f5f5] hover:bg-gray-300 self-center rounded-[10px] py-[12px] px-[10px] "
                onClick={() => setIsDeletionActive(false)}>
                Cancelar
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default UsersList;
