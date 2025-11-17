// src/components/Navbar.tsx

import Link from 'next/link';
import { BookOpen } from 'lucide-react'; 
import Searchbar from './Searchbar';

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200 
               sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          
          <Link 
            href="/" 
            className="flex-shrink-0 flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <BookOpen size={24} />
            <span className="font-bold text-xl hidden sm:inline">
              Computer Science
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-4">
            
            <Searchbar />
          
            <Link 
              href="/" 
              className="flex-shrink-0 text-sm md:text-base text-gray-600 hover:text-blue-600 font-medium"
            >
              Roadmap
            </Link>
            <Link 
              href="/tentang" 
              className="flex-shrink-0 text-sm md:text-base text-gray-600 hover:text-blue-600 font-medium"
            >
              Tentang
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}