// src/app/admin/page.tsx

import UploadForm from '@/components/UploadForm';

export default function AdminPage() {
  return (
    // 1. Latar belakang abu-abu/off-white untuk seluruh halaman admin
    <div className="min-h-screen mx-auto bg-slate-50 py-8">
      
      {/* 2. Kontainer konsisten dengan layout utama Anda */}
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* 3. Judul halaman diletakkan di luar kartu form */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-green-700">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-lg text-red-600">
            Upload dan kelola materi pembelajaran baru.
          </p>
        </div>

        {/* 4. Form upload dibatasi lebarnya agar lebih rapi */}
        <div className="max-w-4xl">
          <UploadForm />
        </div>

      </div>
    </div>
  );
}