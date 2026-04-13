# Muhammad Bagas Malik Albani - Portfolio Website

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-API-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169e1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

Portfolio website pribadi yang menampilkan fokus saya di bidang **Network Engineering**, **Cloud Infrastructure**, dan **System Administration**. Project ini dibangun sebagai full-stack portfolio modern dengan tampilan technical dashboard, contact form yang menyimpan pesan, dan halaman admin untuk melihat inbox masuk.

## Live Demo

```txt
https://portofolio-db.vercel.app
```

## Tentang Project

Website ini dibuat untuk:
- membangun personal branding yang lebih kuat di jalur networking dan cloud engineering
- menampilkan pengalaman, sertifikasi, dan proyek secara lebih profesional
- menyediakan contact form yang benar-benar menyimpan pesan ke database
- memberi admin inbox sederhana untuk membaca pesan yang masuk

## Fitur Utama

- Landing page portfolio yang responsif dan modern
- Section profil, pengalaman, sertifikasi, proyek, dan kontak
- Contact form dengan validasi client dan server
- Penyimpanan pesan ke database PostgreSQL
- Admin inbox untuk membaca, menandai, dan mengelola pesan
- Theme toggle
- Routing React untuk halaman utama dan admin
- API health check untuk debugging deployment

## Screenshot

```md
!<img width="1366" height="683" alt="image" src="https://github.com/user-attachments/assets/1ab30ae6-c83e-4b7c-946b-455cbd602e99" />


Contoh section yang bisa Anda tampilkan:
- tampilan homepage
- section project
- halaman admin inbox
- tampilan mobile

## Tech Stack

### Frontend
- React 19
- Vite
- TypeScript
- Tailwind CSS v4
- React Router DOM
- Motion / Framer Motion
- Lucide React

### Backend / API
- Vercel Functions
- Node.js
- PostgreSQL
- Zod

## Struktur Project

```txt
.
|-- api/
|   |-- health.ts
|   `-- messages/
|       |-- index.ts
|       `-- [id]/
|           |-- index.ts
|           `-- read.ts
|-- server/
|   |-- db/
|   |   `-- database.ts
|   `-- middleware/
|       |-- auth.ts
|       `-- rateLimiter.ts
|-- src/
|   |-- components/
|   |-- context/
|   |-- data/
|   |-- hooks/
|   |-- pages/
|   |-- sections/
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- .env.example
|-- package.json
|-- vercel.json
`-- vite.config.ts
```

## Menjalankan Project di Lokal

### Prasyarat

- Node.js 18 atau lebih baru
- npm

### Instalasi

```bash
npm install
```

### Menjalankan development server

```bash
npm run dev
```

Default URL frontend:

```txt
http://localhost:3000
```

## Script yang Tersedia

```bash
npm run dev
npm run dev:frontend
npm run dev:backend
npm run build
npm run preview
npm run lint
npm run clean
```

## Environment Variables

Salin `.env.example` ke `.env.local` lalu isi sesuai kebutuhan.

```bash
cp .env.example .env.local
```

Variable penting:

```env
VITE_API_BASE_URL=
DATABASE_URL=postgresql://user:password@host/database
```

Catatan:
- Kosongkan `VITE_API_BASE_URL` jika memakai same-origin API route
- `DATABASE_URL` wajib untuk penyimpanan pesan berbasis PostgreSQL

## Endpoint API

### Public

- `GET /api/health`
- `POST /api/messages`

### Admin

- `GET /api/messages`
- `PATCH /api/messages/:id/read`
- `DELETE /api/messages/:id`

## Halaman Admin

Route admin inbox:

```txt
/admin
```

Gunakan token akses admin yang dikonfigurasi oleh backend Anda.

## Konten yang Mudah Dikustomisasi

Sebagian besar isi portfolio bisa diubah dari file:

```txt
src/data/portfolioData.ts
```

Area yang biasanya paling sering diubah:
- profil dan bio
- pengalaman
- sertifikasi
- daftar proyek
- link sosial
- footer

## Deployment

Project ini dirancang untuk deployment dengan Vercel-style API routes.

Sebelum deploy:
- pastikan `DATABASE_URL` valid
- pastikan environment variable sudah masuk ke platform hosting
- jalankan pengecekan tipe:

```bash
npm run lint
```

## Roadmap

- Memindahkan secret sensitif ke environment variable sepenuhnya
- Menambah proteksi admin yang lebih aman
- Meningkatkan observability dan error diagnostics untuk API production
- Menyamakan perilaku local dan production secara lebih konsisten

## Lisensi

Project ini digunakan sebagai portfolio pribadi.

