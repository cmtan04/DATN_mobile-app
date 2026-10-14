import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { secureStorage } from "../services/secureStore";

export const BASE_URL = "https://datn-be-0shk.onrender.com";

type SessionExpiredHandler = () => void;
let sessionExpiredHandler: SessionExpiredHandler | null = null;

export const setSessionExpiredHandler = (handler: SessionExpiredHandler | null) => {
  sessionExpiredHandler = handler;
};

let isRefreshing = false;
let pendingRequests: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

// Request Interceptor: Attach Bearer Token
axiosClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await secureStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401 & Auto-Refresh Token Queue
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      !originalRequest ||
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    // Skip auth endpoints to avoid infinite loop
    if (originalRequest.url?.includes("/auth/")) {
      return Promise.reject(error);
    }

    const refreshToken = await secureStorage.getRefreshToken();
    if (!refreshToken) {
      await secureStorage.clearTokens();
      sessionExpiredHandler?.();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({
          resolve: (newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axiosClient(originalRequest));
          },
          reject,
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
        refreshToken,
      });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      await secureStorage.setTokens(
        newAccessToken,
        newRefreshToken || refreshToken
      );

      pendingRequests.forEach(({ resolve }) => resolve(newAccessToken));
      pendingRequests = [];

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosClient(originalRequest);
    } catch (refreshErr) {
      pendingRequests.forEach(({ reject }) => reject(refreshErr));
      pendingRequests = [];

      await secureStorage.clearTokens();
      sessionExpiredHandler?.();
      return Promise.reject(refreshErr);
    } finally {
      isRefreshing = false;
    }
  }
);
