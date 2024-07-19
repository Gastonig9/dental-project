import { useState } from "react";
import {
  IoPeople,
  IoStatsChart,
  IoHome,
  IoMenu,
  IoLogOutOutline,
} from "react-icons/io5";
import { FaCalendar, FaChevronDown } from "react-icons/fa";
import { RiMenuUnfoldLine, RiMenuUnfold2Line } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/platform/navbar/logo.png";
import { useAuth } from "../../pages/contexts/AuthContext";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { logout } = useAuth();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  // toggle mobile menu
  const activeMobileMenu = () => {
    setMobileMenu(true);
  };

  const disactiveMobileMenu = () => {
    setMobileMenu(false);
  };

  // toggle desktop menu
  const toggleDesktopMenu = () => {
    setDesktopMenu(!desktopMenu);
  };

  return (
    <>
      {/* mobile navbar */}
      <nav className="bg-[#DAE3DE] h-[81px] p-5 fixed top-0 w-full flex items-center justify-between lg:hidden z-10">
        <IoMenu className="text-4xl" onClick={activeMobileMenu} />
        <Link to="/">  
          <img src={logo} alt="Grinpol - Clínica Dental" className="w-28" />
        </Link>
        <div
          className={`bg-acento absolute top-0 w-full h-screen text-4xl duration-300 rounded-tr-[40px] ${
            mobileMenu ? "left-0 opacity-100" : "-left-[100%] opacity-0"
          }`}
        >
          <div className="flex flex-col gap-10 justify-center w-3/5 h-[90%] mx-auto">
            <button
              className="absolute top-5 right-5"
              onClick={disactiveMobileMenu}
            >
              <MdClose />
            </button>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/dashboard"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/dashboard"
            >
              <IoHome />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Inicio
              </h3>
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname.startsWith("/patient-management")
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/patient-management/patients-list"
            >
              <IoPeople />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Gestión de pacientes
              </h3>
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments" ||
                location.pathname === "/create-appointment"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/appointments"
            >
              <FaCalendar />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Gestión de turnos
              </h3>
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/reports"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/reports"
            >
              <IoStatsChart />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Reportes
              </h3>
            </Link>


            {/* user name and log out btn */}
            <div className="mt-[70px]">
              <div className="flex items-start gap-1">
                <button
                  type="button"
                  className="flex items-center gap-2 bg-acento text-[20px]"
                  id="user-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  onClick={toggleDropdown}
                >
          
                  <h3 className="text-[20px] font-semibold">
                    {userData.firstName} {userData.lastName}
                  </h3>
                </button>
              </div>
              <div className="mt-7">
                <button
                  className="flex poppins-semibold text-[20px] text-lg  text-black  items-center justify-center"
                  onClick={logout}
                >
                  Cerrar sesión
                  <span className="text-[20px] text-black ml-5"><IoLogOutOutline /></span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </nav>

      {/* desktop navbar */}
      <nav
        className={`bg-acento fixed top-0 left-0 h-screen rounded-tr-[80px] duration-300 shadow-xl z-50 hidden lg:block ${
          desktopMenu ? "w-[390px]" : "w-[173px]"
        }`}
      >
        <div className="flex justify-center items-center h-screen">
          <button
            className="absolute top-[80px] right-[80px] text-4xl"
            onClick={toggleDesktopMenu}
          >
            {desktopMenu ? <RiMenuUnfold2Line /> : <RiMenuUnfoldLine />}
          </button>

          <div className="flex flex-col gap-10 newxl:gap-[100px] mt-[80px] newxl:mt-0">
            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/dashboard"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/dashboard"
            >
              <IoHome className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Inicio
                </h3>
              )}
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname.startsWith("/patient-management")
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/patient-management/patients-list"
            >
              <IoPeople className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestionar Pacientes
                </h3>
              )}
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments" ||
                location.pathname === "/create-appointment"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/appointments"
            >
              <FaCalendar className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestionar Turnos
                </h3>
              )}
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/reports"
                  ? "text-black"
                  : "text-[#00000050]"
              }`}
              to="/reports"
            >
              <IoStatsChart className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Reportes
                </h3>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <header className="h-[127px] bg-[#DAE3DE] fixed top-0 w-full hidden lg:flex z-10">
        <div className="flex justify-between items-center w-10/12 mx-auto pl-[120px]">
          <Link to="/">
            <img src={logo} alt="Grinpol - Clínica Dental" className="w-44" />
          </Link>
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 bg-[#B4B4B4] py-3 px-5 rounded-3xl text-[19px]"
              id="user-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              <img
                src={
                  userData.role_name === "ASSOCIATED"
                    ? "https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png"
                    : userData.role_name === "SECRETARY"
                    ? "https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png"
                    : userData.role_name === "OWNER"
                    ? "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/employee_person_man_business_office_businessman_people_male_worker-512.png"
                    : ""
                }
                alt="User pic"
                className="w-[30px] rounded-full"
              />
              {userData.firstName} {userData.lastName}
              <FaChevronDown />
            </button>
            {dropdownVisible && (
              <div
                className="poppins-semibold absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-button"
                tabIndex={-1}
              >
                <div
                  className="p-6 flex flex-col justify-center items-center"
                  role="none"
                >
                  <p className="text-center">Mi cuenta</p>
                  <img
                    src={
                      userData.role_name === "ASSOCIATED"
                        ? "https://png.pngtree.com/png-vector/20230715/ourmid/pngtree-female-doctor-avatar-vector-design-png-image_7642475.png"
                        : userData.role_name === "SECRETARY"
                        ? "https://cdn3.iconfinder.com/data/icons/white-man-professions/512/profession_avatar_man_people_user_professional_white_work_job-52-512.png"
                        : userData.role_name === "OWNER"
                        ? "https://cdn0.iconfinder.com/data/icons/find-a-job-and-interview-flat/512/employee_person_man_business_office_businessman_people_male_worker-512.png"
                        : ""
                    }
                    alt="User pic"
                    className="w-[88px] rounded-full mb-3"
                  />
                  <p className="mb-2">
                    {userData.firstName} {userData.lastName}
                  </p>
                  <button
                    className="flex poppins-semibold text-lg w-[200px] p-3 text-black bg-acento rounded-full hover:shadow items-center justify-center"
                    onClick={logout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
