// src/app/admin/page.tsx

// GANTI 'UploadForm' dengan 'MaterialForm'
import MaterialForm from '@/components/MaterialForm';
import LogoutButton from '@/components/LogoutButton';
import MaterialList from '@/components/MaterialList'; 
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
import { createMaterial } from './actions'; // 1. Import action baru

export default async function AdminPage() {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const materials = await prisma.material.findMany({
    orderBy: { id: 'desc' },
    include: { course: { select: { name: true } } }
  });

  const courses = await prisma.course.findMany({
    select: { id: true, name: true },
    orderBy: { semesterId: 'asc' }
  });

  return (
    <div className="min-h-screen bg-slate-50">
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
        </div>

        {/* Kartu 2: Form Upload (Sekarang 'MaterialForm') */}
        {/* 2. Berikan action 'createMaterial' */}
        <MaterialForm
          courses={courses}
          action={createMaterial}
          buttonText="Simpan Materi Baru"
        />
        
        {/* Kartu 3: Daftar Materi */}
        <MaterialList materials={materials} />

        {/* Kartu 4: Tombol Logout */}
        <LogoutButton />
        
      </div>
    </div>
  );
}