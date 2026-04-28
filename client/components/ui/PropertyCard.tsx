"use client";
import React from 'react';
import { MapPin, Heart, Zap } from 'lucide-react';
import Link from 'next/link';

// Fallback images from the internet if an upload is missing
const IMG_URLS: any = {
  Apartment: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
  Villa: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
  PG: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
  Hotel: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
};

const PropertyCard = ({ _id, price, title, location, category, image }: any) => {
  
  // LOGIC: If 'image' exists, we combine it with your Render URL.
  // Example: https://house-rental-platform-1.onrender.com/uploads/house123.jpg
 const displayImage = imageUrl || 
    (image ? `${process.env.NEXT_PUBLIC_API_URL}/${image}` : null) || 
    (IMG_URLS[category] || IMG_URLS["Apartment"]);

  return (
    <div className="group bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={displayImage} 
          alt={title} 
          // We use onError to switch to a fallback if the Render image fails to load
          onError={(e: any) => { e.target.src = IMG_URLS[category] || IMG_URLS["Apartment"] }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-[10px] font-black uppercase text-blue-600 tracking-widest shadow-sm">
          {category}
        </div>
      </div>

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

        <p className="text-slate-500 text-sm font-semibold truncate mb-4">{title}</p>

        <div className="flex items-center gap-2 text-slate-400 text-xs mb-6">
          <MapPin size={14} className="text-blue-500" />
          <span className="font-medium uppercase tracking-wider">{location}</span>
        </div>

        <div className="mt-auto">
          <Link href={`/book/${_id}`}>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm tracking-tighter hover:bg-blue-600 transition-all shadow-lg">
              BOOK ONLINE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;