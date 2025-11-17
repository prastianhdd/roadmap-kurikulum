// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { BookOpen } from 'lucide-react'

// (Style ini diambil dari UploadForm Anda)
const inputStyle = "w-full p-3 border border-slate-300 rounded-lg shadow-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors duration-200";
const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";

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

  // PENTING: Untuk membuat akun admin pertama Anda:
  // 1. Pergi ke Supabase Dashboard > Authentication > Users > Add User
  // 2. Atau, buat fungsi handleSignUp() di sini, panggil sekali, lalu hapus.
  //    const { error } = await supabase.auth.signUp({ email, password });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50 p-4">
      <div className="flex items-center space-x-2 text-blue-600 mb-6">
        <BookOpen size={32} />
        <span className="font-bold text-3xl">Computer Science</span>
      </div>
      
      <form 
        onSubmit={handleSignIn}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl space-y-6 border border-slate-200"
      >
        <h1 className="text-2xl font-bold text-gray-900 text-center">Admin Login</h1>
        
        {message && (
          <p className={`p-3 rounded-lg text-center text-sm ${
            message.includes('Gagal') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </p>
        )}

        <div>
          <label className={labelStyle} htmlFor="email">Email</label>
          <input
            className={inputStyle}
            type="email"
            id="email"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 transition-colors"
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}