import React from "react";
import Tooth from "./Tooth";
import { usePatientContext } from "../../pages/contexts/patientContext";
import { ToothState } from "../../../types/dtos/Patient/NewPatient.type";

const Odontogram: React.FC = () => {
  const { patientData, setPatientData } = usePatientContext();

  const handleToothClick = (
    toothNumber: number,
    position: keyof ToothState
  ) => {
    if (!patientData) return;

    const currentState = patientData.teeth[toothNumber]?.[position] || "";
    let newState = "";

    switch (currentState) {
      case "Prestaciones Existentes":
        newState = "Prestaciones Requeridas";
        break;
      case "Prestaciones Requeridas":
        newState = "Diente ausente o a extraer";
        break;
      case "Diente ausente o a extraer":
        newState = "Prótesis fija/removible";
        break;
      case "Prótesis fija/removible":
        newState = "Corona";
        break;
      case "Corona":
        newState = "";
        break;
      default:
        newState = "Prestaciones Existentes";
        break;
    }

    setPatientData((prevData: any) => ({
      ...prevData,
      teeth: {
        ...prevData.teeth,
        [toothNumber]: {
          ...(prevData.teeth[toothNumber] || {
            center: "",
            top: "",
            bottom: "",
            left: "",
            right: "",
          }),
          [position]: newState,
        },
      },
    }));
  };

  const adultTeeth = [
    [18, 17, 16, 15, 14, 13, 12, 11],
    [21, 22, 23, 24, 25, 26, 27, 28],
    [48, 47, 46, 45, 44, 43, 42, 41],
    [31, 32, 33, 34, 35, 36, 37, 38],
  ];

  const pediatricTeeth = [
    [55, 54, 53, 52, 51],
    [61, 62, 63, 64, 65],
    [85, 84, 83, 82, 81],
    [71, 72, 73, 74, 75],
  ];

  return (
    <div>
      <div className="flex justify-center space-x-8 mb-4">
        {adultTeeth.slice(0, 2).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.map((toothNumber) => (
              <Tooth
                key={toothNumber}
                number={toothNumber}
                handleClick={handleToothClick}
                state={
                  patientData?.teeth[toothNumber] || {
                    center: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: "",
                  }
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-8 mb-4">
        {pediatricTeeth.map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.map((toothNumber) => (
              <Tooth
                key={toothNumber}
                number={toothNumber}
                handleClick={handleToothClick}
                state={
                  patientData?.teeth[toothNumber] || {
                    center: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: "",
                  }
                }
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex justify-center space-x-8">
        {adultTeeth.slice(2).map((row, rowIndex) => (
          <div key={rowIndex} className="flex space-x-1">
            {row.map((toothNumber) => (
              <Tooth
                key={toothNumber}
                number={toothNumber}
                handleClick={handleToothClick}
                state={
                  patientData?.teeth[toothNumber] || {
                    center: "",
                    top: "",
                    bottom: "",
                    left: "",
                    right: "",
                  }
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Odontogram;
