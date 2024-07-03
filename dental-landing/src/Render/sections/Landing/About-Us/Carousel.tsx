import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

const Carousel = () => {
  const splideStyles = {
    padding: 0,
    paddingBottom: "1.5rem",
  };

  const images = [
    "/src/assets/img/landing/about-us/carousel/1.jpg",
    "/src/assets/img/landing/about-us/carousel/2.jpg",
    "/src/assets/img/landing/about-us/carousel/3.jpg",
    "/src/assets/img/landing/about-us/carousel/4.jpg",
    "/src/assets/img/landing/about-us/carousel/5.jpg",
  ];

  return (
    <section className="py-[57px] lg:pt-[213px]">
      <Splide
        style={splideStyles}
        aria-label="Dental Images Carousel"
        options={{
          type: "loop",
          drag: "free",
          perPage: 4,
          perMove: 1,
          focus: 0,
          autoplay: true,
          breakpoints: {
            390: {
              perPage: 2,
            },
            768: {
              perPage: 3,
            },
          },
        }}
      >
        {images.map((image, index) => (
          <SplideSlide>
            <div key={index} className="flex justify-center">
              <picture className="relative h-[269px] w-[180px] lg:w-[360px] lg:h-[515px]">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="object-cover w-full h-full rounded-[10px] lg:rounded-[50px] shadow-2xl"
                />
              </picture>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
};

export default Carousel;
