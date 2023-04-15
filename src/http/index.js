import axios from "axios";
const service = axios.create({
  baseURL: "http://127.0.0.1:7104",
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    config.headers.token = localStorage.getItem("token") || "";
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default service;
