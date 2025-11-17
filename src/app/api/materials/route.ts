// src/app/api/materials/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import prisma from '@/lib/prisma';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const type = formData.get('type') as string;
    const courseId = parseInt(formData.get('courseId') as string, 10);
    const file = formData.get('file') as File | null;
    
    let content = formData.get('content') as string;
    let storagePath: string | null = null; // Variabel untuk path

    // Cek semua tipe file
    const isFileBased = type === 'PDF' || type === 'IMAGE' || type === 'WORD';

    if (isFileBased && file) {
      const bucketName = 'materials'; 
      const filePath = `uploads/${courseId}/${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);

      if (uploadError) throw new Error(`Gagal upload file: ${uploadError.message}`);

      const { data } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);

      content = data.publicUrl;
      storagePath = filePath; // Simpan path-nya
      
    } else if (isFileBased && !file) {
      return NextResponse.json({ message: `File dibutuhkan untuk tipe ${type}` }, { status: 400 });
    }

    // Simpan ke database
    const newMaterial = await prisma.material.create({
      data: {
        title: title,
        type: type,
        content: content, 
        courseId: courseId,
        storagePath: storagePath, // Simpan path ke DB
      },
    });

    return NextResponse.json(newMaterial, { status: 201 });

  } catch (error) {
    console.error("Gagal membuat materi baru:", error);
    const errorMessage = (error instanceof Error) ? error.message : "Terjadi kesalahan internal";
    return NextResponse.json({ message: "Gagal memproses request", error: errorMessage }, { status: 500 });
  }
}