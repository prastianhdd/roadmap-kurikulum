// src/app/api/roadmap/route.ts

import { getRoadmapData } from '@/lib/data'; 
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await getRoadmapData();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Gagal mengambil data roadmap untuk API:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal mengambil data" }), 
      { status: 500 }
    );
  }
}