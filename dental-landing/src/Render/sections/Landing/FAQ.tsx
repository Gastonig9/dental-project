import { FAQItem } from "../../components/Landing/FAQ/FAQItem";

export const FAQ = () => {
  return (
    <main className=" bg-background" id="faq">
    <section className="text-typography flex flex-col justify-center items-start poppins-regular lg:px-[184px] px-2 lg:py-40 py-8 mx-auto max-w-[1900px]">
      <div className="sectionTitle w-24 lg:w-[22rem] lg:h-12">
        <p className="text-[21px] lg:text-[28px]">Preguntas frecuentes</p>
      </div>
      <div className="w-[100%] mx-auto text-[18px] lg:text-[24px]">
        <FAQItem></FAQItem>
      </div>
    </section>
    </main>
  );
};
