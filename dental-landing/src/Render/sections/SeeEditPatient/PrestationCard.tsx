// PrestationCards.tsx
import React from "react";
import { Prestations } from "../../../types/dtos/Patient/NewPatient.type";

interface PrestationCardsProps {
  prestations: Prestations[];
}

const PrestationCards: React.FC<PrestationCardsProps> = ({ prestations }) => {
  return (
    <section className="flex-col gap-4 max-h-[500px] overflow-scroll w-[500px] pl-9">
      {prestations.map((prestation) => (
        <div
          key={prestation.patientId}
          className="card card-content"
          onClick={() => {}}
        >
          <div className="item">
            <p className="item-title">Fecha</p>
            <p className="poppins-semibold text-[16px]">{prestation.date}</p>
          </div>
          <div className="item">
            <p className="item-title">Código</p>
            <p className="poppins-semibold text-[16px]">{prestation.code}</p>
          </div>
          <div className="item">
            <p className="item-title">Observaciones</p>
            <p className="poppins-semibold text-[16px]">
              {prestation.observations}
            </p>
          </div>
          <p className="item item-title">{prestation.state}</p>
        </div>
      ))}
    </section>
  );
};

export default PrestationCards;
