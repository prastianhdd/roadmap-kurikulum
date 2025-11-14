// src/app/api/materials/route.ts

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import prisma from '@/lib/prisma'; // Menggunakan koneksi Prisma Anda

// Inisialisasi Supabase client dengan Service Key (untuk sisi server)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Ambil data teks dari form
    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const courseId = parseInt(formData.get('courseId') as string, 10);
    const file = formData.get('file') as File | null;
    
    // Default content adalah teks (untuk 'TEXT' atau 'LINK')
    let content = formData.get('content') as string;

    // Jika tipenya adalah file (PDF/IMAGE)
    if ((type === 'PDF' || type === 'IMAGE') && file) {
      
      // 1. Tentukan nama bucket dan path file di Supabase Storage
      // GANTI 'materials' DENGAN NAMA BUCKET ANDA DI SUPABASE
      const bucketName = 'materials'; 
      const filePath = `uploads/${courseId}/${Date.now()}-${file.name}`;

      // 2. Upload file ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) {
        console.error('Supabase Upload Error:', uploadError);
        throw new Error(`Gagal upload file: ${uploadError.message}`);
      }

      // 3. Dapatkan URL publik file yang baru di-upload
      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      // Simpan URL publik ini sebagai 'content'
      content = data.publicUrl;
      
    } else if (type === 'PDF' || type === 'IMAGE') {
      // Jika tipe adalah file tapi tidak ada file yang di-upload
      return NextResponse.json({ message: 'File dibutuhkan untuk tipe PDF/IMAGE' }, { status: 400 });
    }

    // 4. Simpan metadata ke Database (PostgreSQL) via Prisma
    const newMaterial = await prisma.material.create({
      data: {
        title: title,
        type: type,
        content: content, // Ini adalah URL (jika PDF/IMAGE/LINK) atau teks (jika TEXT)
        courseId: courseId,
      },
    });

    return NextResponse.json(newMaterial, { status: 201 });

  } catch (error) {
    console.error("Gagal membuat materi baru:", error);
    // Cek jika error adalah object dengan properti message
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan internal";
    return NextResponse.json({ message: "Gagal memproses request", error: errorMessage }, { status: 500 });
  }
}