export const USER_PATHS: PathsType = {
  GET_ALL: '/api/user',
  GET_BY_ID: '/api/user',
  DELETE_BY_ID: '/api/user',
  REGISTER: '/api/user/register-user',
  LOGIN: '/api/user/login-user',
  REQUEST_RESET_PASSWORD: '/api/user/request-reset-password',
  RESET_PASSWORD: '/api/user/reset-password',
} as const;

export type PathsType = { GET_BY_ID: string; DELETE_BY_ID: string } & Record<
  string,
  string
>;
