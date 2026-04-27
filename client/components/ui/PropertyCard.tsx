"use client";
import React from 'react';
import { MapPin, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

// 1. Fallback Image Mapping
const IMG_URLS: any = {
  Apartment: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  Villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  PG: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
  Hotel: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
};

// 2. The Component
// We include _id so we can link to the unique booking page
const PropertyCard = ({ _id, price, title, location, category, imageUrl }: any) => {
  
  // Choose the image: use uploaded URL first, then category fallback
  const displayImage = imageUrl || IMG_URLS[category] || IMG_URLS["Apartment"];

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={displayImage} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        
        {/* Dynamic Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-blue-600 tracking-widest shadow-sm">
          {category}
        </div>

        <button className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-sm rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all shadow-sm">
          <Heart size={18} fill="currentColor" className="text-transparent hover:text-red-500" />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-black text-slate-900 leading-tight">
            ₹{price ? price.toLocaleString() : "N/A"}
          </h3>
          <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
            <Zap size={12} fill="currentColor" />
            <span className="text-[10px] font-bold uppercase">Fast Book</span>
          </div>
        </div>

        <p className="text-slate-500 text-sm font-semibold truncate mb-4">
          {title}
        </p>

        <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
          <MapPin size={14} className="text-blue-500" />
          <span className="font-medium uppercase tracking-wider">{location}</span>
        </div>

        {/* Action Button: Links to /book/[id] */}
        <div className="mt-auto">
          <Link href={`/book/${_id}`}>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm tracking-tighter hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-slate-200">
              BOOK ONLINE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;