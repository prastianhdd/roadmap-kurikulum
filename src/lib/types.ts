// Mendefinisikan tipe data sesuai skema Prisma kita

export type MaterialType = 'PDF' | 'LINK' | 'TEXT' | 'IMAGE';

export interface Material {
  id: number;
  title: string;
  type: MaterialType;
  content: string; // URL atau teks
  courseId: number;
}

export interface Course {
  id: number;
  name: string;
  category: string; // 'blue', 'yellow', 'red', 'gray'
  semesterId: number;
  materials: Material[];
}

export interface Semester {
  id: number;
  name: string;
  sks: number;
  order: number;
  courses: Course[];
}

// Tipe data lengkap untuk roadmap
export type RoadmapData = Semester[];