// src/components/LogoutButton.tsx
'use client'

import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { LogOut } from 'lucide-react'
import { useState } from 'react';

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createSupabaseClient()
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    // Tambahkan konfirmasi sebelum logout
    if (window.confirm('Apakah Anda yakin ingin logout?')) {
      setIsLoading(true);
      await supabase.auth.signOut()
      router.push('/login')
      router.refresh()
    }
  }

  return (
    // 1. Ini adalah CARD-nya (putih, shadow, rounded)
    //    Lebarnya akan otomatis mengikuti 'max-w-4xl' dari parent
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
      
      {/* 2. Div ini untuk men-tengahkan tombol */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          // 3. Style tombol baru (merah, besar)
          className="flex items-center justify-center gap-2 py-3 px-8 rounded-lg text-sm font-semibold 
                     bg-red-600 text-white 
                     hover:bg-red-700 transition-colors
                     disabled:bg-gray-400"
        >
          <LogOut size={16} />
          <span>{isLoading ? 'Loading...' : 'Logout'}</span>
        </button>
      </div>
    </div>
  )
}