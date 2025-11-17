// src/components/skeletons/RoadmapSkeleton.tsx

import styles from '@/app/page.module.css';

// Komponen helper untuk satu kartu mata kuliah skeleton
const SkeletonCourseCard = () => (
  <div className="w-full p-4 rounded-lg bg-gray-200 h-14"></div>
);

// Komponen helper untuk satu kolom semester
const SkeletonSemesterColumn = () => (
  <div className={styles.semesterColumn}>
    {/* Header Semester */}
    <div className="bg-gray-200 text-white p-3 py-4 rounded-lg w-full h-[72px]">
    </div>
    
    {/* Daftar Mata Kuliah */}
    <div className={`${styles.courseList} space-y-2`}>
      <SkeletonCourseCard />
      <SkeletonCourseCard />
      <SkeletonCourseCard />
    </div>
  </div>
);


export default function RoadmapSkeleton() {
  return (
    <main className={styles.mainContainer}>
      {/* Header Skeleton */}
      <div className={styles.header}>
        <div className="h-10 bg-gray-300 rounded-md w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 rounded-md w-1/4 mx-auto"></div>
      </div>

      {/* Grid Skeleton */}
      <div className="animate-pulse">
        <div className={styles.roadmapContainer}>
          <div className={styles.roadmapGrid}>
            {/* Tampilkan 4 kolom skeleton untuk desktop */}
            <SkeletonSemesterColumn />
            <SkeletonSemesterColumn />
            <SkeletonSemesterColumn />
            <SkeletonSemesterColumn />
          </div>
        </div>
      </div>
    </main>
  );
}