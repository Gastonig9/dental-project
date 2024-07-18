import { FaCircle } from "react-icons/fa6";

export const Reference = () => {
  return (
    <div className="flex-fow py-[15px] pl-[15px] text-[12px] border-black border-[1px] h-[216px] w-[211px] rounded-[30px] absolute left-[37.9%] mt-[40px]">
      <h2 className="text-[16px] poppins-semibold mb-3">Referencias</h2>
      <div className="flex gap-2 mb-3">
        <FaCircle fill="#ff0000" />
        Prestaciones Existentes
      </div>
      <div className="flex gap-2 mb-3">
        <FaCircle fill="#0000ff" />
        Prestaciones Requeridas
      </div>
      <div className="flex gap-2 mb-3">
        <FaCircle fill="#000000" />
        Diente ausente o a extraer
      </div>
      <div className="flex gap-2 mb-3">
        <FaCircle fill="#008000" />
        Prótesis fija/removible
      </div>
      <div className="flex gap-2">
        <FaCircle fill="#ffd700" />
        Corona
      </div>
    </div>
  );
};
