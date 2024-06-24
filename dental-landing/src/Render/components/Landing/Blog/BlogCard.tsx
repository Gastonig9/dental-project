import React from "react";

interface CardInfo {
  picture: string;
  title: String;
  description: String;
}

const BlogCard = ({ picture, title, description }: CardInfo) => {
  return ( 
    <div className="bg-white rounded-xl max-w-[342px] shadow-lg mx-auto text-justify">
      <img src={picture} alt="Consultorio odontológico" className="w-full"/>
      <div className="p-5 flex flex-col gap-3">
        <div className="border-b-2 pb-3">
          <h3 className="poppins-medium">{title}</h3>
          <p className="text-sm mt-3 text-[#666] ">{description}</p>
        </div>
        <button className="bg-acento hover:bg-emerald-500 px-4 rounded-xl border border-black text-white self-start mt-1">Más Info</button>
      </div>
    </div>
  );
};

export default BlogCard;
