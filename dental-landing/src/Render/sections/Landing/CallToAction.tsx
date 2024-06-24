export const CalltoAction = () => {
  return (
    <div className="relative isolate overflow-hidden bg-background py-20">
      <div className="flex flex-col sm:flex-row justify-center items-center mx-auto px-6 lg:px-8">
        <div className="max-w-xl me-16">
          <h2 className="mb-20 tracking-tight text-4xl w-4/6 text-black poppins-bold">
            Sonrisas Saludables, Vidas Felices
          </h2>
          <p className="mt-6 text-2xl leading-8 text-black poppins-regular text-justify">
            En Somos Grinpol, brindamos cuidados odontológicos de excelencia,
            desde chequeos rutinarios y cirugías hasta odontopediatría y
            endodoncia. Creando un ambiente acogedor y seguro, hacemos que cada
            visita sea una experiencia agradable. Ven y descubre cómo lograr una
            sonrisa más saludable y radiante.
          </p>
          <div className="mt-32">
            <a href="" className="text-lg">
              <button className="bg-acento p-3 rounded-lg poppins-semibold">
                Agendar turno
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-center items-center max-w-2xl">
          <div className="w-[550px] h-[550px] bg-[url('assets/img/landing/dentists-smiling-posing-dental-clinic.png')] bg-no-repeat bg-center bg-cover rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};
