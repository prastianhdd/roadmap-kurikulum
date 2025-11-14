// src/app/course/[id]/page.tsx

import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CourseMaterials from '@/components/CourseMaterials';

// Pemetaan dari nama kategori ke kelas warna Tailwind
const categoryColorMap: { [key: string]: string } = {
  green: 'bg-green-500', //
  blue: 'bg-blue-600', //
  yellow: 'bg-yellow-500', //
  red: 'bg-red-500', //
};
const defaultColor = 'bg-gray-600';

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const bannerColor = categoryColorMap[course.category] || defaultColor;

  return (
    // Latar belakang abu-abu muda untuk seluruh halaman
    <div className="bg-slate-50 min-h-screen">
      
      {/* === HERO BANNER (HANYA BANNER) === */}
      {/* Ini adalah bagian berwarna di atas */}
      <div className={`${bannerColor} text-white p-8 shadow-md`}>
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center text-white/90 hover:text-white mb-4 group"
          >
            <ArrowLeft size={24} className="mr-2 transition-transform group-hover:-translate-x-1" />
            Kembali ke Roadmap
          </Link>
          <h1 className="text-4xl font-extrabold mt-4 mb-2">{course.name}</h1>
          <p className="text-lg text-white/90 capitalize">
            Kategori: {course.category}
          </p>
        </div>
      </div>

      {/* === KONTEN UTAMA (DI BAWAH BANNER) === */}
      {/* Ini adalah area konten putih yang rapi di bawah banner */}
      <div className="max-w-4xl mx-auto p-4 md:py-10 md:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Materi Pembelajaran
        </h2>
        
        {/* Komponen CourseMaterials akan merender kartu-kartu materi di sini */}
        <CourseMaterials materials={course.materials} />
      </div>

    </div>
  );
}