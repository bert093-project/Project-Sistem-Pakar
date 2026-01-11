<div align="center">
<h1>Sistem Pakar Diagnosa Kerusakan Laptop/PC menggunakan Certainty Factor Berbasis Web</h1>
</div>

## Deskripsi Singkat
Project ini dibuat untuk menyelesaikan tugas UAS Sistem Pakar (SMT 5)

## Requirements

Pastikan Anda telah menginstal hal-hal berikut pada sistem Anda:

```
Git (2.51.2 atau lebih baru)
Bun (1.3.4 atau lebih baru)
```

## Cara Menjalankan Sistem

1. Clone Repo

```
git clone https://github.com/bert093-project/Project-Sistem-Pakar.git
cd Project-Sistem-Pakar
```

2. Install package/dependency:

```
bun install
```

3. Jalankan development server:

```
bun run dev
```

## Struktur Folder
```
Project-Sistem-Pakar (Simplified)
├─ src
│  └─ app
│     ├─ api
│     │  └─ diagnosa
│     │     └─ route.ts
│     ├─ cf
│     │  ├─ engine.ts
│     │  └─ types.ts
│     ├─ data
│     │  └─ kb.ts
│     ├─ diagnose_page
│     │  └─ page.tsx
│     ├─ globals.css
│     ├─ layout.tsx
│     └─ page.tsx
├─ bun.lock
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
├─ postcss.config.mjs
├─ README.md
└─ tsconfig.json

```