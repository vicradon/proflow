import axios from "axios";

const maxios = axios.create({
  baseURL: "",
});

maxios.defaults.headers.common["Content-Type"] = "application/json";
maxios.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

maxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/";
    } else {
      return Promise.reject(error);
    }
  }
);

export default maxios;
