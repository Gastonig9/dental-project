import React from "react";

export const DateTimeInput: React.FC<{ onDateChange: (date: string) => void }> = ({ onDateChange }) => {
  return (
    <div className="w-[72%] mt-5 flex justify-center rounded-[10px] bg-lightgray border border-[#424242] p-5">
      <input
        type="datetime-local"
        className="w-[50%] text-[33px] bg-lightgray focus:outline-none focus:ring-2 focus:ring-[#76ffa8] focus:border-[#76ffa8] p-3"
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
};
