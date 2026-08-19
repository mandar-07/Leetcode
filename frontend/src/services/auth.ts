import api from "./api";
import type { RegisterFormData } from "../features/auth/schemas/registerSchema";

export const registerUser = async (data: RegisterFormData) => {
    const response = await api.post("/auth/register", {
        username: data.username,
        email: data.email,
        password: data.password,
    });

    return response.data;
};