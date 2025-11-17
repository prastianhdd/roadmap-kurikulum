// src/app/course/[id]/loading.tsx

import CourseDetailSkeleton from "@/components/skeletons/CourseDetailSkeleton";

export default function Loading() {
  // Tampilkan skeleton detail saat memuat halaman mata kuliah
  return <CourseDetailSkeleton />;
}