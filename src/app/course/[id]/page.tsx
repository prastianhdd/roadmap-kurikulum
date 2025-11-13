// src/app/course/[id]/page.tsx

import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // Ikon untuk "kembali"

// Fungsi helper (bisa disalin dari modal lama Anda)
const renderMaterialIcon = (type: string) => {
  switch (type) {
    case 'PDF': return '📄';
    case 'LINK': return '🔗';
    case 'TEXT': return '📝';
    case 'IMAGE': return '🖼️';
    default: return '❔';
  }
};

// Props 'params' akan diisi oleh Next.js berdasarkan URL
export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  const course = getCourseById(courseId);

  // Jika mata kuliah tidak ditemukan, tampilkan halaman 404
  if (!course) {
    notFound();
  }

  return (
    // Ini adalah 'main container' untuk halaman detail
    // Jika Anda sudah menerapkan Ide 1 (Navbar), ini akan pas di bawahnya
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      
      {/* Tombol Kembali ke Roadmap */}
      <Link 
        href="/" 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
        Kembali ke Roadmap
      </Link>

      {/* Header Halaman (mirip seperti modal) */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{course.name}</h1>
      <p className="text-lg text-gray-500 mb-8">
        Kategori: <span className="font-medium text-gray-700">{course.category}</span>
      </p>

      {/* Daftar Materi (mirip seperti modal) */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Materi Pembelajaran</h2>
      <div className="space-y-4">
        {course.materials.length > 0 ? (
          course.materials.map((material) => (
            <a
              key={material.id}
              href={material.type === 'LINK' ? material.content : '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <span className="text-3xl mr-4 mt-1">{renderMaterialIcon(material.type)}</span>
              <div>
                <p className="text-lg font-semibold text-gray-800">{material.title}</p>
                {material.type === 'TEXT' && (
                  <p className="text-sm text-gray-600 mt-1 italic">"{material.content}"</p>
                )}
                {material.type === 'IMAGE' && (
                  <p className="text-sm text-gray-600 mt-1 italic">File gambar: {material.content}</p>
                )}
                {material.type === 'PDF' && (
                  <p className="text-sm text-gray-600 mt-1 italic">File PDF: {material.content}</p>
                )}
              </div>
            </a>
          ))
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <p className="text-gray-500 italic text-center">
              Belum ada materi untuk mata kuliah ini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}