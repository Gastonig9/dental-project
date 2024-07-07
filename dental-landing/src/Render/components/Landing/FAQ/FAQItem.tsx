import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQInfo: FAQItem[] = [
  {
    question: "¿Cuáles son los servicios dentales que ofrecen?",
    answer:
      "Ofrecemos una amplia gama de servicios dentales que incluyen limpiezas dentales, empastes, tratamientos de conducto, extracciones, coronas dentales, blanqueamiento dental, ortodoncia, implantes dentales, entre otros.",
  },
  {
    question: "¿Cuáles son los horarios de atención del consultorio?",
    answer:
      "Nuestro consultorio está abierto de lunes a viernes de [horario de apertura] a [horario de cierre]. Para conocer los horarios específicos de cada dentista y su disponibilidad, te recomendamos contactarnos directamente.",
  },
  {
    question: "¿Cómo puedo agendar una cita?",
    answer:
      "Puedes agendar una cita llamando a nuestro consultorio al [número de whatsApp] o utilizando nuestro sistema de citas en línea en [URL del sitio web].",
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