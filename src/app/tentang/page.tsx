// src/app/tentang/page.tsx

import { Github } from 'lucide-react'; 

export default function TentangPage() {
  return (
    <div className="bg-white  min-h-screen">
      
      {/* === HERO BANNER (Biru, konsisten dengan Navbar) === */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-8 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold mt-4 mb-2">Roadmap Computer Science</h1>
          <p className="text-lg text-white/90">
            Peta Kurikulum Interaktif untuk Program Studi Ilmu Komputer.
          </p>
        </div>
      </div>

      {/* === KONTEN UTAMA (Kartu Putih) === */}
      <div className="max-w-4xl mx-auto p-4 md:py-10 md:px-8">
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Roadmap Kurikulum
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Website ini dibuat untuk memvisualisasikan seluruh mata kuliah dalam kurikulum program studi Ilmu Komputer secara interaktif. Tujuannya adalah untuk membantu mahasiswa melihat gambaran besar kurikulum, melacak materi pembelajaran, dan memahami alur studi dari semester ke semester.
          </p>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Teknologi yang Digunakan
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
            <li>Framework : Next.js </li>
            <li>Bahasa : TypeScript</li>
            <li>Database : PostgreSQL (via Supabase)</li>
            <li>Penyimpanan File : Supabase Storage</li>
            <li>ORM : Prisma</li>
            <li>Styling : Tailwind CSS</li>
          </ul>

          
          <p className="text-gray-700 leading-relaxed mb-4">
            Website ini dikembangkan dan dikelola oleh :
          </p>
          
          {/* === KARTU PROFIL GITHUB ANDA === */}
          <a
            href="https://github.com/prastianhdd" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 bg-blue-100 rounded-lg border border-blue-300 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-300 cursor-pointer"
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full mr-4 bg-gray-800 text-white">
              <Github size={24} />
            </div>
            <div className="flex-grow">
              <p className="text-lg font-semibold text-gray-900">Prastian Hidayat</p>
              <p className="text-sm text-gray-600">
                Lihat profil di GitHub
              </p>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}