// src/app/layout.tsx

import Navbar from '@/components/Navbar'; // Impor Navbar
import Footer from '@/components/Footer'; // Impor Footer
import './globals.css'; // Pastikan globals.css diimpor

export const metadata = {
  title: 'Kurikulum CS', // Judul website default
  description: 'Peta kurikulum interaktif Ilmu Komputer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/* Ini adalah trik layout sticky footer modern:
        min-h-screen: tinggi minimal 1 layar
        flex flex-col: menata anak-anaknya (Navbar, main, Footer) secara vertikal
      */}
      <body className="flex flex-col min-h-screen">
        <Navbar />
        
        {/* flex-grow: membuat <main> "tumbuh" mengisi sisa ruang
          Ini akan mendorong Footer ke bagian paling bawah.
        */}
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  )
}