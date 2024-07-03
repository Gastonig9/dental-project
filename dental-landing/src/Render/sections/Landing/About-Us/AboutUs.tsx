import Carousel from "./Carousel";

export const AboutUs = () => {
  return (
    <>
      <section className="relative bg-background lg:pt-[183px]">
        {/* Section Titile */}
        <div className="sectionTitle absolute w-[139px] h-[39px] top-[53px] left-[15px] lg:top-[183px] lg:left-[187px] lg:w-[188px] lg:h-[48px] ">
          <p className="text-[19px] lg:text-[28px] leading-[120%]">Nosotros</p>
        </div>
        <div className="about-us-img relative isolate overflow-hidden flex flex-col sm:flex-row justify-center items-center mx-auto px-4 lg:px-8 ">
          <div className="mt-[130px] lg:mt-[132px] mb-[55px] lg:mb-[0px]">
            {/* Us Text */}
            <p className="text-justify poppins-medium text-[13px] w-[354px] lg:poppins-regular lg:text-[28px] lg:w-[729px] lg:ml-[17px] leading-[120%]">
              Los doctores Natalia Ceballos y Pablo Cruz se han destacado en la
              transformación de sonrisas con profesionalismo y dedicación. Desde
              nuestros inicios, nos hemos comprometido a proporcionar cuidados
              odontológicos de excelencia, con un enfoque integral en la salud
              bucal y el bienestar de nuestros pacientes. <br /> <br /> Nuestra
              trayectoria está marcada por un firme compromiso con la innovación
              y la atención personalizada, garantizando resultados duraderos.
              Descubra cómo nuestra experiencia y dedicación pueden mejorar su
              sonrisa.
            </p>
          </div>
          {/* Doc Photo */}
          <picture className="bg-[#d9d9d9] h-[366px] lg:w-[765px] lg:h-[656px] lg:rounded-[50px] ml-[54px] hidden lg:block">
            <img
              className="lg:rounded-[50px] object-cover h-full w-full opacity-60 md:opacity-100"
              src="/src/assets/img/landing/about-us/dental-squoosh.jpg"
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
