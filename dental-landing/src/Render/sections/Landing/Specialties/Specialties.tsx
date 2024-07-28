import { useEffect, useState } from "react";

interface Specialty {
  name: string;
  image: string;
}

export const Specialties = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);

  useEffect(() => {
    fetch("/specialties.json")
      .then((response) => response.json())
      .then((data) => {
        setSpecialties(data);
      })
      .catch((error) =>
        console.error("Error fetching specialties data:", error)
      );
  }, []);

  return (
    <>
      <main
        style={{
          background: "linear-gradient(135deg, #81FBB8 0%, #28C76F 100%)",
        }}
        className="relative pt-[55px] md:pt-[50px] md:pb-[120px] lg:px-[97px]"
      >
        <section className="xl:max-w-[1530px] mx-auto">
          {/* Title*/}
          <div className="sectionTitle2 w-[188px] ml-[15px] lg:ml-0 lg:w-[251px] lg:h-12 lg:mb-[52px]">
            <p
              className="text-[19px] lg:text-[28px] leading-[120%]"
              id="especialidades"
            >
              Especialidades
            </p>
          </div>
          <div className="flex justify-center content-center mx-auto">
            {/* Specialties */}
            <div className=" grid grid-cols-2 pt-[45px] pb-[50px] gap-4 lg:gap-[115px] md:pb-0 newxl::px-0 lg:grid-cols-4 justify-items-center">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="bg-[#FFF] rounded-[1.25rem] w-[172px] h-[178px] newxl:w-[295px] newxl:h-[304px] p-2 newxl:p-6 shadow-2xl content-center"
                >
                  {/* Images */}
                  <picture className="flex justify-center px-6">
                    <img
                      src={specialty.image}
                      alt={specialty.name}
                      className="w-[100px] xl:w-[130px]"
                    />
                  </picture>
                  {/* Specialty names */}
                  <div className="flex justify-center">
                    <p className="md:poppins-medium poppins-bold text-[13px] newxl:text-[23px] py-2 md:mt-[16px]">
                      {specialty.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
