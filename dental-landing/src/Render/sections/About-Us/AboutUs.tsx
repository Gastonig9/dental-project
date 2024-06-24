import { DocPhoto } from "../../components/About-Us/DocPhoto";
import { UsText } from "../../components/About-Us/UsText";
// import Carousel from "./Carousel";

// const images = [
//   "./public/imgs/about-us/carousel/1.jpg",
//   "./public/imgs/about-us/carousel/2.jpg",
//   "./public/imgs/about-us/carousel/3.jpg",
//   "./public/imgs/about-us/carousel/4.jpg",
//   "./public/imgs/about-us/carousel/5.jpg",
// ];

export const AboutUs = () => {
  return (
    <>
      <div className="relative">
        {/* Section Title */}
        <div className="absolute top-[183px] left-[183px] sectionTitle">
          <p className="poppins-regular text-[28px]">Nosotros</p>
        </div>
        {/* Text */}
        <UsText></UsText>
        {/* Photo */}
        <DocPhoto></DocPhoto>
        {/* Carousel */}
        <div className="flex justify-center ">
          <div className=" ">{/* <Carousel images={images}></Carousel> */}</div>
        </div>
      </div>
    </>
  );
};
