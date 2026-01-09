"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
    
      <form action={formAction}>
        <div className="grid gap-6">
          {redirect && <input type="hidden" name="redirect" value={redirect} />}
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  disabled={isPending}
                  className="pl-9"
                />
            </div>
            <InputFieldError field="email" state={state} />
          </div>

          <div className="grid gap-2">
             <div className="flex items-center">
               <Label htmlFor="password">Password</Label>
               {/* Forgot password link could go here if requested later */}
             </div>
             <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  disabled={isPending}
                  className="pl-9"
                />
             </div>
             <InputFieldError field="password" state={state} />
          </div>
          
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
               <>
                 <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 Logging in...
               </>
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
