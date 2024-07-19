import React, { useState } from "react";
import { OdontogramType } from "../../../../types/dtos/Patient/NewPatient.type";
import "../Odontogram.css";

interface EditOdontogramFormProps {
  odontogramData: OdontogramType[];
  setOdontogramData: React.Dispatch<React.SetStateAction<OdontogramType[]>>;
}

const FDI_TEETH_NUMBERS = new Set([
  18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 38, 37, 36,
  35, 34, 33, 32, 31, 48, 47, 46, 45, 44, 43, 42, 41, 51, 52, 53, 54, 55, 61,
  62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85,
]);
const VALID_PARTS = ["top", "left", "right", "bottom", "center"];
const VALID_REFS = [
  "Prestaciones Existentes",
  "Prestaciones Requeridas",
  "Diente ausente o a extraer",
  "Prótesis fija/removible",
  "Corona",
];

export const EditOdontogramForm: React.FC<EditOdontogramFormProps> = ({
  odontogramData,
  setOdontogramData,
}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const handleOdontogramChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedValue = name === "toothNumber" ? parseInt(value) : value;

    const updatedOdontogramData = odontogramData.map((tooth, i) =>
      i === index ? { ...tooth, [name]: updatedValue } : tooth
    );
    setOdontogramData(updatedOdontogramData);

    // Actualizar los errores
    const updatedErrors = validateOdontogram(updatedOdontogramData[index]);
    const newErrors = [...errors];
    newErrors[index] = updatedErrors;
    setErrors(newErrors);
  };

  const handlePartsChange = (
    index: number,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    let parts: string[] = [];

    if (value === "all") {
      parts = ["top", "bottom", "left", "right", "center"];
    } else if (VALID_PARTS.includes(value)) {
      parts = [value];
    }

    const updatedOdontogramData = odontogramData.map((tooth, i) =>
      i === index ? { ...tooth, parts } : tooth
    );
    setOdontogramData(updatedOdontogramData);

    // Actualizar los errores
    const updatedErrors = validateOdontogram(updatedOdontogramData[index]);
    const newErrors = [...errors];
    newErrors[index] = updatedErrors;
    setErrors(newErrors);
  };

  const validateOdontogram = (tooth: OdontogramType) => {
    const { toothNumber, parts, ref } = tooth;
    let errorMsg = "";
    if (!FDI_TEETH_NUMBERS.has(toothNumber)) {
      errorMsg = "Número de diente no válido.";
    } else if (
      parts.length === 0 ||
      !parts.every((part) => VALID_PARTS.includes(part))
    ) {
      errorMsg =
        parts.length === 0
          ? "Debe seleccionar una parte del diente."
          : "Parte del diente no válida.";
    } else if (!VALID_REFS.includes(ref)) {
      errorMsg = "Debe seleccionar una prestación dental.";
    }
    return errorMsg;
  };

  const addOdontogramField = () => {
    setOdontogramData([
      ...odontogramData,
      { toothNumber: 0, parts: [], ref: "" },
    ]);
    setErrors([...errors, ""]);
  };

  const deleteOdontogramField = (index: number) => {
    setOdontogramData(odontogramData.filter((_, i) => i !== index));
    setErrors(errors.filter((_, i) => i !== index));
  };

  return (
    <div className="mt-2 p-2 border border-[#424242] rounded-[8px] w-[290px] mb-2 max-h-[270px] overflow-y-auto">
      {odontogramData.map((tooth, index) => (
        <div key={index} className="mb-2">
          <div className="mb-2">
            <label
              htmlFor={`toothNumber-${index}`}
              className="block font-medium text-[13px]"
            >
              No. Diente:<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id={`toothNumber-${index}`}
              name="toothNumber"
              value={tooth.toothNumber}
              onChange={(e) => handleOdontogramChange(index, e)}
              required
              className="inputs-prestation shadow-sm"
            />
            {errors[index] === "Número de diente no válido." && (
              <p className="text-red-500 text-[13px]">{errors[index]}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor={`parts-${index}`}
              className="block font-medium text-[13px]"
            >
              Parte del Diente:<span className="text-red-500">*</span>
            </label>
            <select
              id={`parts-${index}`}
              name="parts"
              value={
                tooth.parts.length === 5 &&
                VALID_PARTS.every((part) => tooth.parts.includes(part))
                  ? "all"
                  : tooth.parts[0] || ""
              }
              onChange={(e) => handlePartsChange(index, e)}
              required
              className="inputs-prestation shadow-sm"
            >
              <option value="">Seleccione una parte</option>
              <option value="all">Todo el diente</option>
              <option value="top">Arriba</option>
              <option value="bottom">Abajo</option>
              <option value="left">Izquierda</option>
              <option value="right">Derecha</option>
              <option value="center">Centro</option>
            </select>
            {(errors[index] === "Debe seleccionar una parte del diente." ||
              errors[index] === "Parte del diente no válida.") && (
              <p className="text-red-500 text-[13px]">{errors[index]}</p>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor={`ref-${index}`}
              className="block font-medium text-[13px]"
            >
              Prestación Dental:<span className="text-red-500">*</span>
            </label>
            <select
              id={`ref-${index}`}
              name="ref"
              value={tooth.ref}
              onChange={(e) => handleOdontogramChange(index, e)}
              required
              className="inputs-prestation shadow-sm"
            >
              <option value="">Seleccione una prestación</option>
              <option value="Prestaciones Existentes">
                Prestaciones Existentes
              </option>
              <option value="Prestaciones Requeridas">
                Prestaciones Requeridas
              </option>
              <option value="Diente ausente o a extraer">
                Diente ausente o a extraer
              </option>
              <option value="Prótesis fija/removible">
                Prótesis fija/removible
              </option>
              <option value="Corona">Corona</option>
            </select>
            {errors[index] === "Debe seleccionar una prestación dental." && (
              <p className="text-red-500 text-[13px]">{errors[index]}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              className="bg-red-300 poppins-medium py-1 px-2 rounded-[5px] flex"
              type="button"
              onClick={() => deleteOdontogramField(index)}
            >
              Remover prestación
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          className="bg-acento poppins-medium py-1 px-2 rounded-[8px] flex"
          type="button"
          onClick={addOdontogramField}
        >
          Agregar prestación
        </button>
      </div>
    </div>
  );
};
