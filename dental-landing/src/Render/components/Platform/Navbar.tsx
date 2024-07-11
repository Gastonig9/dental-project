import { useState } from "react";
import { IoPeople } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/platform/navbar/logo.png";
import { useAuth } from "../../pages/contexts/AuthContext";

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);
  const location = useLocation();
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  const { logout } = useAuth();

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
        <IoMenu className="text-4xl " onClick={activeMobileMenu} />
        <img src={logo} alt="Grinpol - Clínica Dental" className="w-28" />
        <div className="my-auto me-5">
          <button
            className="flex poppins-semibold text-lg w-[90px] py-3 px-1 text-black bg-acento rounded-full hover:shadow items-center justify-center"
            onClick={logout}
          >
            <span className="ms-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </span>
          </button>
        </div>
        <div
          className={`bg-acento absolute top-0 w-full h-screen text-4xl duration-300 rounded-tr-[40px] ${
            mobileMenu ? "left-0 opacity-100" : "-left-[100%] opacity-0"
          }`}
        >
          <div className="flex flex-col gap-10 justify-center w-3/5 h-[700px] mx-auto">
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
                  : "text-[#00000050] "
              } `}
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
                  : "text-[#00000050] "
              } `}
              to="/patient-management/patients-list"
            >
              <IoPeople />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestión de pacientes
                </h3>
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments" || location.pathname === "/create-appointment"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/appointments"
            >
              <FaCalendar />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Gestión de turnos
              </h3>
  
            </Link>

            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/example3"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/example3"
            >
              <IoStatsChart />
              <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                Reportes
              </h3>
            </Link>

            <div className="flex items-center gap-1 mt-[100px]">
              <FaRegUserCircle />
              <h3 className="text-[16px] font-semibold">
                {" "}
                {userData.firstName} {userData.lastName}{" "}
              </h3>
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
            className="absolute top-[80px] right-[80px]  text-4xl"
            onClick={toggleDesktopMenu}
          >
            {desktopMenu ? <RiMenuUnfold2Line /> : <RiMenuUnfoldLine />}
          </button>

          <div className="flex flex-col gap-[100px] text-[34px] ">
            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/dashboard"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/dashboard"
            >
              <IoHome className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Inicio
                </h3>
              )}
            </Link>

            {/* people icon */}
            <Link
              className={`flex items-center gap-1 ${
                location.pathname.startsWith("/patient-management")
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/patient-management/patients-list"
            >
              <IoPeople className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestionar Pacientes
                </h3>
              )}
            </Link>

            {/* calendar icon */}
            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments" || location.pathname === "/create-appointment"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/appointments"
            >
              <FaCalendar className="text-5xl" />
              {desktopMenu && (
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestionar Turnos
                </h3>
              )}
            </Link>

            {/* stats icon */}
            <Link
              className={`flex items-center gap-1 ${
                location.pathname === "/example3"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
              to="/example3"
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
        <div className="flex justify-between items-center w-10/12 ms-[100px] me-[40px] pl-[120px]  ">
          <img src={logo} alt="Grinpol - Clínica Dental" className="w-44" />
          <div className="flex items-center gap-2 bg-[#B4B4B4] py-3 px-8 rounded-3xl">
            <FaRegUserCircle />
            <h3 className="text-[19px] ">
              {userData.firstName} {userData.lastName}
            </h3>
          </div>
        </div>
        <div className="my-auto me-5">
          <button
            className="flex poppins-semibold text-lg w-[200px] p-3 text-black bg-acento rounded-full hover:shadow items-center justify-center"
            onClick={logout}
          >
            Cerrar Sesión{" "}
            <span className="ms-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
