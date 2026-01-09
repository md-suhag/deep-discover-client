import RegisterForm from "@/components/register-form";
import React from "react";
import Image from "next/image";

const RegisterPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px]">
       <div className="hidden bg-muted lg:block relative h-full w-full overflow-hidden order-2 lg:order-1">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
          alt="Scenic lake landscape"
          fill
          className="h-full w-full object-cover dark:brightness-[0.7]"
          priority
        />
         <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
           <blockquote className="space-y-2">
             <p className="text-lg font-medium leading-relaxed">
               &ldquo;Becoming a guide was the best decision. I get to meet amazing people and show them the city I love.&rdquo;
             </p>
             <footer className="text-sm border-t border-white/30 pt-4 mt-4 inline-block">
               Alex Chen - Local Guide
             </footer>
           </blockquote>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      </div>

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background order-1 lg:order-2">
        <div className="mx-auto grid w-full max-w-[550px] gap-6">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
