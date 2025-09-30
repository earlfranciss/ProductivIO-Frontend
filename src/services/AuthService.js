import { api } from "../api";

export const AuthService = {
    login: ({ email, password }) =>
        api.login({ email, password }),

    register: (userData) =>
        api.register(userData),

    validateToken: async (token) => {
        try {
            return await api.validate(token);
        } catch (err) {
            return { valid: false, error: err.message };
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};
