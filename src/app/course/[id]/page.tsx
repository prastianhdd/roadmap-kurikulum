// src/app/course/[id]/page.tsx

import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CourseMaterials from '@/components/CourseMaterials';

// Pemetaan warna (tetap sama)
const categoryColorMap: { [key: string]: string } = {
  green: 'from-green-700 to-green-600',
  blue: 'from-blue-800 to-blue-700',
  yellow: 'from-yellow-600 to-yellow-500',
  red: 'from-red-700 to-red-600',
};
const defaultColor = 'from-gray-800 to-gray-600';

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  const bannerColor = categoryColorMap[course.category] || defaultColor;

  return (
    <div className="bg-slate-50 min-h-screen">
      
      {/* === HERO BANNER === */}
      <div className={`bg-gradient-to-r ${bannerColor} text-white p-6 md:p-8 shadow-md`}>
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/" 
            className="flex items-center text-white/90 hover:text-white mb-4 group"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm md:text-base">Kembali ke Roadmap</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold mt-4 mb-2">{course.name}</h1>
          <p className="text-base md:text-lg text-white/90 capitalize">
            Kategori: {course.category}
          </p>
        </div>
      </div>

      {/* === KONTEN UTAMA === */}
      <div className="max-w-4xl mx-auto p-4 md:py-10 md:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 md:mb-6">
          Materi Pembelajaran
        </h2>
        
        <CourseMaterials materials={course.materials} />
      </div>

    </div>
  );
}