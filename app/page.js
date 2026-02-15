'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">

      <section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x">
            Build Stunning Websites
          </span>
          <br />
          <span className="text-white">With AI Precision</span>
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-gray-400 mb-12 leading-relaxed">
          Unlock your creativity with Criar. Generate production-ready HTML, CSS, and JS code instantly using our advanced AI models. No coding required.
        </p>
        <div className="flex justify-center space-x-6">
          <Link href="/dashboard" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-white/10">
            Start Creating Free
          </Link>
          <Link href="/about" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300">
            Learn More
          </Link>
        </div>
      </section>


      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-white/10">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Why Choose Criar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-colors duration-300">
            <div className="h-12 w-12 bg-purple-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Lightning Fast</h3>
            <p className="text-gray-400">Generate complete website structures in seconds with our optimized AI engine.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/50 transition-colors duration-300">
            <div className="h-12 w-12 bg-pink-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Custom Styling</h3>
            <p className="text-gray-400">Tailor the look and feel with detailed color and style prompts.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-colors duration-300">
            <div className="h-12 w-12 bg-blue-500 rounded-lg mb-6 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-4">Clean Code</h3>
            <p className="text-gray-400">Get separated HTML, CSS, and JS files ready for production deployment.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
