import axios from "axios";

// Buat instance axios
const axiosInstance = axios.create({
    baseURL: "http://10.10.102.117:3000", 
    // 10.10.102.51 -> localhost dari expo
    // 3000 -> port server
});

export default axiosInstance;