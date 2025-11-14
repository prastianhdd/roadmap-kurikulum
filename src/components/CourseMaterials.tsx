// src/components/CourseMaterials.tsx

'use client'; 

import { Material } from '@/lib/types'; 


const renderMaterialIcon = (type: string) => {
  switch (type) {
    case 'PDF': return '📄';
    case 'LINK': return '🔗';
    case 'TEXT': return '📝';
    case 'IMAGE': return '🖼️';
    default: return '❔';
  }
};

const isClickable = (type: string) => type === 'LINK' || type === 'PDF' || type === 'IMAGE';


interface CourseMaterialsProps {
  materials: Material[];
}


export default function CourseMaterials({ materials }: CourseMaterialsProps) {
  return (
    <div className="space-y-4">
      {materials.length > 0 ? (
        materials.map((material) => (
          <a
            key={material.id}
            href={isClickable(material.type) ? material.content : '#'}
            target={isClickable(material.type) ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => !isClickable(material.type) && e.preventDefault()}
            className={`
              flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm
              ${isClickable(material.type) 
                ? 'hover:bg-gray-100 transition-colors cursor-pointer' 
                : 'cursor-default'
              }
            `}
          >
            <span className="text-3xl mr-4 mt-1">{renderMaterialIcon(material.type)}</span>
            <div>
              <p className="text-lg font-semibold text-gray-800">{material.title}</p>
              
              {material.type === 'TEXT' && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  &ldquo;{material.content}&rdquo;
                </p>
              )}
              {material.type === 'IMAGE' && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  File gambar. Klik untuk membuka di tab baru.
                </p>
              )}
              {material.type === 'PDF' && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  File PDF. Klik untuk membuka di tab baru.
                </p>
              )}
              {material.type === 'LINK' && (
                <p className="text-sm text-gray-600 mt-1 italic">
                  Link eksternal. Klik untuk membuka di tab baru.
                </p>
              )}
            </div>
          </a>
        ))
      ) : (
        <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <p className="text-gray-500 italic text-center">
            Belum ada materi untuk mata kuliah ini.
          </p> 
        </div>
      )}
    </div>
  );
}