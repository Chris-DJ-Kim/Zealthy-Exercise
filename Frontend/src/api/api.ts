import axios from "axios";

const url = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const api = axios.create({
  baseURL: url,
});

export default api;
