import { z } from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username cannot exceed 20 characters")
            .regex(
                /^[a-zA-Z0-9_]+$/,
                "Only letters, numbers and underscores are allowed"
            ),

        email: z
            .email("Enter a valid email"),

        password: z
            .string()
            .min(8, "Password must be at least 8 characters"),

        confirmPassword: z.string(),
    })
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    );

export type RegisterFormData = z.infer<typeof registerSchema>;