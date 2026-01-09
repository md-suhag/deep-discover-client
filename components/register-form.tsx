"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { registerUser } from "@/services/auth/auth.service";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2, User, Mail, Lock, Award, DollarSign, TextQuote } from "lucide-react";

const RegisterForm = () => {
  const [role, setRole] = useState<"TOURIST" | "GUIDE">("TOURIST");

  const [state, formAction, isPending] = useActionState(registerUser, null);
  
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your information below to create your account
        </p>
      </div>

       <form action={formAction}>
           <input type="hidden" name="role" value={role} />
           
           <Tabs 
             defaultValue="TOURIST" 
             onValueChange={(value) => setRole(value as "TOURIST" | "GUIDE")} 
             className="w-full mb-6"
           >
            <TabsList className="grid w-full grid-cols-2 h-10">
              <TabsTrigger value="TOURIST">Tourist</TabsTrigger>
              <TabsTrigger value="GUIDE">Guide</TabsTrigger>
            </TabsList>
            <TabsContent value="TOURIST" className="text-sm text-muted-foreground text-center mt-2 px-1">
               Join as a Tourist to book tours and explore the world.
            </TabsContent>
            <TabsContent value="GUIDE" className="text-sm text-muted-foreground text-center mt-2 px-1">
               Join as a Guide to host tours, share your passion, and earn.
            </TabsContent>
          </Tabs>

          <div className="grid gap-4">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="name">Full Name</Label>
                   <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="name" name="name" type="text" placeholder="John Doe" disabled={isPending} className="pl-9" />
                   </div>
                   <InputFieldError field="name" state={state} />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="email">Email</Label>
                   <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="email" name="email" type="email" placeholder="m@example.com" disabled={isPending} className="pl-9" />
                   </div>
                   <InputFieldError field="email" state={state} />
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                   <Label htmlFor="password">Password</Label>
                   <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="password" name="password" type="password" placeholder="******" disabled={isPending} className="pl-9" />
                   </div>
                   <InputFieldError field="password" state={state} />
                </div>
                <div className="grid gap-2">
                   <Label htmlFor="confirmPassword">Confirm Password</Label>
                   <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="******" disabled={isPending} className="pl-9" />
                   </div>
                   <InputFieldError field="confirmPassword" state={state} />
                </div>
             </div>

             {role === "GUIDE" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                   <div className="grid gap-2">
                     <Label htmlFor="expertise">Expertise</Label>
                     <div className="relative">
                        <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="expertise" name="expertise" placeholder="History, Food, Art" disabled={isPending} className="pl-9" />
                     </div>
                     <p className="text-[0.8rem] text-muted-foreground mx-1">Comma separated</p>
                     <InputFieldError field="expertise" state={state} />
                   </div>
                   <div className="grid gap-2">
                     <Label htmlFor="dailyRate">Daily Rate ($)</Label>
                     <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input id="dailyRate" name="dailyRate" type="number" placeholder="100" disabled={isPending} className="pl-9" />
                     </div>
                     <InputFieldError field="dailyRate" state={state} />
                   </div>
                </div>
             )}

             <Button type="submit" className="w-full mt-2" disabled={isPending}>
                {isPending ? (
                   <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                   </>
                ) : (
                   "Create Account"
                )}
             </Button>

             <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                Log in
                </Link>
            </div>
          </div>
       </form>
    </div>
  );
};

export default RegisterForm;
