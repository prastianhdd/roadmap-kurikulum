// src/app/admin/page.tsx

import UploadForm from '@/components/UploadForm';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      
      <div className="max-w-4xl mx-auto px-4">
        
        <div className="mb-8 p-8 bg-gradient-to-r from-green-800 to-blue-800 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-white">
            Admin Dashboard
          </h1>
          <p className="mt-1 text-lg text-slate-100">
            Upload dan kelola materi pembelajaran baru.
          </p>
        </div>

        <UploadForm />

      </div>
    </div>
  );
}