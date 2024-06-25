export const CalltoAction = () => {
  return (
    <div className="callToAction-bg-img relative isolate overflow-hidden py-10 bg-background lg:py-20">
      <div className="flex flex-col sm:flex-row justify-center items-center mx-auto px-6 lg:px-8">
        <div className="max-w-xl me-0 lg:me-16">
          <h2 className="cta-text mb-3 w-full text-[27px] lg:mb-20 tracking-tight lg:text-4xl lg:w-4/6 text-black poppins-bold">
            Sonrisas Saludables, Vidas Felices
          </h2>
          <p className="cta-text mt-0 lg:mt-6 text-[15px] lg:text-2xl leading-8 text-black poppins-regular text-justify">
            En Somos Grinpol, brindamos cuidados odontológicos de excelencia,
            desde chequeos rutinarios y cirugías hasta odontopediatría y
            endodoncia. Creando un ambiente acogedor y seguro, hacemos que cada
            visita sea una experiencia agradable. Ven y descubre cómo lograr una
            sonrisa más saludable y radiante.
          </p>
          <div className="mt-4 lg:mt-32">
            <a href="" className="text-lg">
              <button className="bg-acento p-3 rounded-lg poppins-semibold">
                Agendar turno
              </button>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center max-w-2xl">
          <div className="w-[550px] h-[550px] bg-[url('assets/img/landing/dentists-smiling-posing-dental-clinic.png')] bg-no-repeat bg-center bg-cover rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};
