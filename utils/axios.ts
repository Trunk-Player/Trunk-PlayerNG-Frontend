import axios from "axios";

const Axios = axios.create({
  baseURL: "https://panik.io/api",
  timeout: 1000,
  withCredentials: true,
});

export default Axios;
