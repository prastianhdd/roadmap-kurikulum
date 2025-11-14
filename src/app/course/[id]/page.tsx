// src/app/course/[id]/page.tsx

import { getCourseById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import CourseMaterials from '@/components/CourseMaterials'; 
export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = parseInt(params.id, 10);
  const course = await getCourseById(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans">
      
      <Link 
        href="/" 
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6 group"
      >
        <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
        Kembali ke Roadmap
      </Link>

      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{course.name}</h1>
      <p className="text-lg text-gray-500 mb-8">
        Kategori: <span className="font-medium text-gray-700">{course.category}</span>
      </p>

      <h2 className="text-2xl font-bold text-gray-800 mb-4">Materi Pembelajaran</h2>
      
      <CourseMaterials materials={course.materials} />

    </div>
  );
}