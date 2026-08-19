import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../shared/components/Input";
import Button from "../../../shared/components/Button";

import {
    loginSchema,
    type LoginFormData,
} from "../schemas/loginSchema";

import { useLogin } from "../hooks/useLogin";
import { setToken } from "../utils/auth";

export default function Login() {
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(data, {
            onSuccess: (response) => {
                setToken(response.access_token);

                toast.success("Login successful!");

                navigate("/");
            },

            onError: (error: any) => {
                toast.error(
                    error.response?.data?.detail ??
                    "Invalid email or password"
                );
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 shadow-xl">

                <h1 className="text-3xl font-bold text-white text-center">
                    Welcome Back
                </h1>

                <p className="text-gray-400 text-center mt-2">
                    Login to your account
                </p>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter email"
                        error={errors.email?.message}
                        {...register("email")}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter password"
                        error={errors.password?.message}
                        {...register("password")}
                    />

                    <Button
                        type="submit"
                        disabled={loginMutation.isPending}
                    >
                        {loginMutation.isPending
                            ? "Logging in..."
                            : "Login"}
                    </Button>
                </form>

                <p className="text-center text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-orange-500 hover:text-orange-400"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}