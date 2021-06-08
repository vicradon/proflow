import axios from "axios";

const maxios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api"
      : "https://proflow.osinachi.me/api",
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

maxios.saveToLocalStorage = (payload) => {
  localStorage.setItem("jwt", payload.access_token);
  localStorage.setItem("user", JSON.stringify(payload.user));

  const { profile_type } = payload.user;
  switch (profile_type) {
    case "App\\Models\\Student": {
      localStorage.setItem("role", "student");
      break;
    }
    case "App\\Models\\Supervisor": {
      localStorage.setItem("role", "supervisor");
      break;
    }
    case "App\\Models\\Coordinator": {
      localStorage.setItem("role", "coordinator");
      break;
    }
  }
};

export default maxios;
