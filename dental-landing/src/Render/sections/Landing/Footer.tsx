import { FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { CgFacebook } from "react-icons/cg";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    // <!-- Footer -->
    <footer className="bg-lightgray p-10 md:px-[150px] py-10 " id="contactanos">
      <div className="mx-auto flex flex-col-reverse lg:flex-row gap-[48px] border-b-4 py-10 max-w-[1450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26266.640928830515!2d-58.41069085906787!3d-34.62109714351039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccafd6efe8fdb%3A0xeca16f19e3727dfd!2sAv.%20San%20Juan%203035%2C%20C1221%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses!2sco!4v1722189335249!5m2!1ses!2sco"
          width="600"
          height="450"
          className="rounded-3xl shadow-2xl  responsive-map w-full lg:basis-1/2"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="flex flex-col w-full lg:basis-1/2 poppins">
          {/* texts */}
          <div className="text-center lg:text-left lg:pr-20">
            <h3 className="text-xl lg:text-[40px] poppins-bold">Contacto</h3>
            <div className="mt-5 lg:mt-[70px] flex flex-col gap-5 lg:gap-10 lg:text-left text-xl lg:text-[28px]">
              <div className="flex gap-2 items-center text-left">
                <p>
                  <FiMapPin />
                </p>
                <h5>
                  {" "}
                  <span className="font-semibold">Dirección: </span> Av. San
                  Juan 3035, C1221 Cdad. Autónoma de Buenos Aires, Argentina
                </h5>
              </div>

              <div className="flex gap-2 items-center text-left">
                <p>
                  <FaWhatsapp />
                </p>
                <h5>
                  <span className="font-semibold">Teléfono: </span>+54 11
                  5048-1832
                </h5>
              </div>

              <div className="flex gap-2 items-center text-left">
                <p>
                  <LuClock3 />
                </p>
                <h5>
                  <span className="font-semibold">Horario: </span>Lunes a
                  viernes de 9:00 a.m. hasta las 6:00 p.m., o los sábados desde las 9:00 a.m. hasta las 2:00 p.m.
                </h5>
              </div>
            </div>
          </div>

          {/* social media icons*/}
          <div className="mt-10 lg:mt-[70px] flex gap-5">
            <a
              href="https://www.facebook.com"
              className="p-3 border border-black rounded-full"
              target="_blank"
            >
              <CgFacebook />
            </a>
            <a
              href="https://www.instagram.com/"
              className="p-3 border border-black rounded-full"
              target="_blank"
            >
              <FaInstagram />{" "}
            </a>
            <a
              href="https://www.x.com/"
              className="p-3 border border-black rounded-full"
              target="_blank"
            >
              <FaXTwitter />{" "}
            </a>
          </div>
        </div>
      </div>

      {/* privacy policy */}
      <div className="flex flex-col justify-center items-center lg:flex-row my-4 text-[18px] max-w-[1826px] mx-auto">
        <h4></h4>
        <h5 className="text-center">
          © 2024 FooTalent | All Rights Reserved.{" "}
        </h5>
      </div>
    </footer>
  );
};
