import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isAuthCheck: true,
    isLoggingOut: false,
    isLogging: false,
    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account Created Successfully");
        } catch (err) {
            toast.error(err.response.data.message || "An error occurred whle signup");
            set({ isSigningUp: false, user: null })
        }
    },
    login: async (credentials) => {
        set({ isLogging: true });
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLogging: false });
            toast.success("successfully loggedIn")
        } catch (error) {
            set({ isLogging: false, user: null })
            toast.error(error.response.data.message || "error while logging in");
        }
    },
    logout: async () => {
        try {
            set({ isLoggingOut: true });
            await axios.post("/api/v1/auth/logout");
            set({ user: null, isLoggingOut: false })
            toast.success("logged Out successfully")
        } catch (err) {
            set({ isLoggingOut: false })
            toast.error(err.response.message || "error while logging out");
        }

    },
    authCheck: async () => {
        set({ isAuthCheck: true })
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            set({ user: response.data.user, isAuthCheck: false })
        } catch (err) {
            console.group(err);
            set({ isAuthCheck: false, user: null })
        }
    }
}))