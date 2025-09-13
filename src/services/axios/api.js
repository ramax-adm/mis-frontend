import axios, { AxiosError } from "axios";
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  // baseURL: process.env.REACT_APP_API_URL,

  // headers: {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': true,
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
  // },
  // baseURL: 'https://cors-anywhere.herokuapp.com/https://api.finpec.tk/app',
});
api.interceptors.response.use((response) => {
  return response;
});

export default api;
