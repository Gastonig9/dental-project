import React from "react";
import { Prestations } from "../../../../types/dtos/Patient/NewPatient.type";
import "../../../../Features/utils/stringExtensions";

interface PrestationCardsProps {
  prestations: Prestations[];
}

const PrestationCards: React.FC<PrestationCardsProps> = ({ prestations }) => {
  return (
    <section className="flex-col gap-4 max-h-[500px] overflow-y-auto w-[500px] pl-9 no-scroll">
      {prestations.map((prestation) => (
        <div key={prestation.patientId} className="card card-content ">
          <div className="card-stick"></div>
          <div className="item">
            <p className="item-title">Fecha</p>
            <p className="poppins-semibold text-[16px]">
              {prestation.date.replace(/-/g, "/")}
            </p>
          </div>
          <div className="item">
            <p className="item-title">Código</p>
            <p className="poppins-semibold text-[16px] no-scroll">
              {prestation.code}
            </p>
          </div>
          <div className="item">
            <p className="item-title">Observaciones</p>
            <p className="poppins-semibold text-[16px] no-scroll">
              {prestation.observations}
            </p>
          </div>
          {/* <p
            className={`item item-title ${
              prestation.state === "PENDING"
                ? "text-green-500"
                : "text-yellow-500"
            }`}
          >
            {prestation.state.capitalize()}
          </p> */}
        </div>
      ))}
    </section>
  );
};

export default PrestationCards;
