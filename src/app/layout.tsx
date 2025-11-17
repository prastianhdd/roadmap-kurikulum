// src/app/layout.tsx

import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer'; 
import './globals.css'; 
import { Inter } from 'next/font/google'; 


const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', 
});

export const metadata = {
  title: 'Roadmap Computer Science', 
  description: 'Peta kurikulum interaktif Ilmu Komputer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}> 

      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}