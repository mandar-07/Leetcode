import api from "../../../shared/lib/api";

import type { RegisterFormData } from "../schemas/registerSchema";
import type { LoginFormData } from "../schemas/loginSchema";

type LoginResponse = {
    access_token: string;
    token_type: string;
};

export type CurrentUser = {
    id: number;
    username: string;
    email: string;
};

export const registerUser = async (
    data: RegisterFormData
) => {
    const response = await api.post(
        "/auth/register",
        data
    );

    return response.data;
};

export const loginUser = async (
    data: LoginFormData
): Promise<LoginResponse> => {
    const response = await api.post(
        "/auth/login",
        data
    );

    return response.data;
};

export const getCurrentUser = async (): Promise<CurrentUser> => {
    const response = await api.get("/auth/me");

    return response.data;
};