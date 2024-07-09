import docPhoto from "/src/assets/img/landing/about-us/dental-squoosh.jpg";
import Carousel from "./Carousel";

export const AboutUs = () => {
  return (
    <main className="relative bg-background lg:pt-[183px]">
      <section className="max-w-[1530px] mx-auto">
        <div className="about-us-img relative isolate overflow-hidden flex flex-col sm:flex-row justify-center items-center mx-auto px-4 lg:px-0">
          {/* Text and Title Container */}
          <div className="flex flex-col justify-center lg:mr-8 lg:mb-[107px] lg:gap-[20px]">
            {/* Section Titile */}
            <div className="sectionTitle w-[139px] h-[39px] lg:w-[188px] lg:h-[48px] mt-[53px] mr-[215px] md:mr-0 md:mt-0">
              <p className="text-[19px] lg:text-[28px] leading-[120%]">
                Nosotros
              </p>
            </div>
            <div className="mt-[38px]  mb-[55px] lg:mb-[0px]">
              {/* Us Text */}
              <p className="text-justify poppins-medium text-[13px] w-[354px] lg:poppins-regular lg:text-[28px] lg:w-[729px] leading-[120%]">
                Los doctores Natalia Ceballos y Pablo Cruz se han destacado en
                la transformación de sonrisas con profesionalismo y dedicación.
                Desde nuestros inicios, nos hemos comprometido a proporcionar
                cuidados odontológicos de excelencia, con un enfoque integral en
                la salud bucal y el bienestar de nuestros pacientes. <br />
                <br /> Nuestra trayectoria está marcada por un firme compromiso
                con la innovación y la atención personalizada, garantizando
                resultados duraderos. Descubra cómo nuestra experiencia y
                dedicación pueden mejorar su sonrisa.
              </p>
            </div>
          </div>
          {/* Doc Photo */}
          <picture className="bg-[#d9d9d9] h-[366px] lg:w-[765px] lg:h-[656px] lg:rounded-[50px] ml-[54px] hidden lg:block">
            <img
              className="lg:rounded-[50px] object-cover h-full w-full opacity-60 md:opacity-100"
              src={docPhoto}
              alt="FOTO DOC"
            />
          </picture>
        </div>
      </section>
      <section className="max-w-[1920px] lg:mx-auto">
        {/* Carousel */}
        <Carousel></Carousel>
      </section>
    </main>
  );
};
