export const CalltoAction = () => {
  return (
    <div className="callToAction-bg-img relative isolate overflow-hidden py-10 bg-background lg:py-20">
      <div className="flex flex-col sm:flex-row justify-center items-center mx-auto px-6 lg:px-0">
        <div className="max-w-[590px] me-0 lg:me-16">
          <h2 className="cta-text mb-3 w-full text-[27px] lg:mb-20 tracking-tight lg:text-4xl lg:w-4/6 text-black poppins-bold">
            Sonrisas Saludables, Vidas Felices
          </h2>
          <p className="cta-text mt-0 lg:mt-5 text-[15px] lg:text-2xl leading-8 text-black poppins-regular text-justify">
            En Consultorios Odontológicos Grinpol, nos dedicamos a ofrecer
            cuidados odontológicos de excelencia. Nuestro equipo se compromete a
            proporcionar la más alta calidad en atención dental como así también
            nos esforzamos por hacer que cada visita sea una experiencia
            positiva y agradable. Lo invitamos a descubrir cómo podemos ayudarlo
            a lograr una sonrisa más saludable y radiante.
          </p>
          <div className="mt-4 lg:mt-20">
            <a href="" className="text-lg">
              <button className="bg-acento p-3 rounded-lg poppins-semibold">
                Agendar turno
              </button>
            </a>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center max-w-[795px]">
          <div className="w-[795px] h-[726px] bg-[url('assets/img/landing/dentists-smiling-posing-dental-clinic.png')] bg-no-repeat bg-center bg-cover rounded-3xl"></div>
        </div>
      </div>
    </div>
  );
};
