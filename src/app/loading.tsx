// src/app/loading.tsx

// Ini adalah komponen sederhana, Anda bisa membuatnya lebih canggih
// dengan 'skeleton' (garis-garis abu-abu)
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-lg text-gray-500">Memuat data...</p>
      
      {/* Atau gunakan spinner Tailwind: */}
      {/* <div 
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div> */}
    </div>
  );
}