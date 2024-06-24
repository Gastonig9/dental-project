import FooterMap from "../../components/Landing/Footer/FooterMap";
import { FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { CgFacebook } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    // <!-- Footer -->
    <footer className="bg-lightgray p-5 md:px-[150px] py-10 ">
      <div className="max-w-[1826px] mx-auto flex flex-col-reverse lg:flex-row gap-10 lg:gap-0 border-b-4 py-10">
        <FooterMap />


        <div className="flex flex-col">
          {/* texts */}
          <div className="text-center lg:text-left">
            <h3 className="text-[40px] poppins-bold">Contacto</h3>
            <div className="mt-5 flex flex-col gap-5 text-center lg:text-left  text-[28px]">
              <div className="flex gap-2 items-center ">
                <FiMapPin />
                <h5>Dirección</h5>
              </div>

              <div className="flex gap-2 items-center ">
                <FaWhatsapp />
                <h5>Teléfono</h5>
              </div>

              <div className="flex gap-2 items-center ">
                <LuClock3 />
                <h5>Horario</h5>
              </div>
            </div>
          </div>

          {/* social media icons*/}
          <div className="mt-10 flex gap-5">
            <a href="#" className="p-3 border border-black rounded-full"><CgFacebook  /></a>
            <a href="#" className="p-3 border border-black rounded-full"><FaInstagram  /> </a>
            <a href="#" className="p-3 border border-black rounded-full"><FaXTwitter  /> </a>
          </div>
        </div>

      </div>

      {/* privacy policy */}
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between my-4 text-[18px] max-w-[1826px] mx-auto">
        <h4></h4>
        <h5>© 2024 FooTalent | All Rights Reserved. </h5>
        <div className="flex gap-5">
          <a href="#">Terms of Service</a>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
};
