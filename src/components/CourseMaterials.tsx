// src/components/CourseMaterials.tsx

'use client'; 

import { Material } from '@/lib/types';
import Image from 'next/image';

const getIconPath = (type: string): string => {
  switch (type) {
    case 'PDF': return '/icons/pdf.png';
    case 'LINK': return '/icons/link.png';
    case 'TEXT': return '/icons/text.png';
    case 'IMAGE': return '/icons/image.png';
    case 'WORD': return '/icons/word.png'; 
    case 'DRIVE': return '/icons/drive.png';
    default: return '/icons/unknown.png';
  }
};

const isClickable = (type: string) => 
  type === 'LINK' || 
  type === 'PDF' || 
  type === 'IMAGE' || 
  type === 'WORD' || 
  type === 'DRIVE';  


interface CourseMaterialsProps {
  materials: Material[];
}


export default function CourseMaterials({ materials }: CourseMaterialsProps) {
  return (
    <div className="space-y-4">
      {materials.length > 0 ? (
        materials.map((material) => {
          return (
            <a
              key={material.id}
              href={isClickable(material.type) ? material.content : '#'}
              target={isClickable(material.type) ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => !isClickable(material.type) && e.preventDefault()}
              className={`
                flex items-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm
                transition-all duration-200
                ${isClickable(material.type) 
                  ? 'hover:shadow-md hover:border-blue-300 cursor-pointer' 
                  : 'cursor-default'
                }
              `}
            >
              {/* === IKON DI KIRI (MENGGUNAKAN <Image>) === */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg mr-4 bg-slate-100 border border-slate-200">
                <Image
                  src={getIconPath(material.type)}
                  alt={`${material.type} icon`}
                  width={28} 
                  height={28}
                  className="object-contain"
                />
              </div>
              
              {/* === TULISAN DI KANAN === */}
              <div className="flex-grow">
                <p className="text-lg font-semibold text-gray-800">{material.title}</p>
                
                {/* --- DESKRIPSI DIPERBARUI --- */}
                {material.type === 'TEXT' && (
                  <p className="text-sm text-gray-600 mt-1 italic">
                    &ldquo;{material.content}&rdquo;
                  </p>
                )}
                {material.type === 'IMAGE' && (
                  <p className="text-sm text-gray-600 mt-1">
                    File gambar. Klik untuk membuka di tab baru.
                  </p>
                )}
                {material.type === 'PDF' && (
                  <p className="text-sm text-gray-600 mt-1">
                    File PDF. Klik untuk membuka di tab baru.
                  </p>
                )}
                {material.type === 'LINK' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Link eksternal. Klik untuk membuka di tab baru.
                  </p>
                )}
                {material.type === 'WORD' && (
                  <p className="text-sm text-gray-600 mt-1">
                    File dokumen. Klik untuk membuka di tab baru.
                  </p>
                )}
                {material.type === 'DRIVE' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Link Google Drive. Klik untuk membuka di tab baru.
                  </p>
                )}
                {/* --- AKHIR DESKRIPSI --- */}
              </div>
            </a>
          );
        })
      ) : (
        <div className="p-6 bg-white rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 italic text-center">
            Belum ada materi untuk mata kuliah ini.
          </p> 
        </div>
      )}
    </div>
  );
}