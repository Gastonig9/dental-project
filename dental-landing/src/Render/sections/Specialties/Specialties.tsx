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
      <section className="relative bg-lightgray md:py-[150px]">
        {/* Title */}
        {/* <div className="sectionTitle absolute top-[50px] left-[185px] ">
          <p className="poppins-regular text-[19px] lg:text-[28px] leading-[33.6px]">
            Especialidades
          </p>
        </div> */}
        {/* Specialties */}
        <div className=" grid xs:grid-cols-2 xs:py-8 md:p-0 xs:gap-4 lg:grid-cols-4 justify-items-center lg:mx-32">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="bg-[#FFF] rounded-[1.25rem] xs:w-[172px] xs:h-[178px] md:w-[295px] md:h-[304px] p-2 md:p-6 shadow-xl content-center"
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
