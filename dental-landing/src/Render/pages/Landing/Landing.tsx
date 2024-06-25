import WhatsappBtn from "../../components/Landing/WhatsappBtn";
import { Header } from "../../components/UI/Header/Header";
import { AboutUs } from "../../sections/About-Us/AboutUs";
import { CalltoAction } from "../../sections/Landing/CallToAction";
import { FAQ } from "../../sections/Landing/FAQ";
import { Footer } from "../../sections/Landing/Footer";
import { Specialties } from "../../sections/Specialties/Specialties";

export const Landing = () => {
  return (
    <>
    <Header></Header>
    <CalltoAction></CalltoAction>
    <Specialties></Specialties>
    <AboutUs></AboutUs>
    <FAQ></FAQ>
    <Footer></Footer>
    <WhatsappBtn></WhatsappBtn>
    </>
  );
};
