import { FAQItem } from "../../components/Landing/FAQ/FAQItem";

export const FAQ = () => {
  return (
    <section className="text-typography flex flex-col justify-center items-start poppins-regular bg-background lg:px-[184px] px-2 lg:py-40 py-8">
      <div className="sectionTitle w-24 lg:w-44 lg:h-12">
        <p className="text-[21px] lg:text-[28px]">FAQ</p>
      </div>
      <div className="w-[100%] mx-auto text-[18px] lg:text-[28px]">
        <FAQItem></FAQItem>
      </div>
    </section>
  );
};
