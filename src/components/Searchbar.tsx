// src/components/Searchbar.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Searchbar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery(''); 
    }
  };

  return (
    <form 
      onSubmit={handleSearch} 
      className="relative w-full max-w-[150px] sm:max-w-xs"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari Matkul" 
        className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 h-full px-3 flex items-center 
                   text-gray-400 hover:text-gray-600"
        aria-label="Cari"
      >
        <Search size={18} />
      </button>
    </form>
  );
}