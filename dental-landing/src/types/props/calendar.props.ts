/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventContentArg } from "@fullcalendar/core/index.js";

export interface EventContentProps {
    eventInfo: EventContentArg;
    handleChangeState: (eventInfo: EventContentArg, newState: 'CANCEL' | "REALIZED", message: string, flag?: boolean) => void;
    handleOpenUpdateWindow: any
}