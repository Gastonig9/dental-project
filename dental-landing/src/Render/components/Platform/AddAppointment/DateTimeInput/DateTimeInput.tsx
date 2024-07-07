import React from "react";

export const DateTimeInput: React.FC<{
  onDateChange: (date: string) => void;
}> = ({ onDateChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    const formattedDate = date.toISOString();
    onDateChange(formattedDate);
  };

  return (
    <div className="w-full mt-5 flex justify-center">
      <div className="w-[72%] flex justify-around items-center rounded-[15px] bg-white shadow-lg border border-gray-300 p-4">
        <label className="text-[38px]" htmlFor="">Selecciona una fecha</label>
        <input
          type="datetime-local"
          className="w-[55%] text-[34px] bg-lightgray focus:outline-none focus:ring-2 focus:ring-acento focus:border-acento p-7 rounded-[10px] shadow-sm text-center"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
