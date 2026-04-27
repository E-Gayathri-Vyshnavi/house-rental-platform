"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const router = useRouter();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await fetch('https://renthouse-jfqv.onrender.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/');
    } else { alert("Login Failed"); }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded-3xl shadow-2xl w-96">
        <h1 className="text-3xl font-black mb-6 text-center text-slate-900">RENTLY</h1>
        <input type="email" placeholder="Email" className="w-full p-4 border mb-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full p-4 border mb-6 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" onChange={e => setPass(e.target.value)} />
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition">Login</button>
        <p className="mt-4 text-center text-sm">New? <a href="/register" className="text-blue-600 font-bold">Register</a></p>
      </form>
    </div>
  );
}