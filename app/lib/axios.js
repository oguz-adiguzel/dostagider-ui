import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: " https://dostagider-api.vercel.app/",
  withCredentials: true,
});

// Request interceptor → accessToken header'a ekle
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403 || error.response?.status === 404) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          " https://dostagider-api.vercel.app/users/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;
        Cookies.set("accessToken", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        Cookies.remove("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
