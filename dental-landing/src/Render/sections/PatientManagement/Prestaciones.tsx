import React, { useState } from "react";
import Odontogram from "../../components/PatientManagement/Odontogram";

interface DropdownItem {
  id: number;
  toothNumber: number | null;
  prestation: string | null;
}

interface Prescriptions {
  id: number;
  prescriptions: Array<{ diente: number; prestacion: string }>;
}

const Prestaciones: React.FC = () => {
  const [dropdowns, setDropdowns] = useState<DropdownItem[]>([]);
  const [teethStates, setTeethStates] = useState<{ [key: number]: number }>({});
  const [prescriptions, setPrescriptions] = useState<Prescriptions[]>([]);
  const maxDropdowns = 32;
  const appointmentId = 1; // Ejemplo de ID de paciente

  const addDropdown = () => {
    if (dropdowns.length < maxDropdowns) {
      setDropdowns([
        ...dropdowns,
        { id: dropdowns.length + 1, toothNumber: null, prestation: null },
      ]);
    }
  };

  const handleDropdownChange = (
    id: number,
    field: "toothNumber" | "prestation",
    value: any
  ) => {
    const updatedDropdowns = dropdowns.map((dropdown) =>
      dropdown.id === id ? { ...dropdown, [field]: value } : dropdown
    );
    setDropdowns(updatedDropdowns);

    const dropdown = updatedDropdowns.find((dropdown) => dropdown.id === id);
    if (dropdown?.toothNumber && dropdown?.prestation) {
      updateTeethStates(dropdown.toothNumber, dropdown.prestation);
      updatePrescriptions(dropdown.toothNumber, dropdown.prestation);
    }
  };

  const updateTeethStates = (toothNumber: number, prestation: string) => {
    let state;
    switch (prestation) {
      case "Prestaciones Existentes":
        state = 2;
        break;
      case "Prestaciones requeridas":
        state = 3;
        break;
      case "Diente ausente o a extraer":
        state = 4;
        break;
      case "Prótesis fija/removible":
        state = 5;
        break;
      case "Corona":
        state = 6;
        break;
      default:
        state = 1;
    }
    setTeethStates({ ...teethStates, [toothNumber]: state });
  };

  const updatePrescriptions = (toothNumber: number, prestation: string) => {
    setPrescriptions((prevPrescriptions) => {
      const patientPrescriptions = prevPrescriptions.find(
        (p) => p.id === appointmentId
      );
      if (patientPrescriptions) {
        return prevPrescriptions.map((p) =>
          p.id === appointmentId
            ? {
                ...p,
                prescriptions: [
                  ...p.prescriptions,
                  { diente: toothNumber, prestacion: prestation },
                ],
              }
            : p
        );
      } else {
        return [
          ...prevPrescriptions,
          {
            id: appointmentId,
            prescriptions: [{ diente: toothNumber, prestacion: prestation }],
          },
        ];
      }
    });
  };

  const adultTeeth = [
    18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46,
    45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38,
  ];

  const pediatricTeeth = [
    55, 54, 53, 52, 51, 61, 62, 63, 64, 65, 85, 84, 83, 82, 81, 71, 72, 73, 74,
    75,
  ];

  return (
    <div className="p-4">
      <button
        onClick={addDropdown}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Agregar
      </button>
      <div className="mt-4 max-h-96 overflow-y-scroll">
        {dropdowns.map((dropdown) => (
          <div key={dropdown.id} className="mb-4">
            <div className="mb-2">
              <label
                htmlFor={`tooth-${dropdown.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                No. Diente
              </label>
              <select
                id={`tooth-${dropdown.id}`}
                value={dropdown.toothNumber || ""}
                onChange={(e) =>
                  handleDropdownChange(
                    dropdown.id,
                    "toothNumber",
                    Number(e.target.value)
                  )
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Seleccione un número
                </option>
                {adultTeeth.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
                {pediatricTeeth.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor={`prestation-${dropdown.id}`}
                className="block text-sm font-medium text-gray-700"
              >
                Prestación
              </label>
              <select
                id={`prestation-${dropdown.id}`}
                value={dropdown.prestation || ""}
                onChange={(e) =>
                  handleDropdownChange(
                    dropdown.id,
                    "prestation",
                    e.target.value
                  )
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="" disabled>
                  Seleccione una prestación
                </option>
                <option value="Prestaciones Existentes">
                  Prestaciones Existentes
                </option>
                <option value="Prestaciones requeridas">
                  Prestaciones requeridas
                </option>
                <option value="Diente ausente o a extraer">
                  Diente ausente o a extraer
                </option>
                <option value="Prótesis fija/removible">
                  Prótesis fija/removible
                </option>
                <option value="Corona">Corona</option>
              </select>
            </div>
          </div>
        ))}
      </div>
      <Odontogram teethStates={teethStates} />
    </div>
  );
};

export default Prestaciones;
