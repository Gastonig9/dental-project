import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css/sea-green";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  stars: number;
}

const mockReviews: Review[] = [
  {
    id: 1,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 2,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 4
  },
  {
    id: 3,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 4,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 5,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 6,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 7,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 4
  },
  {
    id: 8,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 9,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 10,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 11,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 12,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 13,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 14,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  },
  {
    id: 15,
    title: "Usuario",
    subtitle: "Subhead",
    description: "Please add your content here. Keep it short and simple. And smile :) ",
    stars: 5
  }
]

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch("/src/data/reviews.json")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews data:", error));
  }, []);

  return (
    <section className="bg-greenGradient text-[#3C3C43] pt-8 pb-3" id="reviews">
      {/* phones */}
      <div className="sm:hidden mx-auto max-w-[1648px]">
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1rem",
            perPage: 1,
          }}
        >

          {mockReviews.map((review) => (
            <SplideSlide key={review.id}>

              <div
                className="py-[16px] px-[24px] bg-white rounded-[20px] shadow-lg"
              >
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">
                  {review.description}
                </p>
                <h3 className="mt-2 xl:text-2xl">
                  {`⭐`.repeat(review.stars)}
                </h3>
              </div>
              <div className="splide__arrows hidden" />
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
            <SplideSlide key={review.id}>

              <div
                className="py-[16px] px-[24px] bg-white rounded-[20px] shadow-lg"
              >
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">
                  {review.description}
                </p>
                <h3 className="mt-2 xl:text-2xl">
                  {`⭐`.repeat(review.stars)}
                </h3>
              </div>
              <div className="splide__arrows hidden" />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* laptops */}
      <div className="hidden xl:block xl:w-full xl:mx-auto bg-transparent px-[80px] max-w-[1700px]">
        <Splide
          aria-label="My Favorite Images"
          options={{
            rewind: true,
            gap: "1.5rem",
            perPage: 5,
          }}
        >

          {mockReviews.map((review) => (
            <SplideSlide key={review.id}>
              <div
                className="py-[20px] 2xl:px-[25px]  px-[25px] 2xl:px-[35px] bg-white rounded-[20px] shadow-lg pb-10"

              >
                <div className="flex flex-col leading-6">
                  <p className="text-[19px] font-semibold">{review.title}</p>
                  <p className="text-[19px] font-semibold">{review.subtitle}</p>
                </div>
                <p className="mt-4 text-[16px] leading-5">
                  {review.description}
                </p>
                <h3 className="mt-2 xl:text-2xl 2xl:text-3xl">
                  {`⭐`.repeat(review.stars)}
                </h3>
              </div>
              <div className="splide__arrows hidden" />
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Reviews;
