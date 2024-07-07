import { useState } from "react";
import { IoPeople } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/img/platform/navbar/logo.png"

const Navbar = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);
  const location = useLocation();

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
        <img src={logo} alt="Grinpol - Clínica Dental" className="w-28"/>
        <h3></h3>

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

            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/dashboard"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <MdDashboardCustomize />
              <Link to="/dashboard">
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Dashboard
                </h3>
              </Link>
            </div>

            <div
              className={`flex items-center gap-1 ${
                location.pathname.startsWith("/patient-management")
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <IoPeople />
              <Link to="/patient-management/patients-list">
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestión de pacientes
                </h3>
              </Link>
            </div>

            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <FaCalendar />
              <Link to="/appointments">
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Gestión de turnos
                </h3>
              </Link>
            </div>

            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/example3"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <IoStatsChart />
              <Link to="/example3">
                <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                  Reportes
                </h3>
              </Link>
            </div>

            <div className="flex items-center gap-1 mt-[100px]">
              <FaRegUserCircle />
              <h3 className="text-[16px] font-semibold"> USER </h3>
            </div>
          </div>
        </div>
      </nav>

      {/* desktop navbar */}
      <nav
        className={`bg-acento fixed top-0 left-0 h-screen rounded-tr-[80px] duration-300 shadow-xl z-[11] hidden lg:block ${
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
            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/dashboard"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <MdDashboardCustomize className="text-5xl"/>
              {desktopMenu && (
                <Link to="/dashboard">
                  <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                    Dashboard
                  </h3>
                </Link>
              )}
            </div>

            {/* people icon */}
            <div
              className={`flex items-center gap-1 ${
                location.pathname.startsWith("/patient-management")
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <IoPeople className="text-5xl" />
              {desktopMenu && (
                <Link to="/patient-management/patients-list">
                  <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                    Gestionar Pacientes
                  </h3>
                </Link>
              )}
            </div>

            {/* calendar icon */}
            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/appointments"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <FaCalendar className="text-5xl" />
              {desktopMenu && (
                <Link to="/appointments">
                  <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                    Gestionar Turnos
                  </h3>
                </Link>
              )}
            </div>

            {/* stats icon */}
            <div
              className={`flex items-center gap-1 ${
                location.pathname === "/example3"
                  ? "text-black"
                  : "text-[#00000050] "
              } `}
            >
              <IoStatsChart className="text-5xl" />
              {desktopMenu && (
                <Link to="/example3">
                  <h3 className="text-[16px] font-semibold hover:translate-x-2 duration-300">
                    Reportes
                  </h3>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <header className="h-[127px] bg-[#DAE3DE] fixed top-0 w-full hidden lg:flex z-10">
        <div className="flex justify-between items-center w-10/12 mx-auto pl-[120px]  ">
          <img src={logo} alt="Grinpol - Clínica Dental" className="w-44"/>
          <div className="flex items-center gap-2 bg-[#B4B4B4] py-3 px-8 rounded-3xl">
            <FaRegUserCircle />
            <h3 className="text-[19px] ">[Usuario]</h3>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
