# Roadmap Kurikulum Ilmu Komputer

Selamat datang di Peta Kurikulum Interaktif Ilmu Komputer! Proyek ini adalah aplikasi web yang dibuat dengan [Next.js](https://nextjs.org/) untuk memvisualisasikan seluruh alur mata kuliah dalam program studi.

Tujuannya adalah untuk membantu mahasiswa dan civitas akademika mendapatkan gambaran besar kurikulum, menemukan mata kuliah, dan mengakses materi pembelajaran terkait dengan mudah.

## Fitur Utama

* **Roadmap Interaktif:** Menampilkan kurikulum lengkap dari Semester 1 hingga 8.
* **Desain Responsif:** Tampilan dioptimalkan untuk semua perangkat.
    * **Desktop:** Menampilkan semua semester dalam tampilan grid 4-kolom.
    * **Mobile:** Menggunakan desain *accordion* yang rapi, di mana Anda dapat mengetuk semester untuk melihat daftar mata kuliahnya.
* **Halaman Detail Mata Kuliah:** Setiap mata kuliah dapat diklik dan akan membawa ke halaman detail yang berisi daftar materi pembelajaran/page.tsx].
* **Dukungan Beragam Materi:** Mendukung berbagai tipe materi, masing-masing dengan ikon unik:
    * PDF
    * Dokumen (WORD)
    * Gambar (IMAGE)
    * Tautan Eksternal (LINK)
    * Google Drive (DRIVE)
    * Teks (TEXT)
* **Pencarian Cepat:** Fitur pencarian di *navbar* memungkinkan pengguna menemukan mata kuliah secara instan di seluruh kurikulum.
* **Render Cepat di Server:** Dibangun dengan Next.js App Router, halaman dimuat dengan cepat menggunakan Server Components.

---

## Teknologi yang Digunakan

Proyek ini dibangun menggunakan tumpukan teknologi modern untuk kinerja dan pengalaman pengembang yang optimal:

* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Bahasa:** [TypeScript](https://www.typescriptlang.org/)
* **Database:** [PostgreSQL](https://www.postgresql.org/) (dihosting di [Supabase](https://supabase.com/))
* **Penyimpanan File:** [Supabase Storage](https://supabase.com/storage)
* **ORM:** [Prisma](https://www.prisma.io/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI/Ikon:** [Lucide React](https://lucide.dev/)

---

## 🏁 Memulai Secara Lokal

Jika Anda ingin menjalankan salinan proyek ini di komputer Anda.

### 1. Kebutuhan Awal
* Node.js (v18.17.0 atau lebih baru)
* `npm` atau `yarn`
* Akun Supabase (untuk Database dan Storage)
---
### 2. Instalasi
Salin proyek ini dan instal dependensinya:
```bash
git clone [https://github.com/prastianhdd/roadmap-kurikulum.git](https://github.com/prastianhdd/roadmap-kurikulum.git)
cd roadmap-kurikulum
npm install
```
---
### 3. Konfigurasi
- Konfigurasi Environment (.env)
- Setup Database
---
### 4. Jalankan Server Development
```bash
npm run dev
```

Buka http://localhost:3000 di browser Anda untuk melihat hasilnya.

---
<p align="center">
  <i>✨ Dibuat oleh Prastian Hidayat ✨</i>
</p>