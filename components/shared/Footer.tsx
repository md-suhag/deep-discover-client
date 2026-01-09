import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-200 py-12">
      <div className="container px-4 md:px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white">DeepDiscover</h3>
          <p className="text-sm text-slate-400">
            Connecting travelers with local experts for authentic, unforgettable experiences around the globe.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
           <h4 className="font-semibold text-white mb-4">Support</h4>
           <ul className="space-y-2 text-sm">
            <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
           </ul>
        </div>

        {/* Socials */}
        <div>
            <h4 className="font-semibold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4">
                <Link href="#" className="hover:text-white transition-colors"><Twitter className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Facebook className="h-5 w-5" /></Link>
                <Link href="#" className="hover:text-white transition-colors"><Instagram className="h-5 w-5" /></Link>
            </div>
        </div>
      </div>
      
      <div className="container px-4 md:px-6 mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Deep Discover. All rights reserved.
      </div>
    </footer>
  );
}
