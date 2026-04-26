import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required (min 2 characters)")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),

  email: z
    .string()
    .trim()
    .email("Valid email is required"),

  subject: z
    .string()
    .trim()
    .max(100, "Subject must be less than 100 characters")
    .optional()
    .or(z.literal("")), // allows empty string

  message: z
    .string()
    .trim()
    .min(10, "Message is required (min 10 characters)")
    .max(500, "Message must be less than 500 characters"),
});