import { useState } from "react";
import { IoPeople, IoStatsChart, IoHome, IoMenu, IoLogOutOutline } from "react-icons/io5";
import { FaCalendar, FaChevronDown, FaRegUserCircle } from "react-icons/fa";
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
        <img src={logo} alt="Grinpol - Clínica Dental" className="w-28" />
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
          </div>

          <div className="flex items-start gap-1 ms-[60px] mt-[10px]">
            <button
              type="button"
              className="flex items-center gap-2 bg-acento py-3 px-8 rounded-3xl text-[20px]"
              id="user-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              <FaRegUserCircle />
              <h3 className="text-[20px] font-semibold">
                {userData.firstName} {userData.lastName}
              </h3>
            </button>
          </div>
          <div className="ms-[80px]">
            <button
              className="flex poppins-semibold text-[20px] text-lg w-[200px] z-10 p-3 text-black bg-acento items-center justify-center"
              onClick={logout}
            >
              Cerrar sesión
              <span className="ms-3 text-[20px] text-black"><IoLogOutOutline /></span>
            </button>
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

          <div className="flex flex-col gap-[100px] text-[34px]">
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
          <img src={logo} alt="Grinpol - Clínica Dental" className="w-44" />
          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-2 bg-[#B4B4B4] py-3 px-8 rounded-3xl text-[19px]"
              id="user-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={toggleDropdown}
            >
              <FaRegUserCircle />
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
                  <div className="w-[122px] h-[122px] rounded-full bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP34iSqZQyUhayGE4vjJnPqZJWfEDXq67Udg&s')] bg-no-repeat bg-center bg-cover"></div>
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
