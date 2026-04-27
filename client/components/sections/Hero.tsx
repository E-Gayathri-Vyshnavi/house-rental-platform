import React from 'react';

const Hero = ({ setCategory, activeCategory }: any) => {
  const categories = ['All', 'Apartment', 'Villa', 'PG', 'Hotel'];

  return (
    <section className="pt-40 pb-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight mb-4">
          Find a home that <br />
          <span className="text-blue-600">suits your lifestyle.</span>
        </h1>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setCategory(cat)}
              className={`px-8 py-3 rounded-full border-2 font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg' 
                : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero; // <--- THIS IS THE FIX