import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  // timeout opcional por cold start de Render:
  timeout: 20000,
});

// Adjunta el token automáticamente
api.interceptors.request.use((config) => {
  const url = (config.url || "").toLowerCase();
  const isAuthPath = url.includes("/auth/login") || url.includes("/auth/register");
  if (!isAuthPath) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      (config.headers as Record<string, string>).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response?.status, err?.response?.data || err.message);
    return Promise.reject(err);
  }
);
