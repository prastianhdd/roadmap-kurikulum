// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import { RoadmapData } from '../src/lib/types'; 


const prisma = new PrismaClient();
const MOCK_ROADMAP_DATA: RoadmapData = [
  {
    id: 1,
    name: 'Semester 1',
    sks: 20,
    order: 1,
    courses: [
      { id: 1, name: 'Bahasa Indonesia', category: 'green', semesterId: 1, materials: [] },
      { id: 2, name: 'Emerging Technologies & Digital Transformation', category: 'green', semesterId: 1, materials: [] },
      { id: 3, name: 'Kalkulus', category: 'blue', semesterId: 1, materials: [] },
      { id: 4, name: 'Logika Informatika', category: 'blue', semesterId: 1, materials: [] },
      { id: 5, name: 'Algoritma Pemrograman', category: 'yellow', semesterId: 1, materials: [] },
      { id: 6, name: 'Sistem Operasi', category: 'blue', semesterId: 1, materials: [] },
      { id: 7, name: 'Sistem Basis Data', category: 'blue', semesterId: 1, materials: [] },
    ],
  },
  {
    id: 2,
    name: 'Semester 2',
    sks: 20,
    order: 2,
    courses: [
      { id: 8, name: 'Pendidikan Agama', category: 'green', semesterId: 2, materials: [] },
      { id: 9, name: 'Aljabar Linear Matriks', category: 'blue', semesterId: 2, materials: [] },
      { id: 10, name: 'Analisis Algoritma', category: 'blue', semesterId: 2, materials: [] },
      { id: 11, name: 'Bahasa Inggris', category: 'green', semesterId: 2, materials: [] },
      { id: 12, name: 'Artificial Intelligence', category: 'yellow', semesterId: 2, materials: [] },
      { id: 13, name: 'Sistem dan Jaringan Komputer', category: 'blue', semesterId: 2, materials: [] },
      { id: 14, name: 'Sistem Informasi', category: 'blue', semesterId: 2, materials: [] },
    ],
  },
  {
    id: 3,
    name: 'Semester 3',
    sks: 24,
    order: 3,
    courses: [
      { id: 15, name: 'Statistika Probabilitas', category: 'blue', semesterId: 3, materials: [] },
      { id: 16, name: 'UI/UX', category: 'blue', semesterId: 3, materials: [] },
      { id: 17, name: 'Matematika Diskrit', category: 'blue', semesterId: 3, materials: [] },
      { id: 18, name: 'Oriented Object Programming', category: 'yellow', semesterId: 3, materials: [] },
      { id: 19, name: 'Agoritma Genetika', category: 'yellow', semesterId: 3, materials: [] },
      { id: 20, name: 'Jaringan Syaraf Tiruan', category: 'blue', semesterId: 3, materials: [] },
      { id: 21, name: 'Grafika Komputer', category: 'blue', semesterId: 3, materials: [] },
      { id: 22, name: 'Microprocessor', category: 'blue', semesterId: 3, materials: [] },
    ],
  },
  {
    id: 4,
    name: 'Semester 4',
    sks: 21,
    order: 4,
    courses: [
      { id: 23, name: 'Pendidikan Anti Korupsi', category: 'green', semesterId: 4, materials: [] },
      { id: 24, name: 'Metode Numerik', category: 'blue', semesterId: 4, materials: [] },
      { id: 25, name: 'Mobile Programming', category: 'blue', semesterId: 4, materials: [] },
      { id: 26, name: 'Web Programming', category: 'blue', semesterId: 4, materials: [] },
      { id: 27, name: 'Pengolahan Citra', category: 'blue', semesterId: 4, materials: [] },
      { id: 28, name: '3D Modeling', category: 'blue', semesterId: 4, materials: [] },
      { id: 29, name: 'IoT', category: 'blue', semesterId: 4, materials: [] },
      { id: 30, name: 'Technopreunership', category: 'blue', semesterId: 4, materials: [] },
    ],
  },
  {
    id: 5,
    name: 'Semester 5',
    sks: 21,
    order: 5,
    courses: [
      { id: 31, name: 'Pancasila dan Kewarganegaraan', category: 'green', semesterId: 5, materials: [] },
      { id: 32, name: 'Komputer dan Masyarakat', category: 'blue', semesterId: 5, materials: [] },
      { id: 33, name: 'Rekayasa Perangkat Lunak', category: 'blue', semesterId: 5, materials: [] },
      { id: 34, name: 'DSS', category: 'yellow', semesterId: 5, materials: [] },
      { id: 35, name: 'Machine Learning', category: 'blue', semesterId: 5, materials: [] },
      { id: 36, name: 'Cloud Computing', category: 'blue', semesterId: 5, materials: [] },
      { id: 37, name: 'Keamanan Data dan Jaringan', category: 'blue', semesterId: 5, materials: [] },
    ],
  },
  {
    id: 6,
    name: 'Semester 6',
    sks: 15,
    order: 6,
    courses: [
      { id: 38, name: 'Metodologi Penelitian', category: 'blue', semesterId: 6, materials: [] },
      { id: 39, name: 'KKL/Kunjungan Industri', category: 'blue', semesterId: 6, materials: [] },
      { id: 40, name: 'Proyek Inovasi Digital', category: 'blue', semesterId: 6, materials: [] },
      { id: 41, name: 'Deep Learning', category: 'blue', semesterId: 6, materials: [] },
      { id: 42, name: 'Metodologi Pengembangan Perangkat Lunak Lanjut', category: 'blue', semesterId: 6, materials: [] },
    ],
  },
  {
    id: 7,
    name: 'Semester 7',
    sks: 14,
    order: 7,
    courses: [
      { id: 43, name: 'Seminar Skripsi', category: 'blue', semesterId: 7, materials: [] },
      { id: 44, name: 'Internship/Magang', category: 'blue', semesterId: 7, materials: [] },
      { id: 45, name: 'E-Commerce', category: 'red', semesterId: 7, materials: [] },
      { id: 46, name: 'Pemrograman Game', category: 'red', semesterId: 7, materials: [] },
      { id: 47, name: 'Sistem Pakar', category: 'red', semesterId: 7, materials: [] },
      { id: 48, name: 'Data Mining', category: 'red', semesterId: 7, materials: [] },
      { id: 49, name: 'Data Dinamis', category: 'red', semesterId: 7, materials: [] },
      { id: 50, name: 'Time Series', category: 'red', semesterId: 7, materials: [] },
    ],
  },
  {
    id: 8,
    name: 'Semester 8',
    sks: 6,
    order: 8,
    courses: [
      {
        id: 51,
        name: 'Skripsi/Tugas Akhir',
        category: 'blue',
        semesterId: 8,
        materials: [
          { id: 1, courseId: 51, title: 'Panduan Penulisan Skripsi (PDF)', type: 'PDF', content: '/path/to/panduan.pdf' },
          { id: 2, courseId: 51, title: 'Contoh Halaman Judul (Text)', type: 'TEXT', content: 'Ini adalah format halaman judul...' },
          { id: 3, courseId: 51, title: 'Portal Akademik', type: 'LINK', content: 'https://portal.akademik.ac.id' },
          { id: 4, courseId: 51, title: 'Contoh Catatan Bimbingan (Image)', type: 'IMAGE', content: '/path/to/catatan.jpg' },
        ],
      },
    ],
  },
];

async function main() {


  console.log('Memulai proses seeding...');

  for (const semester of MOCK_ROADMAP_DATA) {
    console.log(`Menambahkan Semester: ${semester.name}`);

    await prisma.semester.create({
      data: {
        name: semester.name,
        sks: semester.sks,
        order: semester.order,

        courses: {
          create: semester.courses.map((course) => ({
            name: course.name,
            category: course.category,
            materials: {
              create: course.materials.map((material) => ({
                title: material.title,
                type: material.type,
                content: material.content,
              })),
            },
          })),
        },
      },
    });
  }

  console.log('Seeding selesai.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });