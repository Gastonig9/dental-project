export const USER_PATHS = {
  GET_ALL: 'api/user',
  GET_BY_ID: 'api/user',
  DELETE_BY_ID: 'api/user',
  REGISTER: 'api/user/register-user',
  LOGIN: 'api/user/login-user',
  REQUEST_RESET_PASSWORD: 'api/user/request-reset-password',
  RESET_PASSWORD: 'api/user/reset-password',
} as const;

//Ejemplo de uso
//   useEffect(() => {
//     fetch(`http://localhost:3000/${USER_PATHS.GET_BY_ID}/3`)
//       .then((data) => {
//         console.log(data);
//         return data.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   }, []);
