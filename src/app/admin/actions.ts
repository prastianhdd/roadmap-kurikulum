// src/app/admin/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
// --- PERUBAHAN DI SINI ---
import { createServerClient } from '@supabase/ssr' // Ini untuk cek sesi user
import { createClient } from '@supabase/supabase-js' // Ini untuk admin storage
// --- AKHIR PERUBAHAN ---
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'

// Helper untuk membuat Supabase Server Client (untuk cek user)
// Ini TIDAK BERUBAH
function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Gunakan ANON key
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// --- PERBAIKAN DI SINI ---
// Helper untuk membuat Supabase Admin Client (untuk menghapus storage)
// Kita gunakan createClient biasa dengan SERVICE_KEY
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY! // SERVICE KEY
);
// --- AKHIR PERBAIKAN ---


export async function deleteMaterial(materialId: number) {
  // Ini menggunakan helper yang benar untuk cek sesi
  const supabase = createSupabaseServerClient() 

  // 1. Cek Autentikasi
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized: Anda harus login untuk menghapus.')
  }

  try {
    // 2. Cari materi di database
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    })

    if (!material) {
      throw new Error('Materi tidak ditemukan')
    }

    // 3. Jika ada file di storage, hapus file itu
    if (material.storagePath) {
      // Ini sekarang akan menggunakan supabaseAdmin yang sudah benar
      const { error: storageError } = await supabaseAdmin.storage
        .from('materials') // Sesuaikan nama bucket
        .remove([material.storagePath])
      
      if (storageError) {
        console.error('Gagal hapus file dari storage:', storageError.message)
        // Kita lanjut hapus dari DB, mungkin filenya sudah tidak ada
      }
    }

    // 4. Hapus record dari database
    await prisma.material.delete({
      where: { id: materialId },
    })

    // 5. Refresh data di halaman admin
    revalidatePath('/admin')
    return { success: true, message: 'Materi berhasil dihapus.' }

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage }
  }
}