'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
              Criar
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium">
              Contact
            </Link>
            <Link href="/dashboard" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5 text-sm font-medium">
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
