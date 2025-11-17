// src/app/page.tsx

import styles from './page.module.css';
import { getRoadmapData } from '@/lib/data'; 
import RoadmapGrid from '@/components/RoadmapGrid'; 


export default async function Home() {
  
  const roadmapData = await getRoadmapData();

  const totalSKS = roadmapData.reduce((acc, semester) => acc + semester.sks, 0);

  return (
    <main className={styles.mainContainer}>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>
            2025 Computer Science Curriculum Map
          </h1>
          <p className={styles.subTitle}>Total {totalSKS} SKS</p>
        </div>

        {/* 5. Pindahkan Grid ke komponen client terpisah */}
        <RoadmapGrid roadmapData={roadmapData} />
    </main>
  );
}