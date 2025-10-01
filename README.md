# SPK MBTI - Sistem Pendukung Keputusan MBTI

Sistem Pakar Kepribadian MBTI (Myers-Briggs Type Indicator) menggunakan metode Forward Chaining.

## 🎯 Tentang Aplikasi

Aplikasi ini adalah sistem pendukung keputusan untuk menentukan tipe kepribadian MBTI seseorang berdasarkan jawaban terhadap 12 pertanyaan. Sistem menggunakan metode **Forward Chaining** untuk menganalisis jawaban dan menentukan tipe kepribadian dari 16 tipe yang tersedia.

### 16 Tipe Kepribadian MBTI:

1. **ISTJ** - The Inspector
2. **ISTP** - The Crafter
3. **ISFJ** - The Protector
4. **ISFP** - The Artist
5. **INFJ** - The Advocate
6. **INFP** - The Mediator
7. **INTJ** - The Architect
8. **INTP** - The Thinker
9. **ESTP** - The Persuader
10. **ESTJ** - The Director
11. **ESFP** - The Performer
12. **ESFJ** - The Caregiver
13. **ENFP** - The Champion
14. **ENFJ** - The Giver
15. **ENTP** - The Debater
16. **ENTJ** - The Commander

## 🔍 Metode Forward Chaining

Forward Chaining adalah metode penalaran yang bekerja dari data menuju kesimpulan:

1. **Data Collection**: Mengumpulkan jawaban dari 12 pertanyaan
2. **Rule Application**: Menganalisis setiap jawaban untuk menentukan trait dominan
3. **Score Accumulation**: Menghitung skor untuk setiap dimensi (E/I, S/N, T/F, J/P)
4. **Conclusion**: Mengkombinasikan trait dominan untuk membentuk tipe MBTI

## 🚀 Teknologi

- **React 19** - UI Library
- **React Router DOM** - Routing
- **Vite** - Build Tool & Dev Server

## 📦 Instalasi

```bash
# Clone repository
git clone https://github.com/akrindev/spk-mbti.git

# Masuk ke direktori
cd spk-mbti

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

## 🎮 Cara Menggunakan

1. Buka aplikasi di browser
2. Klik tombol "Mulai Tes Kepribadian"
3. Jawab 12 pertanyaan dengan memilih opsi yang paling sesuai
4. Lihat hasil analisis tipe kepribadian Anda
5. Pelajari karakteristik dan dimensi kepribadian Anda

## 📁 Struktur Project

```
src/
├── pages/           # Halaman utama aplikasi
│   ├── Home.jsx     # Halaman beranda
│   ├── Test.jsx     # Halaman tes pertanyaan
│   └── Results.jsx  # Halaman hasil
├── data/            # Data MBTI dan pertanyaan
│   └── mbtiData.js
├── utils/           # Utility functions
│   └── forwardChaining.js  # Algoritma forward chaining
├── App.jsx          # Root component dengan routing
└── main.jsx         # Entry point
```

## 🛠️ Available Scripts

```bash
npm run dev      # Jalankan development server
npm run build    # Build untuk production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📄 Lisensi

MIT License

---

Dibuat dengan ❤️ menggunakan React + Vite

