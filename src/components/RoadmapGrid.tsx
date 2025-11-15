// src/components/RoadmapGrid.tsx
'use client'; // Komponen ini interaktif

import { useRouter } from 'next/navigation';
import { Course, RoadmapData } from '@/lib/types';
import styles from '@/app/page.module.css'; // Impor style dari page

// Definisikan map warna di sini
const categoryColorMap: { [key: string]: string } = {
  blue: styles.colorBlue,
  yellow: styles.colorYellow,
  red: styles.colorRed,
  green: styles.colorGreen,
};

interface RoadmapGridProps {
  roadmapData: RoadmapData;
}

export default function RoadmapGrid({ roadmapData }: RoadmapGridProps) {
  const router = useRouter();

  const handleCourseClick = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.roadmapGrid}>
        {roadmapData.map((semester) => (
          <div key={semester.id} className={styles.semesterColumn}>
            
            <div className={styles.semesterHeader}>
              <h2 className={styles.semesterTitle}>{semester.name}</h2>
              <p className={styles.semesterSKS}>{semester.sks} SKS</p>
            </div>
            
            <div className={styles.courseList}>
              {semester.courses.map((course) => (
                <div
                  key={course.id}
                  className={`${styles.courseCard} ${
                    categoryColorMap[course.category] || styles.colorGreen
                  }`}
                  onClick={() => handleCourseClick(course)}
                >
                  {course.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}