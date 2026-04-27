"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ email: '', password: '', role: 'tenant' });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration Successful! Please Login.");
        router.push('/login');
      } else {
        const error = await res.json();
        alert(error.error || "Registration failed");
      }
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl"
      >
        <h2 className="text-3xl font-black text-slate-900 mb-2">Create Account</h2>
        <p className="text-slate-500 mb-8">Join the Rently community today.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="name@example.com"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input 
              type="password" required
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">I want to...</label>
            <select 
              className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="tenant">Browse & Rent (Tenant)</option>
              <option value="landlord">Post & Manage (Landlord)</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account? <a href="/login" className="text-blue-600 font-bold">Login</a>
        </p>
      </motion.div>
    </div>
  );
}