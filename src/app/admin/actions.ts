// src/app/admin/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'

// ... (Helper createSupabaseServerClient dan supabaseAdmin tetap sama) ...
function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )
}
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);
// --- AKHIR HELPER ---

// FUNGSI BARU: createMaterial (menggantikan /api/materials)
export async function createMaterial(prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Unauthorized: Anda harus login.' }
  }

  try {
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const courseId = parseInt(formData.get('courseId') as string, 10);
    const file = formData.get('file') as File | null;
    
    let content = formData.get('content') as string;
    let storagePath: string | null = null;

    const isFileBased = type === 'PDF' || type === 'IMAGE' || type === 'WORD';

    if (isFileBased && file && file.size > 0) {
      const bucketName = 'materials'; 
      const filePath = `uploads/${courseId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw new Error(`Gagal upload file: ${uploadError.message}`);

      const { data } = supabaseAdmin.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      content = data.publicUrl;
      storagePath = filePath;
      
    } else if (isFileBased && (!file || file.size === 0)) {
      return { success: false, message: `File dibutuhkan untuk tipe ${type}` };
    }

    await prisma.material.create({
      data: {
        title: title,
        type: type,
        content: content, 
        courseId: courseId,
        storagePath: storagePath,
      },
    });
    
    revalidatePath('/admin'); // REFRESH DATA TANPA RELOAD HALAMAN
    return { success: true, message: 'Materi baru berhasil ditambahkan!' };

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage };
  }
}

// FUNGSI BARU: updateMaterial
export async function updateMaterial(materialId: number, prevState: any, formData: FormData) {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Unauthorized: Anda harus login.' }
  }

  try {
    const material = await prisma.material.findUnique({
      where: { id: materialId }
    });
    if (!material) throw new Error('Materi tidak ditemukan');

    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const courseId = parseInt(formData.get('courseId') as string, 10);
    const file = formData.get('file') as File | null;
    
    let content = formData.get('content') as string;
    let storagePath: string | null = material.storagePath; // Ambil path lama

    const isFileBased = type === 'PDF' || type === 'IMAGE' || type === 'WORD';

    if (isFileBased && file && file.size > 0) {
      // 1. Hapus file lama jika ada
      if (material.storagePath) {
        await supabaseAdmin.storage.from('materials').remove([material.storagePath]);
      }
      
      // 2. Upload file baru
      const bucketName = 'materials'; 
      const filePath = `uploads/${courseId}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw new Error(`Gagal upload file baru: ${uploadError.message}`);

      const { data } = supabaseAdmin.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      content = data.publicUrl;
      storagePath = filePath;
    } else if (isFileBased) {
      // Tipe file, tapi tidak ada file baru di-upload.
      // Berarti pengguna tidak ingin mengubah file,
      // kita gunakan 'content' dan 'storagePath' yang lama (sudah di-set di awal)
      content = material.content;
      storagePath = material.storagePath;
    } else {
      // Tipe BUKAN file (TEXT, LINK, DRIVE). Hapus file lama jika ada.
      if (material.storagePath) {
        await supabaseAdmin.storage.from('materials').remove([material.storagePath]);
      }
      storagePath = null; // Hapus path
    }

    // 3. Update database
    await prisma.material.update({
      where: { id: materialId },
      data: {
        title: title,
        type: type,
        content: content, 
        courseId: courseId,
        storagePath: storagePath,
      },
    });

    revalidatePath('/admin'); // Refresh admin
    revalidatePath(`/course/${courseId}`); // Refresh halaman publik (jika ada)
    
    // Redirect kembali ke halaman admin utama setelah edit
    redirect('/admin');

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage };
  }
}

// FUNGSI deleteMaterial (TIDAK BERUBAH)
export async function deleteMaterial(materialId: number) {
  // ... (kode deleteMaterial Anda tetap sama)
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('Unauthorized: Anda harus login untuk menghapus.')
  }
  try {
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    })
    if (!material) {
      throw new Error('Materi tidak ditemukan')
    }
    if (material.storagePath) {
      const { error: storageError } = await supabaseAdmin.storage
        .from('materials')
        .remove([material.storagePath])
      if (storageError) {
        console.error('Gagal hapus file dari storage:', storageError.message)
      }
    }
    await prisma.material.delete({
      where: { id: materialId },
    })
    revalidatePath('/admin')
    revalidatePath(`/course/${material.courseId}`); // Refresh halaman publik
    return { success: true, message: 'Materi berhasil dihapus.' }
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage }
  }
}