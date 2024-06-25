const specialties = [
  {
    name: "Odontología general",
    image: "./public/imgs/specialties/Odontología.png",
  },
  { name: "Cirugía", image: "./public/imgs/specialties/Cirugía.png" },
  {
    name: "Odontopediatría",
    image: "./public/imgs/specialties/Odontopediatra.png",
  },
  { name: "Endodoncia", image: "./public/imgs/specialties/Endodoncia.png" },
];

export const Specialties = () => {
  return (
    <>
      <section className="relative lg:bg-lightgray md:py-[150px] lg:border-[0.25px] lg:border-black">
        {/* Title */}
        <div className="sectionTitle absolute top-[23px] left-[20px] lg:top-[50px] lg:left-[185px]">
          <p className="poppins-semibold lg:poppins-regular text-[19px] lg:text-[28px] leading-[120%]">
            Especialidades
          </p>
        </div>
        {/* Specialties */}
        <div className=" grid grid-cols-2 pt-[102px] px-[17px] pb-3 gap-4 md:p-0 lg:grid-cols-4 justify-items-center lg:mx-32">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="bg-[#FFF] rounded-[1.25rem] w-[172px] h-[178px] md:w-[295px] md:h-[304px] p-2 md:p-6 shadow-2xl content-center"
            >
              {/* Images */}
              <picture className="flex justify-center px-6">
                <img
                  src={specialty.image}
                  alt={specialty.name}
                  className="w-[100px] md:w-[130px]"
                />
              </picture>
              {/* Specialty names */}
              <div className="flex justify-center">
                <p className="md:poppins-medium poppins-bold text-[13px] md:text-[23px] py-2 md:mt-[16px]">
                  {specialty.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
