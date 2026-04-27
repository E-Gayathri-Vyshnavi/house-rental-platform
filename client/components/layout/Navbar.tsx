import React from 'react';
import { PlusCircle, User, MapPin, Search } from 'lucide-react';
// 1. ADD THIS IMPORT AT THE TOP
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 z-[100] flex items-center">
      <div className="max-container w-full flex justify-between items-center">
        <div className="flex items-center gap-8 flex-1">
          {/* 2. OPTIONAL: WRAP THE LOGO TO GO BACK HOME */}
          <Link href="/">
            <h1 className="text-2xl font-black text-blue-600 tracking-tighter cursor-pointer">RENTLY</h1>
          </Link>
          
          <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-full max-w-md">
            <MapPin size={18} className="text-blue-500 mr-2" />
            <input type="text" placeholder="Search for stays..." className="bg-transparent outline-none text-sm w-full" />
            <Search size={18} className="text-slate-400" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 3. WRAP THE POST AD BUTTON IN A LINK */}
          <Link href="/post-ad">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              <PlusCircle size={18} />
              <span className="hidden sm:inline">Post Ad</span>
            </button>
          </Link>
          
          <User size={24} className="text-slate-600 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;