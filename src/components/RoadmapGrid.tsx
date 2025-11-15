// src/components/RoadmapGrid.tsx
'use client'; 

import { useState } from 'react'; // 1. Import useState
import { useRouter } from 'next/navigation';
import { Course, RoadmapData } from '@/lib/types';
import styles from '@/app/page.module.css';
import { ChevronDown } from 'lucide-react'; // 2. Import ikon panah

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
  
  // 3. Tambahkan state untuk melacak semester yang aktif
  //    Default-nya 'null' (semua tertutup)
  const [activeSemesterId, setActiveSemesterId] = useState<number | null>(null);

  const handleCourseClick = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  // 4. Buat fungsi untuk menangani klik pada header semester
  const handleHeaderClick = (semesterId: number) => {
    // Jika mengklik yang sudah aktif, tutup.
    if (activeSemesterId === semesterId) {
      setActiveSemesterId(null);
    } else {
      // Jika mengklik yang baru, buka.
      setActiveSemesterId(semesterId);
    }
  };

  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.roadmapGrid}>
        {roadmapData.map((semester) => {
          // 5. Cek apakah semester ini adalah semester yang aktif
          const isActive = activeSemesterId === semester.id;
          
          return (
            <div key={semester.id} className={styles.semesterColumn}>
              
              {/* 6. Buat header bisa diklik */}
              <div 
                className={styles.semesterHeader}
                onClick={() => handleHeaderClick(semester.id)}
              >
                <div className="text-left">
                  <h2 className={styles.semesterTitle}>{semester.name}</h2>
                  <p className={styles.semesterSKS}>{semester.sks} SKS</p>
                </div>
                {/* 7. Tambahkan ikon panah & rotasi */}
                <ChevronDown 
                  size={24} 
                  className={`transform transition-transform duration-300 ${
                    isActive ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              
              {/* 8. Tampilkan/Sembunyikan daftar mata kuliah */}
              {/*
                - 'hidden' akan menyembunyikan di mobile
                - 'lg:block' akan MEMAKSA tampil di desktop (me-override 'hidden')
                - 'block' akan tampil jika 'isActive'
              */}
              <div 
                className={`${styles.courseList} ${
                  isActive ? 'block' : 'hidden'
                } lg:block`}
              >
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
          );
        })}
      </div>
    </div>
  );
}