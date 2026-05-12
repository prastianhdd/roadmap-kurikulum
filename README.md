<div align="center">

<img src="public/icons/pdf.png" alt="Peta Kurikulum" width="96" height="96" />

# Peta Kurikulum Ilmu Komputer

### Peta visual & interaktif untuk seluruh mata kuliah program studi Ilmu Komputer.

_Dari Semester 1 sampai Semester 8 — satu klik, semua materi ada._

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[**Live Demo**](#) · [**Laporkan Bug**](https://github.com/prastianhdd/roadmap-kurikulum/issues) · [**Request Fitur**](https://github.com/prastianhdd/roadmap-kurikulum/issues)

</div>

---

## Sekilas

Peta Kurikulum adalah aplikasi web yang memvisualisasikan **seluruh alur mata kuliah** program studi Ilmu Komputer dalam satu halaman interaktif. Mahasiswa bisa melihat gambaran besar kurikulum, menelusuri mata kuliah per semester, dan mengakses materi pembelajaran (PDF, dokumen, tautan, gambar, video Drive) — semua dalam satu tempat.

Dibangun di atas **Next.js 14 App Router** dengan **Server Components** dan **Supabase Postgres + Storage**, aplikasi ini fokus pada kecepatan render, UX mobile-first, dan kemudahan maintenance.

---

## Fitur Utama

|  | Fitur | Deskripsi |
|--|--|--|
| 🗺️ | **Roadmap Interaktif** | Visualisasi 8 semester dalam grid yang rapi, dengan kode warna per kategori mata kuliah |
| 📱 | **Responsive by Default** | Desktop → grid 4 kolom. Mobile → accordion per semester yang rapi dan cepat |
| 📚 | **Detail Mata Kuliah** | Halaman dedicated untuk tiap mata kuliah lengkap dengan semua materi pembelajaran |
| 🎨 | **Beragam Tipe Materi** | PDF, Word, Image, Link, Google Drive, Text — setiap tipe punya ikon unik |
| 🔍 | **Pencarian Instan** | Search bar di navbar menemukan mata kuliah di seluruh kurikulum secara real-time |
| 🛡️ | **Admin Dashboard** | Halaman admin terproteksi untuk upload & manage materi (Supabase Auth) |
| 🔔 | **Push Notification** | Notifikasi otomatis via Expo saat materi baru ditambahkan |
| ⚡ | **Prefetch Navigasi** | Halaman course di-prefetch otomatis saat card terlihat → klik terasa instan |
| 💾 | **Supabase Storage** | Upload file langsung ke bucket, URL publik otomatis digenerate |
| 🩺 | **Keep-Alive Cron** | Daily ping untuk mencegah Supabase free tier auto-pause |

---

## Tech Stack

<div align="center">

| Layer | Tools |
|--|--|
| **Frontend** | Next.js 14 (App Router) · React 18 · TypeScript |
| **Styling** | Tailwind CSS · CSS Modules · Lucide Icons |
| **Backend** | Next.js Server Actions · Route Handlers · Middleware |
| **Database** | PostgreSQL (Supabase) · Prisma ORM |
| **Storage & Auth** | Supabase Storage · Supabase Auth (@supabase/ssr) |
| **Notifikasi** | Expo Server SDK |
| **Deployment** | Vercel · Vercel Cron Jobs |

</div>

---

## Arsitektur Singkat

```
┌──────────────────────────────────────────────────────────────┐
│                       User (Browser)                         │
└───────────────┬──────────────────────────────┬───────────────┘
                │                              │
        Server Components              Server Actions
                │                              │
┌───────────────▼──────────────────────────────▼───────────────┐
│                    Next.js 14 App Router                     │
│  • /              → Roadmap Grid (overview query)            │
│  • /course/[id]   → Material List (prefetched)               │
│  • /admin         → Dashboard (auth-protected via middleware)│
│  • /api/cron/*    → Keep-alive ping ke Supabase              │
└───────────────┬──────────────────────────────┬───────────────┘
                │                              │
         Prisma ORM                    Supabase Client
                │                              │
┌───────────────▼──────────────┐  ┌────────────▼───────────────┐
│   PostgreSQL (Supabase)      │  │   Supabase Storage + Auth  │
│   Semester ─┬─ Course ─ Mat. │  │   Bucket: materials        │
└──────────────────────────────┘  └────────────────────────────┘
```

---

## Memulai Secara Lokal

### Prasyarat

- **Node.js** v18.17.0 atau lebih baru
- **npm** atau **yarn**
- **Supabase account** (free tier cukup) — untuk Database, Storage, dan Auth

### Instalasi

```bash
# 1. Clone repositori
git clone https://github.com/prastianhdd/roadmap-kurikulum.git
cd roadmap-kurikulum

# 2. Install dependencies
npm install

# 3. Siapkan environment variables
cp .env.example .env.local
# Edit .env.local dengan credential Supabase Anda
```

### Environment Variables

```env
# Connection Pooling (untuk runtime)
DATABASE_URL="postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct Connection (untuk migrations)
DIRECT_URL="postgresql://...pooler.supabase.com:5432/postgres"

# Supabase Public Keys
NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_..."

# Service Role Key (server-only!)
SUPABASE_SERVICE_KEY="sb_secret_..."

# Cron secret (untuk keep-alive endpoint)
CRON_SECRET="random-string-min-32-char"
```

### Setup Database

```bash
# Push schema ke Supabase
npx prisma db push

# Seed data kurikulum (8 semester, 51 mata kuliah)
npx prisma db seed
```

### Jalankan

```bash
npm run dev
```

Buka **http://localhost:3000** di browser.

---

## Struktur Proyek

```
peta-kurikulum/
├── prisma/
│   ├── schema.prisma        # Model: Semester → Course → Material
│   └── seed.ts              # Data awal kurikulum
├── public/
│   └── icons/               # Ikon per tipe materi
├── src/
│   ├── app/
│   │   ├── page.tsx         # Roadmap utama (RSC)
│   │   ├── course/[id]/     # Detail mata kuliah
│   │   ├── admin/           # Dashboard + Server Actions
│   │   ├── api/
│   │   │   ├── search/      # Search endpoint
│   │   │   └── cron/        # Keep-alive ping
│   │   └── layout.tsx
│   ├── components/          # UI components
│   ├── lib/
│   │   ├── prisma.ts        # Prisma singleton
│   │   ├── supabase/        # 3 client factory (browser/server/service)
│   │   └── data.ts          # Query helpers
│   └── middleware.ts        # Auth gate untuk /admin
└── vercel.json              # Konfigurasi cron
```

---

## Deployment ke Vercel

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com/new)
3. Set semua environment variables (termasuk `CRON_SECRET`)
4. Deploy — cron `/api/cron/keep-alive` otomatis aktif setelah deploy berhasil

---

## Roadmap Pengembangan

- [x] Roadmap grid interaktif
- [x] Halaman detail mata kuliah
- [x] Admin dashboard + upload materi
- [x] Push notification via Expo
- [x] Keep-alive cron untuk Supabase
- [ ] Bookmark mata kuliah per user
- [ ] Progress tracker per mahasiswa
- [ ] Export roadmap ke PDF
- [ ] Mode gelap

---

## Kontribusi

Pull request dipersilakan. Untuk perubahan besar, buka issue terlebih dahulu untuk didiskusikan.

---

<div align="center">

**Dibuat dengan ☕ oleh [Prastian Hidayat](https://github.com/prastianhdd)**

_If you find this helpful, leave a ⭐ — it means a lot!_

</div>
