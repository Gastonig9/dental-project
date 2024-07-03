import React from "react";
import { SelectInputProps } from "../../../../../types/props/add-appointment.props";

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  options,
  selectDentist,
  selectReason,
  titleSelect,
  mtInput
}) => {
  return (
    <div className={`w-[30%] rounded-[15px] bg-lightgray border border-[#424242] mt-${mtInput}`}>
      <select
        id={id}
        className="w-full rounded-[15px] bg-lightgray p-4 focus:outline-none focus:ring-2 focus:ring-[#76ffa8] focus:border-[#76ffa8] text-[25px]"
        onChange={(e) => {
          const selectedIndex = e.target.selectedIndex;
          if (selectDentist && selectedIndex > 0) {
            const selectedOption = options[selectedIndex - 1];
            if (typeof selectedOption !== "string") {
              selectDentist(selectedOption);
            }
          }
          if (selectReason) {
            const selectedOption = e.target.value;
            selectReason(selectedOption);
          }
        }}
      >
        <option>{titleSelect}</option>
        {options.map((option, index) =>
          typeof option === "string" ? (
            <option key={index}>{option}</option>
          ) : (
            <option key={option.id}>Dr. {option.fullname}</option>
          )
        )}
      </select>
    </div>
  );
};
