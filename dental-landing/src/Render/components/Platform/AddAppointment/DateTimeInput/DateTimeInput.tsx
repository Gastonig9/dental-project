import React from "react";

export const DateTimeInput: React.FC<{
  onDateChange: (date: string) => void;
}> = ({ onDateChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(event.target.value);
  };

  return (
    <div className="w-full mt-5 flex justify-center">
      <div className="w-full lg:w-[72%] flex flex-col lg:flex-row justify-around items-center rounded-[15px] bg-white shadow-lg border border-gray-300 p-4">
        <label className="text-[20px] md:text-[38px] mb-2 lg:mb-0" htmlFor="">
          Selecciona una fecha
        </label>
        <input
          type="date"
          className="w-full lg:w-[55%] text-[18px] md:text-[34px] bg-lightgray focus:outline-none focus:ring-2 focus:ring-acento focus:border-acento p-4 lg:p-7 rounded-[10px] shadow-sm text-center"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
