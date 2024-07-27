import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import image1 from "/src/assets/img/landing/about-us/carousel/1.jpg";
import image2 from "/src/assets/img/landing/about-us/carousel/2.jpg";
import image3 from "/src/assets/img/landing/about-us/carousel/3.jpg";
import image4 from "/src/assets/img/landing/about-us/carousel/4.jpg";
import image5 from "/src/assets/img/landing/about-us/carousel/5.jpg";

const images = [image1, image2, image3, image4, image5];

const Carousel = () => {
  const splideStyles = {
    padding: 0,
    paddingBottom: "1.5rem",
  };

  return (
    <section className="pt-[57px] pb-[47px] lg:pt-[213px]">
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
            580: { perPage: 2 },
            1280: { perPage: 3 },
          },
        }}
      >
        {images.map((image, index) => (
          <SplideSlide>
            <div key={index} className="flex justify-center pb-10">
              <picture className="relative h-[269px] w-[180px] md:h-[390px] md:w-[270px] newxl:h-[515px] newxl:w-[360px] ">
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="object-cover w-full h-full rounded-[10px] xl:rounded-[30px] shadow-2xl"
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
