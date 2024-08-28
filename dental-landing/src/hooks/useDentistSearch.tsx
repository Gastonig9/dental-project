import { useState, useEffect } from "react";
import { dentistService } from "../services";
import { Dentist } from "../types/dtos/dentist/dentist.type";

export const useDentistSearch = () => {
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [dentistSelected, setDentistSelected] = useState<Dentist | null>(null);
  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await dentistService.getDentists();
        setDentists(response.data.dentists);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      }
    };
    fetchDentists();
  }, []);

  const handleDentistSelected = (dentist: Dentist) => {
    setDentistSelected(dentist);
  };

  return {
    dentists,
    dentistSelected,
    handleDentistSelected
  };
};
