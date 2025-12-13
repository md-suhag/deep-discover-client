/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { z } from "zod";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createTouristZodSchema,
  createGuideZodSchema,
} from "@/zod/auth.validation";
// import { loginUser } from "./loginUser";

export const registerUser = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const role = formData.get("role") as "TOURIST" | "GUIDE";

    if (!role) {
      return { success: false, message: "Role is required" };
    }

    const payload: any = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (role === "GUIDE") {
      payload.expertise = (formData.get("expertise") as string)
        ?.split(",")
        ?.map((v) => v.trim());
      payload.dailyRate = Number(formData.get("dailyRate"));
    }

    const schema =
      role === "GUIDE" ? createGuideZodSchema : createTouristZodSchema;

    const check = zodValidator(payload, schema);
    if (check.success === false) {
      return check;
    }

    const validatedPayload = check.data as
      | z.infer<typeof createTouristZodSchema>
      | z.infer<typeof createGuideZodSchema>;

    const registerData =
      role === "GUIDE"
        ? {
            password: validatedPayload?.password,
            name: validatedPayload.name,
            email: validatedPayload.email,
            expertise:
              "expertise" in validatedPayload
                ? validatedPayload.expertise
                : undefined,
            dailyRate:
              "dailyRate" in validatedPayload
                ? validatedPayload.dailyRate
                : undefined,
          }
        : {
            password: validatedPayload.password,
            name: validatedPayload.name,
            email: validatedPayload.email,
          };

    const res = await serverFetch.post(
      role === "GUIDE" ? "/users/guide" : "/users/tourist",
      {
        body: JSON.stringify(registerData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();

    // if (result.success) {
    //   await loginUser(_currentState, formData);
    // }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. Please try again.",
    };
  }
};
