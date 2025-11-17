// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { BookOpen } from 'lucide-react'

// (Style ini diambil dari UploadForm Anda)
const inputStyle = "w-full p-3 border border-slate-300 rounded-lg shadow-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200";
const labelStyle = "block text-sm font-semibold text-gray-900 mb-2"; // Sedikit mengurangi margin bottom

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createSupabaseClient()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('Mencoba masuk...');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setMessage(`Gagal login: ${error.message}`);
      setIsLoading(false);
    } else {
      setMessage('Login berhasil! Mengarahkan ke admin...');
      // Arahkan ke admin, dan refresh layout server
      router.push('/admin');
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-100 p-4">
      {/* Container form sekarang menjadi "kartu" utama.
        Branding (logo dan judul) dipindahkan ke dalam kartu.
      */}
      <form 
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-gradient-to-br from-green-100 to-slate-100 
                  backdrop-blur-lg 
                  p-8 sm:p-10 rounded-xl shadow-lg space-y-6 
                  border border-white/30"
      >
        {/* --- Branding Section --- */}
        <div className="flex flex-col items-center space-y-3 mb-6">
          <div className="flex items-center space-x-2 text-blue-600">
            <BookOpen size={32} />
            <span className="font-bold text-3xl">Computer Science</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">
            Admin Portal
          </h1>
        </div>
        
        {/* --- Message Section --- */}
        {message && (
          <p className={`p-3 rounded-lg text-center text-sm ${
            message.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </p>
        )}

        {/* --- Form Fields Section --- */}
        <div className="space-y-5">
          <div>
            <label className={labelStyle} htmlFor="email">Email</label>
            <input
              className={inputStyle}
              type="email"
              id="email"
              placeholder="nama@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label className={labelStyle} htmlFor="password">Password</label>
            <input
              className={inputStyle}
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* --- Submit Button Section --- */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}