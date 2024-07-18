export const PRESTATION_PATHS = {
    GET_BY_PATIENT_ID: "/api/prestations/getAll-by-patientId",
    CREATE: "/api/prestations/create",
    PRESTATION_UPDATE: "/api/prestation/update",
    ODONTOGRAM_UPDATE: "/api/odontogram/update",
    DELETE_PRESTATION_BY_ID: "/api/prestation/delete",
    DELETE_ODONTOGRAM_BY_ID: "/api/odontogram/delete",
  } as const;