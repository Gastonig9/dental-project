import { useEffect, useState } from "react";

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    const getCurrentDate = () => {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "America/Argentina/Buenos_Aires",
      };
      return date.toLocaleDateString("es-AR", options);
    };

    setCurrentDate(getCurrentDate());
  }, []);

  return currentDate;
};
