"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    amount: '500' // Set a default booking/token amount
  });

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Save Booking to your MongoDB first (Pending Status)
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const res = await fetch('${process.env.NEXT_PUBLIC_API_URL}/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId: id,
        userId: userData.id || userData._id,
        userName: formData.name,
        userPhone: formData.phone,
        bookingDate: formData.date,
        amount: formData.amount,
        status: 'Awaiting Payment'
      }),
    });

    if (res.ok) {
      // 2. Redirect to UPI Payment
      // Replace 'vyshu@upi' with your actual UPI ID
      const upiUrl = `upi://pay?pa=vyshu@upi&pn=Rently&am=${formData.amount}&cu=INR&tn=Booking_for_${id}`;
      
      // On mobile, this opens GPay/PhonePe automatically. 
      // On Desktop, we'll use a redirect or alert.
      window.location.href = upiUrl;
      
      alert("Opening UPI Apps... Please complete the payment.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex items-center justify-center py-10 px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Secure Booking</h1>
            <p className="text-slate-500 font-medium">Enter details to proceed to payment</p>
          </div>

          <form onSubmit={handleConfirmBooking} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
              <input type="text" required placeholder="Enter your name" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Phone Number</label>
              <input type="tel" required placeholder="+91 XXXXX XXXXX" className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Check-in Date</label>
              <input type="date" required className="w-full p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setFormData({...formData, date: e.target.value})} />
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-[10px] text-blue-700 font-black uppercase tracking-widest mb-1">Payment Amount</p>
              <p className="text-xl font-black text-slate-900">₹{formData.amount}</p>
              <p className="text-[10px] text-slate-500 mt-1 italic">*Token amount to confirm your booking</p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 uppercase">
              Confirm & Pay Now
            </button>
          </form>

          <button onClick={() => router.back()} className="w-full mt-4 text-sm font-bold text-slate-400 hover:text-slate-600">
            Go Back
          </button>
        </div>
      </div>
    </main>
  );
}