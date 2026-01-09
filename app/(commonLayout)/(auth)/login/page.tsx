import LoginForm from "@/components/login-form";
import Image from "next/image";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="mx-auto grid w-full max-w-[450px] gap-6">
          <LoginForm redirect={params.redirect} />
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative h-full w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
          alt="Scenic mountain landscape"
          fill
          className="h-full w-full object-cover dark:brightness-[0.7]"
          priority
        />
        <div className="absolute bottom-10 left-10 right-10 z-20 text-white">
           <blockquote className="space-y-2">
             <p className="text-lg font-medium leading-relaxed">
               &ldquo;Deep Discover has completely changed how I travel. I've found hidden gems I never would have discovered on my own.&rdquo;
             </p>
             <footer className="text-sm border-t border-white/30 pt-4 mt-4 inline-block">
               Sofia Davis - Traveler
             </footer>
           </blockquote>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
      </div>
    </div>
  );
};

export default LoginPage;
