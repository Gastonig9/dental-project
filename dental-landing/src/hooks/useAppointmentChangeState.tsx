/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import { appointmentsServices } from "../services";

export const useAppointmentChangeState = (setAppointments: any) => {
  const handleChangeState = async (
    eventInfo: any,
    newState: "CANCEL" | "REALIZED",
    message: string,
    flag: boolean = true
  ) => {
    const result = await Swal.fire({
      title: message,
      text: `${
        flag
          ? "Se enviará un aviso al paciente en caso de eliminar el turno"
          : "Se eliminará de esta vista en caso de presionar “Finalizado”"
      }`,
      showCancelButton: true,
      confirmButtonColor: `${flag ? "#A10000" : "#76FFA8"}`,
      cancelButtonColor: "#F5F5F5",
      confirmButtonText: `${flag ? "Eliminar" : "Finalizado"}`,
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: `${
          flag ? "custom-confirm-button-black" : "custom-confirm-button-white"
        }`,
        cancelButton: "custom-cancel-button",
      },
    });

    if (result.isConfirmed) {
      const id = parseInt(eventInfo.event.id);
      const data = { appointmentId: id, state: newState };

      try {
        const response = await appointmentsServices.changeAppointmentState(
          data
        );

        if (response.status === 200) {
          Swal.fire(
            `Turno ${flag ? "cancelado" : "finalizado"}`,
            `El turno ha sido ${flag ? "cancelado" : "finalizado"} con éxito.`,
            "success"
          );
          setAppointments((prevAppointments: any) =>
            prevAppointments.filter((appointment: any) => appointment.id !== id)
          );
        } else {
          Swal.fire(
            "Error",
            `No se pudo ${flag ? "cancelar" : "finalizar"} el turno.`,
            "error"
          );
        }
      } catch (error) {
        Swal.fire(
          "Error",
          `Ocurrió un error al ${flag ? "cancelar" : "finalizar"} el turno.`,
          "error"
        );
      }
    }
  };
  return {
    handleChangeState
  };
};
