import { Footer } from "../../components/UI/Footer/Footer";
import { Header } from "../../components/UI/Header/Header";
import { CalltoAction } from "../../sections/Landing/CallToAction";
import { FAQ } from "../../sections/Landing/FAQ";

export const Landing = () => {
  return (
    <>
      <Header></Header>
      <CalltoAction></CalltoAction>
      <FAQ></FAQ>
      <Footer></Footer>
    </>
  );
};
