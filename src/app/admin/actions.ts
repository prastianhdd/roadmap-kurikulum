// src/app/admin/actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Expo } from 'expo-server-sdk'; // Import Library Expo

function createSupabaseServerClient() {
  const cookieStore = cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )
}

// Client Admin dengan Service Key (Bisa bypass RLS untuk baca token)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

type FormState = {
  success: boolean;
  message: string;
};

// Fungsi Helper untuk Kirim Notifikasi
async function sendPushNotifications(courseName: string, materialTitle: string, courseId: number) {
  // 1. Inisialisasi Expo SDK
  let expo = new Expo();

  // 2. Ambil semua token user dari Supabase
  // (Pastikan tabel 'user_push_tokens' sudah dibuat di Supabase sesuai panduan sebelumnya)
  const { data: tokens, error } = await supabaseAdmin
    .from('user_push_tokens')
    .select('token');

  if (error || !tokens) {
    console.error('Gagal mengambil push token:', error);
    return;
  }

  // 3. Siapkan pesan
  let messages = [];
  for (let user of tokens) {
    const pushToken = user.token;
    
    // Cek validitas token
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token tidak valid: ${pushToken}`);
      continue;
    }

    messages.push({
      to: pushToken,
      sound: 'default',
      title: '📚 Materi Baru!',
      body: `Materi "${materialTitle}" baru saja ditambahkan di mata kuliah ${courseName}.`,
      data: { courseId: courseId }, // Data untuk navigasi otomatis di HP nanti
    });
  }

  // 4. Kirim pesan secara bertahap (Chunking)
  let chunks = expo.chunkPushNotifications(messages);
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log('Notifikasi terkirim:', ticketChunk);
    } catch (error) {
      console.error('Gagal mengirim notifikasi:', error);
    }
  }
}

export async function createMaterial(prevState: FormState, formData: FormData): Promise<FormState> {
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

    // 1. Simpan materi ke Database
    await prisma.material.create({
      data: {
        title,
        type,
        content, 
        courseId,
        storagePath,
      },
    });

    // 2. Ambil nama Course untuk pesan notifikasi
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      select: { name: true }
    });

    // 3. Panggil fungsi kirim notifikasi (Fire & Forget - tidak perlu tunggu selesai)
    if (course) {
      sendPushNotifications(course.name, title, courseId).catch(err => 
        console.error('Background notification error:', err)
      );
    }
    
    revalidatePath('/admin'); 
    return { success: true, message: 'Materi berhasil disimpan & notifikasi dikirim!' };

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage };
  }
}

export async function updateMaterial(materialId: number, prevState: FormState, formData: FormData): Promise<FormState> {
  // ... (Biarkan kode updateMaterial sama seperti sebelumnya, tidak perlu diubah)
  // Kecuali Anda ingin notifikasi saat update juga, Anda bisa memanggil sendPushNotifications di sini.
  
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
    let storagePath: string | null = material.storagePath; 
    const isFileBased = type === 'PDF' || type === 'IMAGE' || type === 'WORD';

    if (isFileBased && file && file.size > 0) {
      if (material.storagePath) {
        await supabaseAdmin.storage.from('materials').remove([material.storagePath]);
      }
      
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
      content = material.content;
      storagePath = material.storagePath;
    } else {
      if (material.storagePath) {
        await supabaseAdmin.storage.from('materials').remove([material.storagePath]);
      }
      storagePath = null; 
    }

    await prisma.material.update({
      where: { id: materialId },
      data: {
        title,
        type,
        content, 
        courseId,
        storagePath,
      },
    });

    revalidatePath('/admin'); 
    revalidatePath(`/course/${courseId}`); 
    redirect('/admin');

  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage };
  }
}

export async function deleteMaterial(materialId: number) {
  // ... (Kode deleteMaterial tetap sama)
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, message: 'Unauthorized: Anda harus login untuk menghapus.' }
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
    revalidatePath(`/course/${material.courseId}`); 
    return { success: true, message: 'Materi berhasil dihapus.' }
  } catch (error) {
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan";
    return { success: false, message: errorMessage }
  }
}