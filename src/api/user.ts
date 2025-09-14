import axios from "axios";

// Interfaz para tipar al usuario
export interface User {
  username: string;
  email: string;
  password: string;
  // agrega más campos si tu backend los espera
}

const API = "http://localhost:4000/api";

export const registerRequest = (user: User) => {
  return axios.post(`${API}/register`, user);
};
