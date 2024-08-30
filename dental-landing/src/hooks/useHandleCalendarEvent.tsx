/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useHandleCalendarEvent = () => {
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const [openUpdateWindow, setOpenUpdateWindow] = useState(false);
    const handleOpenUpdateWindow = (event: any) => {
        setSelectedEvent(event);
        setOpenUpdateWindow(true);
      };
  return {
    selectedEvent,
    openUpdateWindow,
    handleOpenUpdateWindow,
    setOpenUpdateWindow
  }
}
