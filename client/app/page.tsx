"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/layout/Navbar';
import PropertyCard from '../components/ui/PropertyCard';

export default function Home() {
  const router = useRouter();
  const [props, setProps] = useState([]);
  const [filters, setFilters] = useState({ location: '', category: 'All' });

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) router.push('/login');
    else fetchProps();
  }, [filters.category]);

  const fetchProps = async () => {
    const params = new URLSearchParams(filters).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties?${params}`);
    const data = await res.json();
    setProps(data);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="bg-slate-900 text-white py-20 px-10 text-center">
        <h1 className="text-5xl font-black mb-8">Find Your Home</h1>
        <div className="max-w-4xl mx-auto flex gap-4 bg-white p-3 rounded-xl">
          <input type="text" placeholder="Enter Location..." className="flex-1 text-black p-3 outline-none" 
            onChange={e => setFilters({...filters, location: e.target.value})} />
          <button onClick={fetchProps} className="bg-blue-600 px-8 py-3 rounded-lg font-bold">Search</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex gap-4 mb-10 overflow-x-auto">
          {['All', 'Apartment', 'Villa', 'PG', 'Hotel'].map(cat => (
            <button key={cat} onClick={() => setFilters({...filters, category: cat})}
              className={`px-6 py-2 rounded-full border font-bold ${filters.category === cat ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {props.map((p: any) => <PropertyCard key={p._id} {...p} />)}
        </div>
      </div>
    </main>
  );
}