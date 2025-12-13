import { z } from "zod";

export const createTouristZodSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Email must be valid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const createGuideZodSchema = z
  .object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Email must be valid"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
    expertise: z.array(z.string()).min(1, "At least one expertise is required"),
    dailyRate: z
      .number({
        error: "Daily rate is required",
      })
      .positive("Daily rate must be positive"),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});
