import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQInfo: FAQItem[] = [
  {
    question:
      "¿Qué tratamientos dentales puedes encontrar en nuestro consultorio?",
    answer:
      "Ofrecemos una amplia gama de tratamientos que incluyen limpiezas dentales, ortodoncia, implantes y procedimientos estéticos como el blanqueamiento dental.",
  },
  {
    question: "¿Cuándo puedes visitarnos?",
    answer:
      "Puedes visitarnos de lunes a viernes de 9:00 a.m. hasta  las 6:00 p.m., o los sábados desde las 9:00 a.m. hasta las 2:00 p.m. Estamos aquí para atenderte en el horario que más te convenga.",
  },
  {
    question: "¿Cúal es el proceso para reservar tu próxima cita?",
    answer:
      "Puedes reservar tu cita utilizando el botón “Agendar turno” en la parte superior o el botón de WhatsApp. Ambos te conectarán directamente con nuestro personal para una conversación inmediata.",
  },
  {
    question: "¿Cuánto tiempo debo esperar para obtener una cita?",
    answer:
      "Nos esforzamos por ofrecer citas lo antes posible. El tiempo de espera puede variar según la especialidad y la disponibilidad del dentista. Te recomendamos que nos contactes con anticipación para programar tu cita.",
  },
  {
    question: "¿Cuál es la política de cancelación de citas?",
    answer:
      "Agradecemos que nos notifiques con al menos [número de horas/días] de anticipación si necesitas cancelar o reprogramar tu cita para evitar cargos adicionales.",
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className=" border border-black rounded-lg mb-2 bg-lightgray">
      <button
        onClick={onClick}
        className="w-full text-left p-5 lg:p-10 flex justify-between items-center"
      >
        <span>{question}</span>
        <span>{isOpen ? "-" : "+"}</span>
      </button>
      {isOpen && <p className="pb-8 px-8">{answer}</p>}
    </div>
  );
};

const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="mx-0 my-8">
      <div>
        {FAQInfo.map((item, index) => (
          <AccordionItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export const FAQItem: React.FC = () => {
  return (
    <div className="pt-0 lg:p-4">
      <Accordion />
    </div>
  );
};
