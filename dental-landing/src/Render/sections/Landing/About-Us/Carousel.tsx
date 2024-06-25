import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import { IoIosArrowBack } from "react-icons/io";

const Carousel = () => {
  const images = [
    "./public/imgs/about-us/carousel/1.jpg",
    "./public/imgs/about-us/carousel/2.jpg",
    "./public/imgs/about-us/carousel/3.jpg",
    "./public/imgs/about-us/carousel/4.jpg",
    "./public/imgs/about-us/carousel/5.jpg",
  ];

  return (
    <div className=" flex  justify-center ">
      <IoIosArrowBack />
      <Splide
        className=""
        aria-label="Dental Images Carousel"
        options={{
          arrow: true,
          type: "loop",
          drag: "free",
          perPage: 4,
          perMove: 1,
          focus: 0,
          autoplay: true,
          padding: { top: 100 },
          width: "100%",
          breakpoints: {
            640: {
              perPage: 2,
              gap: ".7rem",
              height: "300px",
            },
            480: {
              perPage: 1,
              gap: ".7rem",
              height: "150px",
            },
          },
        }}
      >
        {images.map((image, index) => (
          <SplideSlide className="">
            <div key={index} className="w-[360px] h-[515px] flex rounded-[50px] shadow-2xl">
              <picture className="relative shadow-2xl rounded-[50px] ">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="object-cover w-full h-full rounded-[50px] "
                />
              </picture>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};

export default Carousel;
