// src/components/UploadForm.tsx

'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// Impor tipe data Anda
import { RoadmapData, Course, MaterialType } from '@/lib/types'; 

// --- FUNGSI HELPER BARU ---
const getFileUploadLabel = (type: MaterialType): string => {
  switch (type) {
    case 'PDF': return 'Upload File PDF';
    case 'IMAGE': return 'Upload File Gambar';
    case 'WORD': return 'Upload File Dokumen (Word)';
    default: return 'Upload File';
  }
};

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


export default function UploadForm() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [type, setType] = useState<MaterialType>('LINK');
  const [textContent, setTextContent] = useState<string>(''); 
  const [file, setFile] = useState<File | null>(null); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function loadCourses() {
      try {
        const response = await fetch('/api/roadmap');
        if (!response.ok) throw new Error('Gagal mengambil data roadmap');
        
        const data: RoadmapData = await response.json();
        const allCourses = data.flatMap(semester => semester.courses);
        setCourses(allCourses);
        
        if (allCourses.length > 0) {
          setCourseId(allCourses[0].id.toString());
        }
      } catch (error) {
        console.error("Gagal memuat data roadmap:", error);
        setMessage("Gagal memuat mata kuliah");
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('courseId', courseId);

    // --- LOGIKA DIPERBARUI ---
    // Jika tipe adalah file
    if (type === 'PDF' || type === 'IMAGE' || type === 'WORD') {
      if (file) {
        formData.append('file', file);
      } else {
        setMessage(`Tolong pilih file untuk tipe ${type}`);
        setIsLoading(false);
        return;
      }
    } 
    // Jika tipe adalah link atau teks
    else { 
      formData.append('content', textContent);
    }
    // --- AKHIR LOGIKA ---

    try {
      const response = await fetch('/api/materials', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal meng-upload materi');
      }

      setMessage('Materi berhasil di-upload!');
      setTitle('');
      setTextContent('');
      setFile(null);
      
      const fileInput = document.getElementById('file') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = "w-full p-3 border border-slate-300 rounded-lg shadow-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";


  if (isLoading && courses.length === 0) {
    return (
      <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-lg">
        <p className="text-gray-600">Loading data mata kuliah...</p>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-6 bg-white p-8 border border-slate-400 rounded-2xl shadow-lg"
    >
      {message && (
        <p className={`p-4 rounded-lg ${message.includes('Gagal') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
          {message}
        </p>
      )}

      <div>
        <label htmlFor="course" className={labelStyle}>
          Mata Kuliah
        </label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className={inputStyle}
          disabled={isLoading}
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="title" className={labelStyle}>
          Judul Materi
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputStyle}
          placeholder='Pertemuan 1 - Dasar Pemrograman'
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="type" className={labelStyle}>
          Tipe File Materi
        </label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as MaterialType)}
          className={inputStyle}
          disabled={isLoading}
        >
          {/* --- OPSI DIPERBARUI --- */}
          <option value="LINK">LINK (Tautan Eksternal)</option>
          <option value="DRIVE">DRIVE (Link Google Drive)</option>
          <option value="TEXT">TEXT (Teks Singkat)</option>
          <option value="PDF">PDF (File)</option>
          <option value="IMAGE">IMAGE (File)</option>
          <option value="WORD">WORD (File Dokumen)</option>
          {/* --- AKHIR OPSI --- */}
        </select>
      </div>

      {/* --- LOGIKA DIPERBARUI --- */}
      {(type === 'LINK' || type === 'TEXT' || type === 'DRIVE') ? (
        <div>
          <label htmlFor="textContent" className={labelStyle}>
            {getTextContentLabel(type)}
          </label>
          <textarea
            id="textContent"
            rows={4}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            className={inputStyle}
            placeholder={type === 'LINK' || type === 'DRIVE' ? 'https://...' : 'Tulis teks singkat di sini...'}
            disabled={isLoading}
            required
          />
        </div>
      ) : (
        <div>
          <label htmlFor="file" className={labelStyle}>
            {getFileUploadLabel(type)}
          </label>
          <input
            type="file"
            id="file"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFile(e.target.files ? e.target.files[0] : null)}
            className={`${inputStyle} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer`}
            accept={getAcceptableFileTypes(type)}
            disabled={isLoading}
            required
          />
        </div>
      )}
      {/* --- AKHIR LOGIKA --- */}

      <div className="pt-2 text-right">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Meng-upload...' : 'Simpan Materi'}
        </button>
      </div>
    </form>
  );
}