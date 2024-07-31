import docPhoto from "/src/assets/img/landing/about-us/dental-squoosh.jpg";
import Carousel from "./Carousel";

export const AboutUs = () => {
  return (
    <main className="relative bg-background lg:pt-[183px]" id="nosotros">
      <section className="max-w-[1530px] mx-auto px-10">
        <div className="about-us-img relative isolate overflow-hidden flex flex-col sm:flex-row justify-center items-center mx-auto max-xl:px-[80px]">
          {/* Text and Title Container */}
          <div className="flex flex-col justify-center lg:mb-[107px] lg:gap-[20px] max-md:mt-10">
            {/* Section Titile */}
            <div className="sectionTitle w-[139px] h-[39px] lg:w-[188px] lg:h-[48px] md:mt-[53px] lg:mt-0 max-md:mr-[215px]">
              <p className="text-[19px] lg:text-[28px] leading-[120%]">
                Nosotros
              </p>
            </div>
            <div className="mt-[38px] max-2xl:max-w-[590px] max-lg:mb-[55px]">
              {/* Us Text */}

              <p className="poppins-medium text-[15px] text-justify lg:text-start md:font-normal lg:text-[18px] xl:text-[28px] 2xl:w-[729px] leading-[120%]">
                Los doctores Natalia Ceballos y Pablo Cruz se han destacado en la transformación de sonrisas con profesionalismo y dedicación.
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
          <picture className="bg-[#d9d9d9] h-[366px] lg:w-[500px] lg:h-[500px] 2xl:w-[765px] 2xl:h-[656px] lg:rounded-[50px] ml-[54px] hidden lg:block">
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
