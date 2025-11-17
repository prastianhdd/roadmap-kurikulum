// src/app/admin/edit/[id]/page.tsx

// HAPUS: import MaterialForm dari '@/components/UploadForm';
import MaterialForm from '@/components/MaterialForm'; // Pastikan ini juga di-rename
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { createSupabaseServer } from '@/lib/supabase/server';
// --- PERBAIKAN DI SINI ---
import { updateMaterial } from '../../actions'; // Ganti dari '../actions'
// --- AKHIR PERBAIKAN ---
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Helper untuk mengambil data materi & mata kuliah
async function getEditData(materialId: number) {
  const material = await prisma.material.findUnique({
    where: { id: materialId },
  });

  const courses = await prisma.course.findMany({
    select: { id: true, name: true },
    orderBy: { semesterId: 'asc' }
  });

  return { material, courses };
}

export default async function EditMaterialPage({ params }: { params: { id: string } }) {
  const supabase = createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const materialId = parseInt(params.id, 10);
  const { material, courses } = await getEditData(materialId);

  if (!material) {
    return (
      <div className="min-h-screen bg-slate-50 p-8">
        <p className="text-red-500">Materi tidak ditemukan.</p>
        <Link href="/admin" className="text-blue-600 hover:underline">
          Kembali ke Admin
        </Link>
      </div>
    );
  }

  // Bind 'materialId' ke server action 'updateMaterial'
  const updateMaterialWithId = updateMaterial.bind(null, material.id);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-8">

        {/* Navigasi Kembali */}
        <Link 
          href="/admin" 
          className="flex items-center text-blue-600 hover:text-blue-800 group"
        >
          <ArrowLeft size={18} className="mr-2 transition-transform group-hover:-translate-x-1" />
          Kembali ke Dashboard
        </Link>

        {/* Kartu Form Edit */}
        <MaterialForm
          courses={courses}
          action={updateMaterialWithId} // Berikan action yang sudah di-bind
          initialData={material}        // Berikan data awal untuk mengisi form
          buttonText="Update Materi"
        />
        
      </div>
    </div>
  );
}