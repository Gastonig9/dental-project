import React from "react";
import { ButtonProps } from "../../../../types/props/button.props";
import { Link } from "react-router-dom";

export const Button: React.FC<ButtonProps> = ({
  justifyButton,
  widthButton,
  titleButton,
  onAction,
  isLink = true,
  widthContain,
  marginTop
}) => {
  return (
    <div className={`w-${widthContain} flex justify-${justifyButton} mt-${marginTop}`}>
      {isLink ? (
        <Link to="/create-appointment">
          <button
            onClick={onAction}
            className={`w-${widthButton} bg-acento p-3 hover:bg-green-500 text[19px] font-bold rounded-[10px] py-2 px-4`}
          >
            {titleButton}
          </button>
        </Link>
      ) : (
        <button
          onClick={onAction}
          className={`w-${widthButton} bg-acento p-3 hover:bg-green-500 text[19px] font-bold rounded-[10px] py-2 px-4`}
        >
          {titleButton}
        </button>
      )}
    </div>
  );
};
