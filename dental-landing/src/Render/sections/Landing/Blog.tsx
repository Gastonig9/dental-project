// import React from "react";
import GreenTitle from "../../components/Landing/GreenTitle";
import BlogCard from "../../components/Landing/Blog/BlogCard";
import pic1 from "../../../assets/blog-pic-1.webp";
import pic3 from "../../../assets/blog-pic-3.webp";
import pic4 from "../../../assets/blog-pic-4.webp";



const Blog = () => {
  return (
    <section className="bg-lightgray p-5 md:px-[150px] py-10">
      <div className="max-w-[1500px] mx-auto">
        {/* title */}
        <GreenTitle text={"Blog"} />

        {/* cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-[80px] mt-8 ">
          <BlogCard
            picture={pic1}
            title="Cuidando Tu Sonrisa Día a Día: La Importancia de la Odontologóa General."
            description="Descubre cómo los chequeos rutinarios y los tratamientos preventivos en odontología general pueden ayudarte a mantener una salud bucal óptima."
          />

          <BlogCard
            picture={pic4}
            title="Cuidando Tu Sonrisa Día a Día: La Importancia de la Odontologóa General."
            description="Descubre cómo los chequeos rutinarios y los tratamientos preventivos en odontología general pueden ayudarte a mantener una salud bucal óptima."
          />

          <BlogCard
            picture={pic3}
            title="Sonrisas Felices desde la Infancia: La Odontopediatría en Somos Green Pol"
            description="Explora cómo la odontopediatría contribuye al desarrollo de una sonrisa saludable en tus hijos."
          />

          <BlogCard
            picture={pic4}
            title="Salvando Dientes, Recuperando Sonrisas: Todo sobre la Endodoncia"
            description="Infórmate sobre los tratamientos de endodoncia y cómo pueden salvar dientes dañados o infectados."
          />
        </div>
      </div>

    </section>
  );
};

export default Blog;
