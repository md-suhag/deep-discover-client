import { ShieldCheck, UserCheck, Heart } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
                 <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Experience the world like a local, not just a tourist.</h2>
                 <p className="text-gray-400 text-lg mb-8">Deep Discover connects you with passionate locals who know their cities inside out, offering authentic experiences you won't forget.</p>
                 
                 <div className="space-y-6">
                    <div className="flex gap-4">
                        <ShieldCheck className="h-8 w-8 text-green-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-xl mb-1">Secure & Trusted</h3>
                            <p className="text-gray-400">All payments are secure and we offer 24/7 support for peace of mind.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <UserCheck className="h-8 w-8 text-blue-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-xl mb-1">Verified Guides</h3>
                            <p className="text-gray-400">Every guide is vetted to ensure quality, safety, and expertise.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <Heart className="h-8 w-8 text-red-400 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-xl mb-1">Authentic Connections</h3>
                            <p className="text-gray-400">Build real friendships and understand cultures deeper than ever before.</p>
                        </div>
                    </div>
                 </div>
            </div>
            <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl">
                 {/* Placeholder for a lifestyle image */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1527631746610-bca00a040d60?q=80&w=1887&auto=format&fit=crop')] bg-cover bg-center" />
            </div>
        </div>
      </div>
    </section>
  );
}
