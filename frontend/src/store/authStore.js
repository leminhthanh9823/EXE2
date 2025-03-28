import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
const REACT_APP_API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);

      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });

      const token = response.data.token;

      // Set cookie với token
      Cookies.set("token", token, {
        expires: 1, // Hết hạn sau 1 ngày
        secure: true, // Chỉ hoạt động trên HTTPS
        sameSite: "None",
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error logging in",
        isLoading: false,
      });
      return null; // Instead of throwing, return null
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${REACT_APP_API_URL}/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
      Cookies.remove("token");
      localStorage.removeItem("user");
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${REACT_APP_API_URL}/verify-email`, {
        code,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/check-auth`);
      console.log("Check-auth response:", response.data);

      if (response.data.user) {
        set({
          user: response.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          set({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isCheckingAuth: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isCheckingAuth: false,
          });
        }
      }
    } catch (error) {
      console.log("Check-auth error:", error);
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/forgot-password`,
        {
          email,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error:
          error.response?.data?.message || "Error sending reset password email",
      });
      throw error;
    }
  },
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(
        `${REACT_APP_API_URL}/reset-password/${token}`,
        {
          password,
        }
      );
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Error resetting password",
      });
      throw error;
    }
  },
}));
