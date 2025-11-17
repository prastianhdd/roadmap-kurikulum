// src/app/api/search/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q'); 

  if (!query) {
    return NextResponse.json(
      { message: "Query parameter 'q' dibutuhkan" }, 
      { status: 400 }
    );
  }

  try {

    const courses = await prisma.course.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive', 
        },
      },
      include: {
        semester: { 
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name: 'asc', 
      },
    });

    return NextResponse.json(courses);

  } catch (error) {
    console.error("Gagal melakukan pencarian:", error);
    return new NextResponse(
      JSON.stringify({ message: "Gagal memproses pencarian" }), 
      { status: 500 }
    );
  }
}