// src/components/Navbar.tsx

import Link from 'next/link';
import { BookOpen } from 'lucide-react'; 

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <BookOpen size={24} />
            <span className="font-bold text-xl">
              Computer Science
            </span>
          </Link>
          

          <div className="flex items-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">
              Roadmap
            </Link>
            <Link href="/tentang" className="text-gray-600 hover:text-blue-600 font-medium">
              Tentang
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}