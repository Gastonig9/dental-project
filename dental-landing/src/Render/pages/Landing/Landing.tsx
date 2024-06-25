import WhatsappBtn from "../../components/Landing/WhatsappBtn";
import { Header } from "../../components/UI/Header/Header";
import { AboutUs } from "../../sections/Landing/About-Us/AboutUs";
import { CalltoAction } from "../../sections/Landing/CallToAction";
import { FAQ } from "../../sections/Landing/FAQ";
import { Footer } from "../../sections/Landing/Footer";
import Reviews from "../../sections/Landing/Reviews";
import { Specialties } from "../../sections/Landing/Specialties/Specialties";


export const Landing = () => {
  return (
    <>
      <Header />
      <CalltoAction />
      <Specialties />
      <AboutUs />
      <Reviews />
      <FAQ />
      <Footer />
      <WhatsappBtn /> 
    </>
  );
};
