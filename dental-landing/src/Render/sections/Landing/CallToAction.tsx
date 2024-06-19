// import { Hero } from "../../components/Landing/CallToAction/Hero";
// import { Links } from "../../components/Landing/CallToAction/Links";
// import { Stats } from "../../components/Landing/CallToAction/Stats";

export const CalltoAction = () => {
  return (
    <div className="relative isolate overflow-hidden bg-background py-20">
      <div className="flex flex-col sm:flex-row justify-around items-center mx-10 px-6 lg:px-8">
        <div className="mx-auto lg:mx-0 w-6/12">
          <h2 className="mb-10 tracking-tight text-3xl w-7/12 text-black poppins-bold">
            Sonrisas Saludables, Vidas Felices
          </h2>
          <p className="mt-6 text-lg leading-8 text-black poppins-regular text-justify">
            En Somos Green Pol, brindamos cuidados odontológicos de excelencia,
            desde chequeos rutinarios y cirugías hasta odontopediatría y
            endodoncia. Creando un ambiente acogedor y seguro, hacemos que cada
            visita sea una experiencia agradable. Ven y descubre cómo lograr una
            sonrisa más saludable y radiante.
          </p>
          <div className="mt-40">
            <a href="">
              <button className="bg-acento p-3 rounded-lg poppins-semibold">
                Agendar turno
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center mx-auto w-6/12">
          <div className="bg-darkgray w-[500px] h-[500px] rounded-3xl shadow-2xl"></div>
        </div>
      </div>
    </div>
  );
};
