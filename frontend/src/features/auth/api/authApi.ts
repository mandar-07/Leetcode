import api from "../../../shared/lib/api";
import type { LoginData, RegisterData } from "../../types/auth";

export const loginUser = async (data: LoginData) => {
  return api.post("/auth/login", data);
};

export const registerUser = async (data: RegisterData) => {
  return api.post("/auth/register", data);
};