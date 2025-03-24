// src/services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // Thay đổi nếu backend chạy ở port khác
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
