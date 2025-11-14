// Mendefinisikan tipe data sesuai skema Prisma kita

export type MaterialType = 'PDF' | 'LINK' | 'TEXT' | 'IMAGE';

export interface Material {
  id: number;
  title: string;
  type: MaterialType;
  content: string; 
  courseId: number;
}

export interface Course {
  id: number;
  name: string;
  category: string; 
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


export type RoadmapData = Semester[];