// src/app/admin/page.tsx

import UploadForm from '@/components/UploadForm';
import LogoutButton from '@/components/LogoutButton';
import MaterialList from '@/components/MaterialList'; 
import prisma from '@/lib/prisma';
import { Course } from '@/lib/types'; 
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';

export default async function AdminPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const materials = await prisma.material.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
      course: { 
        select: { name: true }
      }
    }
  });

  const courses: Course[] = await prisma.course.findMany({
    orderBy: {
      semesterId: 'asc'
    }
  });

  return (
    // 1. Latar belakang abu-abu muda
    <div className="min-h-screen bg-slate-50">
      
      {/* 2. KONTENER UTAMA (Kolom Tengah) */}
      {/* Semua elemen sekarang dibatasi oleh 'max-w-4xl' agar lebarnya sama */}
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">

        {/* Kartu 1: Banner Header */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-blue-800 to-blue-700 rounded-2xl shadow-lg">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-lg text-blue-100">
              Upload dan kelola materi pembelajaran baru.
            </p>
          </div>
          {/* Tombol Logout DIHAPUS dari sini */}
        </div>

        {/* Kartu 2: Form Upload */}
        <UploadForm courses={courses} />
        
        {/* Kartu 3: Daftar Materi */}
        <MaterialList materials={materials} />

        {/* Kartu 4: Tombol Logout */}
        <LogoutButton />
        
      </div>
    </div>
  );
}