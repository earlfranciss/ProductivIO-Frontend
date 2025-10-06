import { api } from "../utils/api";

export const AuthService = {
    login: ({ email, password }) =>
        api.login({ email, password }),

    register: (userData) =>
        api.register(userData),

    validateToken: async (token) => {
        return await api.validate(token);
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    },
};
