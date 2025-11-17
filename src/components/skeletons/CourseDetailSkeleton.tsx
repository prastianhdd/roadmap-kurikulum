// src/components/skeletons/CourseDetailSkeleton.tsx

// Komponen helper untuk satu kartu materi skeleton
const SkeletonMaterialCard = () => (
  <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
    <div className="flex-shrink-0 w-12 h-12 rounded-lg mr-4 bg-gray-200"></div>
    <div className="flex-grow space-y-2">
      <div className="h-5 bg-gray-300 rounded-md w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
    </div>
  </div>
);

export default function CourseDetailSkeleton() {
  return (
    // Latar belakang abu-abu muda
    <div className="bg-slate-50 min-h-screen animate-pulse">
      
      {/* === HERO BANNER SKELETON === */}
      <div className="bg-gray-300 p-8 shadow-md">
        <div className="max-w-4xl mx-auto">
          {/* Tombol Kembali Skeleton */}
          <div className="h-5 bg-gray-400 rounded-md w-1/4 mb-4"></div>
          
          {/* Judul Skeleton */}
          <div className="h-10 bg-gray-400 rounded-md w-3/4 mt-4 mb-2"></div>
          <div className="h-6 bg-gray-400 rounded-md w-1/3"></div>
        </div>
      </div>

      {/* === KONTEN SKELETON === */}
      <div className="max-w-4xl mx-auto p-4 md:py-10 md:px-8">
        {/* Judul "Materi Pembelajaran" Skeleton */}
        <div className="h-7 bg-gray-300 rounded-md w-1/2 mb-6"></div>
        
        {/* Kartu Materi Skeleton */}
        <div className="space-y-4">
          <SkeletonMaterialCard />
          <SkeletonMaterialCard />
        </div>
      </div>
    </div>
  );
}