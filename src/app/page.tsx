// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Course, RoadmapData } from '@/lib/types';
import styles from './page.module.css';

const categoryColorMap: { [key: string]: string } = {
  blue: styles.colorBlue,
  yellow: styles.colorYellow,
  red: styles.colorRed,
  green: styles.colorGreen,
};

export default function Home() {
  const [roadmapData, setRoadmapData] = useState<RoadmapData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch('/api/roadmap');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setRoadmapData(data);
        // --- AKHIR PERUBAHAN ---

      } catch (error) {
        console.error("Gagal mengambil data roadmap:", error);
        
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, []);

  const handleCourseClick = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  const totalSKS = roadmapData.reduce((acc, semester) => acc + semester.sks, 0);

  if (isLoading) {
    return (
      <main className={styles.mainContainer}>
        <p className="text-center text-gray-500">Loading roadmap data...</p>
      </main>
    );
  }

  return (
    <main className={styles.mainContainer}>
        {/* ... (sisa JSX Anda tidak berubah) ... */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            2025 Computer Science Curriculum Map
          </h1>
          <p className={styles.subTitle}>Total {totalSKS} SKS</p>
        </div>

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
    </main>
  );
}