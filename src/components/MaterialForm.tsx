// src/components/MaterialForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useState, useEffect } from 'react';
import { Material } from '@prisma/client';
import { MaterialType } from '@/lib/types';
import { AlertCircle } from 'lucide-react';

// --- Tipe Data (Helper) ---
type CourseDropdownItem = {
  id: number;
  name: string;
};

interface MaterialFormProps {
  courses: CourseDropdownItem[];
  // 'action' adalah Server Action yang akan kita buat
  action: (prevState: any, formData: FormData) => Promise<{ success: boolean; message: string; }>;
  // 'initialData' opsional, hanya untuk mode edit
  initialData?: Material | null;
  buttonText: string;
}

// --- Fungsi Helper (dari file Anda) ---
const getFileUploadLabel = (type: MaterialType): string => {
  switch (type) {
    case 'PDF': return 'Upload File PDF';
    case 'IMAGE': return 'Upload File Gambar';
    case 'WORD': return 'Upload File Dokumen (Word)';
    default: return 'Upload File';
  }
};
// ... (sisa helper Anda: getAcceptableFileTypes, getTextContentLabel) ...
const getAcceptableFileTypes = (type: MaterialType): string => {
  switch (type) {
    case 'PDF': return '.pdf';
    case 'IMAGE': return 'image/*';
    case 'WORD': return '.doc, .docx';
    default: return '';
  }
};
const getTextContentLabel = (type: MaterialType): string => {
  switch (type) {
    case 'LINK': return 'URL Tautan';
    case 'DRIVE': return 'URL Google Drive';
    case 'TEXT': return 'Isi Teks';
    default: return 'Konten';
  }
};
// --- AKHIR FUNGSI HELPER ---

// Komponen Tombol Submit terpisah untuk menggunakan 'useFormStatus'
function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
    >
      {pending ? 'Menyimpan...' : text}
    </button>
  );
}

export default function MaterialForm({ courses, action, initialData, buttonText }: MaterialFormProps) {
  // useFormState untuk menangani feedback dari server action
  const [state, formAction] = useFormState(action, { success: false, message: '' });

  // State lokal untuk mengontrol UI form
  const [type, setType] = useState<MaterialType>(initialData?.type as MaterialType || 'LINK');
  
  // State untuk mereset input file setelah submit sukses
  const [fileKey, setFileKey] = useState(Date.now());

  useEffect(() => {
    if (state.success) {
      // Jika sukses (create/update), reset form
      // (Kita tidak perlu reload halaman lagi!)
      (document.getElementById('material-form') as HTMLFormElement)?.reset();
      setType('LINK');
      setFileKey(Date.now()); // Reset input file
    }
  }, [state]);

  const inputStyle = "w-full p-3 border border-slate-300 rounded-lg shadow-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const isFileBased = type === 'PDF' || type === 'IMAGE' || type === 'WORD';

  return (
    <form 
      id="material-form"
      action={formAction} // Panggil formAction
      className="space-y-6 bg-white p-8 border border-slate-200 rounded-2xl shadow-lg"
    >
      {/* Tampilkan pesan sukses atau error dari Server Action */}
      {state.message && (
        <div className={`p-4 rounded-lg flex gap-3 ${
            state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
          <AlertCircle size={20} className="flex-shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      {/* Mata Kuliah */}
      <div>
        <label htmlFor="course" className={labelStyle}>Mata Kuliah</label>
        <select
          id="course"
          name="courseId" // 'name' penting untuk FormData
          defaultValue={initialData?.courseId.toString()}
          className={inputStyle}
          required
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Judul Materi */}
      <div>
        <label htmlFor="title" className={labelStyle}>Judul Materi</label>
        <input
          type="text"
          id="title"
          name="title" // 'name' penting untuk FormData
          defaultValue={initialData?.title}
          className={inputStyle}
          placeholder='Pertemuan 1 - Dasar Pemrograman'
          required
        />
      </div>

      {/* Tipe Materi */}
      <div>
        <label htmlFor="type" className={labelStyle}>Tipe File Materi</label>
        <select
          id="type"
          name="type" // 'name' penting untuk FormData
          value={type} // Kontrol 'value' dengan state
          onChange={(e) => setType(e.target.value as MaterialType)}
          className={inputStyle}
        >
          <option value="LINK">LINK (Tautan Eksternal)</option>
          <option value="DRIVE">DRIVE (Link Google Drive)</option>
          <option value="TEXT">TEXT (Teks Singkat)</option>
          <option value="PDF">PDF (File)</option>
          <option value="IMAGE">IMAGE (File)</option>
          <option value="WORD">WORD (File Dokumen)</option>
        </select>
      </div>

      {/* Konten (Teks/Link) */}
      {!isFileBased ? (
        <div>
          <label htmlFor="content" className={labelStyle}>
            {getTextContentLabel(type)}
          </label>
          <textarea
            id="content"
            name="content" // 'name' penting untuk FormData
            rows={4}
            defaultValue={initialData?.type === type ? initialData?.content : ''}
            className={inputStyle}
            placeholder={type === 'LINK' || type === 'DRIVE' ? 'https://...' : 'Tulis teks singkat di sini...'}
            required
          />
        </div>
      ) : (
      // Konten (File)
        <div>
          <label htmlFor="file" className={labelStyle}>
            {getFileUploadLabel(type)}
          </label>
          <input
            type="file"
            id="file"
            name="file" // 'name' penting untuk FormData
            key={fileKey} // Gunakan 'key' untuk mereset
            className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`}
            accept={getAcceptableFileTypes(type)}
            // 'required' hanya jika kita membuat materi BARU
            required={!initialData} 
          />
          {initialData && <p className="text-xs text-gray-500 mt-2">Kosongkan jika tidak ingin mengubah file.</p>}
        </div>
      )}

      {/* Tombol Submit */}
      <div className="pt-2 text-right">
        <SubmitButton text={buttonText} />
      </div>
    </form>
  );
}