// src/app/page.tsx

import styles from './page.module.css';
import { getRoadmapData } from '@/lib/data'; // 1. Import fungsi data Anda
import RoadmapGrid from '@/components/RoadmapGrid'; // 2. Buat komponen client baru

// 3. Ubah fungsi menjadi 'async'
export default async function Home() {
  
  // 4. Ambil data langsung di server
  const roadmapData = await getRoadmapData();

  const totalSKS = roadmapData.reduce((acc, semester) => acc + semester.sks, 0);

  // HAPUS: useEffect, useState, dan state isLoading

  // if (isLoading) { ... } // <-- Hapus blok 'if (isLoading)'

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