import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";

const Reviews = () => {
  const mockReviews = [
    {
      id: 1,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
    {
      id: 2,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 3,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 4,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 5,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
    {
      id: 6,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
    {
      id: 7,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 8,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 9,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 10,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
    {
      id: 11,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
    {
      id: 12,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 13,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 14,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 4,
    },
    {
      id: 15,
      title: "Usuario",
      subtitle: "Subhead",
      description:
        "Please add your content here. Keep it short and simple. And smile :) ",
      stars: 5,
    },
  ];

  return (
    <section className="bg-[#f5f5f5] text-[#3C3C43] pt-8 pb-3">
      {/* phones */}
      <div className="sm:hidden mx-auto max-w-[1648px]" >
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1rem",
            perPage: 1,
          }}
        >
          {mockReviews.map((review) => (
            <SplideSlide>
              <div className="py-[16px] px-[24px] bg-white rounded-[20px] shadow-lg" key={review.id}>
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">{review.description}</p>
                <h3 className="mt-2 xl:text-2xl">{`⭐`.repeat(review.stars)}</h3>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* tablets */}
      <div className="hidden sm:block px-10 sm:mx-auto xl:hidden max-w-[1648px]">
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1rem",
            perPage: 2,
          }}
        >
          {mockReviews.map((review) => (
            <SplideSlide>
              <div className="py-[16px] px-[24px] bg-white rounded-[20px] shadow-lg" key={review.id}>
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">{review.description}</p>
                <h3 className="mt-2 xl:text-2xl">{`⭐`.repeat(review.stars)}</h3>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* laptops */}
      <div className="hidden xl:block xl:w-full xl:mx-auto bg-[#f5f5f5] px-[80px] max-w-[1648px]">
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1.5rem",
            perPage: 5,
          }}
        >
          {mockReviews.map((review) => (
            <SplideSlide>
              <div className="py-[16px] px-[24px] bg-white rounded-[20px] shadow-lg pb-10" key={review.id}>
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">{review.description}</p>
                <h3 className="mt-2 xl:text-2xl">{`⭐`.repeat(review.stars)}</h3>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Reviews;
