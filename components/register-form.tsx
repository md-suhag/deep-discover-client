"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldLabel, FieldGroup, FieldDescription } from "./ui/field";
import { Input } from "./ui/input";
import { registerUser } from "@/services/auth/auth.service";
import Link from "next/link";

const RegisterForm = () => {
  const [role, setRole] = useState<"TOURIST" | "GUIDE">("TOURIST");

  const [state, formAction, isPending] = useActionState(registerUser, null);
  console.log("state", state);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg "
    >
      <input type="hidden" name="role" value={role} />
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Create an Account
      </h2>

      {/* Role Selector as Tabs */}
      <div className="flex justify-center mb-6">
        {["TOURIST", "GUIDE"].map((r) => (
          <button
            type="button"
            key={r}
            onClick={() => setRole(r as "TOURIST" | "GUIDE")}
            className={`px-4 py-2 rounded-t-lg border-b-2 font-medium ${
              role === r
                ? "border-blue-500 text-blue-600 bg-blue-50"
                : "border-gray-200 text-gray-500 hover:bg-gray-50"
            }`}
          >
            {r === "TOURIST" ? "Tourist" : "Guide"}
          </button>
        ))}
      </div>

      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <Field>
          <FieldLabel htmlFor="name">Full Name</FieldLabel>
          <Input id="name" name="name" type="text" placeholder="John Doe" />
          <InputFieldError field="name" state={state} />
        </Field>

        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jhon@gmail.com"
          />
          <InputFieldError field="email" state={state} />
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          <InputFieldError field="password" state={state} />
        </Field>

        {/* Confirm Password */}
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Enter password again"
          />
          <InputFieldError field="confirmPassword" state={state} />
        </Field>

        {/* Guide-specific fields */}
        {role === "GUIDE" && (
          <>
            <Field>
              <FieldLabel htmlFor="expertise">
                Expertise (comma separated)
              </FieldLabel>
              <Input
                id="expertise"
                name="expertise"
                placeholder="Wildlife, Mountain, Historical"
              />
              <InputFieldError field="expertise" state={state} />
            </Field>

            <Field>
              <FieldLabel htmlFor="dailyRate">Daily Rate</FieldLabel>
              <Input
                id="dailyRate"
                name="dailyRate"
                type="number"
                placeholder="500"
              />
              <InputFieldError field="dailyRate" state={state} />
            </Field>
          </>
        )}
      </FieldGroup>

      <div className="mt-6 mb-4 text-center">
        <Button type="submit" disabled={isPending} className="w-full ">
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>

      <FieldDescription className="mt-4  text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </FieldDescription>
    </form>
  );
};

export default RegisterForm;
