// src/app/search/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { Loader2, SearchX, ArrowLeft } from 'lucide-react';

type SearchResult = (Course & {
  semester: { name: string };
});

function ResultCard({ course }: { course: SearchResult }) {
  const categoryColorMap: { [key: string]: string } = {
    blue: 'border-l-blue-500',
    yellow: 'border-l-yellow-500',
    red: 'border-l-red-400',
    green: 'border-l-green-500',
  };
  const borderColor = categoryColorMap[course.category] || 'border-l-gray-400';

  return (
    <Link 
      href={`/course/${course.id}`}
      className={`block bg-white p-4 rounded-lg border border-gray-200 shadow-sm 
                  hover:shadow-md hover:border-blue-300 transition-all 
                  border-l-4 ${borderColor}`}
    >
      <h3 className="text-lg font-semibold text-blue-700">{course.name}</h3>
      <p className="text-sm text-gray-500">
        Ditemukan di: <span className="font-medium text-gray-700">{course.semester.name}</span>
      </p>
    </Link>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Gagal mengambil data pencarian');
          }
          return res.json();
        })
        .then(data => {
          setResults(data);
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [query]);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto p-4 md:py-10 md:px-8">
        
        <Link 
          href="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 group font-semibold mb-6"
        >
          <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Kembali ke Roadmap
        </Link>
        
        <div className="mb-8">
          <p className="text-lg text-gray-600">Hasil pencarian untuk:</p>
          <h1 className="text-2xl font-extrabold text-gray-900 break-words">
            &ldquo;{query || '...'} &rdquo;
          </h1>
        </div>

        {/* Konten Hasil */}
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={40} className="text-blue-600 animate-spin" />
              <p className="mt-4 text-gray-500">Mencari mata kuliah...</p>
            </div>
          )}

          {!isLoading && error && (
            <div className="flex flex-col items-center justify-center py-12 text-red-600">
              <SearchX size={40} />
              <p className="mt-4 font-medium">Terjadi Error</p>
              <p className="text-sm text-gray-500">{error}</p>
            </div>
          )}

          {!isLoading && !error && results.length > 0 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500 mb-4">
                Menampilkan {results.length} hasil:
              </p>
              {results.map(course => (
                <ResultCard key={course.id} course={course} />
              ))}
            </div>
          )}

          {!isLoading && !error && results.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <SearchX size={40} />
              <p className="mt-4 font-medium">Tidak Ditemukan</p>
              <p className="text-sm">Tidak ada mata kuliah yang cocok dengan &ldquo;{query}&rdquo;.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPageWrapper() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <SearchResults />
    </Suspense>
  );
}

function LoadingSkeleton() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 size={40} className="text-blue-600 animate-spin" />
    </div>
  );
}