import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://ride-sharing-7ci5.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
