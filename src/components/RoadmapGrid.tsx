// src/components/RoadmapGrid.tsx
'use client'; 

import { useState } from 'react'; 
import { useRouter } from 'next/navigation';
import { Course, RoadmapData } from '@/lib/types';
import styles from '@/app/page.module.css';
import { ChevronDown } from 'lucide-react'; 

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
  
  const [activeSemesterId, setActiveSemesterId] = useState<number | null>(null);

  const handleCourseClick = (course: Course) => {
    router.push(`/course/${course.id}`);
  };

  const handleHeaderClick = (semesterId: number) => {
    if (activeSemesterId === semesterId) {
      setActiveSemesterId(null);
    } else {
      setActiveSemesterId(semesterId);
    }
  };

  return (
    <div className={styles.roadmapContainer}>
      <div className={styles.roadmapGrid}>
        {roadmapData.map((semester) => {

          const isActive = activeSemesterId === semester.id;
          
          return (
            <div key={semester.id} className={styles.semesterColumn}>
              
              <div 
                className={styles.semesterHeader}
                onClick={() => handleHeaderClick(semester.id)}
              >
                <div className="text-left">
                  <h2 className={styles.semesterTitle}>{semester.name}</h2>
                  <p className={styles.semesterSKS}>{semester.sks} SKS</p>
                </div>
                <ChevronDown 
                  size={24} 
                  className={`transform transition-transform duration-300 ${
                    isActive ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
              

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