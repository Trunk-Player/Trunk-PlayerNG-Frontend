import axios from "axios";

const unauthenticatedAxios = axios.create({
  baseURL: "https://panik.io/",
  timeout: 1000,
});

export { unauthenticatedAxios };
