// src/middleware.ts
import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options) {
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set(name, value, options)
        },
        remove(name: string, options) {
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set(name, '', options)
        },
      },
    }
  )

  // Ambil sesi pengguna
  const { data: { session } } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  // Jika tidak ada sesi (belum login) dan mencoba akses /admin
  if (!session && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Jika sudah login dan mencoba akses /login
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  // Jika mencoba akses API materi tanpa login (opsional tapi penting)
  if (!session && pathname.startsWith('/api/materials')) {
     return new NextResponse('Unauthorized', { status: 401 });
  }

  return response
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/login',
    '/api/materials/:path*'
  ],
}