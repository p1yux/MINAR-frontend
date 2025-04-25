import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const mobileLoginSchema = z.object({
  mobileNumber: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
});

export const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  mobileNumber: z
    .string()
    .min(1, { message: "Mobile number is required" })
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required" }),
}); 