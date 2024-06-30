import React from "react";
import { FaTimes, FaSquare, FaCircle } from "react-icons/fa";

interface Tooth {
  id: number;
  state: number;
}

interface OdontogramProps {
  teethStates: { [key: number]: number };
}

const Odontogram: React.FC<OdontogramProps> = ({ teethStates }) => {
  const renderToothState = (state: number) => {
    switch (state) {
      case 2:
        return "bg-red-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return <FaTimes className="text-red-500" />;
      case 5:
        return <FaSquare className="text-black" />;
      case 6:
        return <FaCircle className="text-yellow-500" />;
      default:
        return "bg-white";
    }
  };

  const renderTeeth = (start: number, end: number) => {
    const teethNumbers = Array.from(
      { length: Math.abs(start - end) + 1 },
      (_, i) => (start > end ? start - i : start + i)
    );
    return (
      <div className="flex justify-center mb-4">
        {teethNumbers.map((number) => (
          <div key={number} className="flex flex-col-reverse items-center mx-2">
            <div
              className={`w-10 h-10 border rounded-full ${renderToothState(
                teethStates[number] || 1
              )} flex items-center justify-center`}
            >
              {teethStates[number] === 4 ||
              teethStates[number] === 5 ||
              teethStates[number] === 6
                ? renderToothState(teethStates[number])
                : null}
            </div>
            <span className="mt-1">{number}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 flex flex-col md:flex-row justify-center">
      {/* Lado Izquierdo */}
      <div className="flex-1a">
        {/* Cuadrantes Superiores Izquierdo */}
        {renderTeeth(18, 11)}
        {/* Cuadrantes Inferiores Izquierdo */}
        {renderTeeth(48, 41)}
        {/* Cuadrantes Pediátricos Izquierdo */}
        {renderTeeth(55, 51)}
        {renderTeeth(85, 81)}
      </div>
      <div className="w-[2px] bg-gray-200 h-[320px]"></div>
      {/* Lado Derecho */}
      <div className="">
        {/* Cuadrantes Superiores Derecho */}
        {renderTeeth(21, 28)}
        {/* Cuadrantes Inferiores Derecho */}
        {renderTeeth(31, 38)}
        {/* Cuadrantes Pediátricos Derecho */}
        {renderTeeth(61, 65)}
        {renderTeeth(71, 75)}
      </div>
    </div>
  );
};

export default Odontogram;
