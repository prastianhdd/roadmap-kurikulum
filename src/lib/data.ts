// src/lib/data.ts

import { RoadmapData, Course } from './types';
import prisma from './prisma'; 

export async function getRoadmapData(): Promise<RoadmapData> {
  const semesters = await prisma.semester.findMany({
    
include: {
      courses: {
        include: {
          materials: true, 
        },
      },
    },

    orderBy: {
      order: 'asc',
    },
  });
  return semesters; 
}

export async function getCourseById(id: number): Promise<Course | null> {
  const course = await prisma.course.findUnique({
    where: { id: id },
    include: {
      materials: true,
    },
  });
  
  return course;
}