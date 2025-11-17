// src/components/MaterialList.tsx
'use client'

import { useState, useTransition } from 'react'
import { Material } from '@prisma/client' // Import tipe dari Prisma
import { deleteMaterial } from '@/app/admin/actions' // Import server action
import { Trash2, Loader2, Image as ImageIcon, Link, Type, FileText } from 'lucide-react'

// Tipe kustom untuk menyertakan relasi Course
type MaterialWithCourse = Material & {
  course: { name: string }
}

interface MaterialListProps {
  materials: MaterialWithCourse[]
}

// Ikon berdasarkan Tipe
const TypeIcon = ({ type }: { type: string }) => {
  if (type === 'PDF') return <FileText className="w-4 h-4 text-red-600" />
  if (type === 'IMAGE') return <ImageIcon className="w-4 h-4 text-purple-600" />
  if (type === 'LINK') return <Link className="w-4 h-4 text-blue-600" />
  if (type === 'TEXT') return <Type className="w-4 h-4 text-gray-600" />
  return null
}

export default function MaterialList({ materials }: MaterialListProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  
  const handleDelete = (materialId: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus materi ini? Aksi ini tidak bisa dibatalkan.')) {
      setError(null)
      startTransition(async () => {
        const result = await deleteMaterial(materialId)
        if (!result.success) {
          setError(result.message)
        }
      })
    }
  }

  return (
    <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Daftar Materi Ter-upload
      </h2>

      {error && (
        <p className="p-4 rounded-md bg-red-100 text-red-800 mb-4">
          Error: {error}
        </p>
      )}

      {materials.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada materi yang di-upload.</p>
      ) : (
        <div className="flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Judul Materi</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mata Kuliah</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Tipe</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Hapus</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {materials.map((material) => (
                    <tr key={material.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {material.title}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{material.course.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className="flex items-center gap-2">
                          <TypeIcon type={material.type} />
                          {material.type}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => handleDelete(material.id)}
                          disabled={isPending}
                          className="text-red-600 hover:text-red-900 disabled:text-gray-400"
                        >
                          {isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}