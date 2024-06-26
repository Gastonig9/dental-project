import Carousel from "./Carousel";

export const AboutUs = () => {
  return (
    <>
      <section className="relative bg-background lg:pt-[183px]">
        <div className="flex flex-col sm:flex-row justify-center items-center mx-auto px-4 lg:px-8">
          <div className="mt-[105px] lg:mt-[132px]">
            {/* Section Titile */}
            <div className="sectionTitle absolute w-[139px] h-[39px] top-[17px] left-[19px] lg:top-[183px] lg:left-[183px] lg:w-[188px] lg:h-[48px] ">
              <p className="poppins-semibold text-[19px] lg:poppins-regular lg:text-[28px] leading-[120%]">
                Nosotros
              </p>
            </div>
            {/* Us Text */}
            <p className="text-justify poppins-medium text-[13px] w-[354px] lg:poppins-regular lg:text-[28px] lg:w-[729px] lg:ml-[17px] leading-[120%]">
              Los doctores (nombre 1) y (nombre 2) han transformado sonrisas y
              vidas con pasión y profesionalismo. Desde nuestros inicios, nos
              hemos comprometido a proporcionar cuidado odontológico de
              excelencia, enfocándonos en la salud bucal integral y el bienestar
              de nuestros pacientes. <br /> <br /> Nuestra historia esta marcada
              por el compromiso con la innovación y la atención personalizada,
              asefurando resultados que perduran. Descubra cómo nuestra
              experiencia y dedicación pueden mejorar su sonrisa hoy mismo.
              ¡Agende su consulta y dé el primer paso hacia una sonrisa
              saludable y radiante!
            </p>
          </div>
          {/* Doc Photo */}
          <picture className="bg-[#d9d9d9] h-[366px] lg:w-[765px] lg:h-[656px] lg:rounded-[50px] ml-[54px]">
            <img
              className="lg:rounded-[50px] object-cover h-full w-full opacity-60 md:opacity-100"
              src="./imgs/about-us/dental-squoosh.jpg"
              alt="FOTO DOC"
            />
          </picture>
        </div>
        {/* Carousel */}
        <Carousel></Carousel>
      </section>
    </>
  );
};
