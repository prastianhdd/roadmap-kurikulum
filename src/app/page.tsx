// src/app/page.tsx

'use client';

// HAPUS useState dan CourseModal
// import { useState } from 'react';
// import { Course, RoadmapData } from '@/lib/types';
// import CourseModal from '@/components/CourseModal';

import { useRouter } from 'next/navigation'; // <-- GANTI useState dengan useRouter
import { getRoadmapData } from '@/lib/data';
import { Course, RoadmapData } from '@/lib/types'; // <-- Tambahkan 'Course'
import styles from './page.module.css';

const roadmapData: RoadmapData = getRoadmapData();

const categoryColorMap: { [key: string]: string } = {
  blue: styles.colorBlue,
  yellow: styles.colorYellow,
  red: styles.colorRed,
  green: styles.colorGreen,
};

export default function Home() {
  // HAPUS state modal
  // const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const router = useRouter(); // <-- Buat instance router

  // HAPUS fungsi handle modal
  // const handleCourseClick = (course: Course) => {
  //   setSelectedCourse(course);
  // };
  // const handleCloseModal = () => {
  //   setSelectedCourse(null);
  // };

  // BUAT FUNGSI handleCourseClick BARU
  const handleCourseClick = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  const totalSKS = roadmapData.reduce((acc, semester) => acc + semester.sks, 0);

  return (
    <main className={styles.mainContainer}>
        {/* ... (Header Anda tidak berubah) ... */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            Penyusunan Mata Kuliah OBE 2025
          </h1>
          <p className={styles.subTitle}>Total {totalSKS} SKS</p>
        </div>

        {/* ... (Roadmap Container tidak berubah) ... */}
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
                      // UBAH onClick di sini
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

      {/* HAPUS CourseModal dari sini */}
      {/* <CourseModal course={selectedCourse} onClose={handleCloseModal} /> */}
    </main>
  );
}