// MBTI Personality Types
export const personalityTypes = {
  ISTJ: {
    name: "ISTJ - The Inspector",
    description: "Bertanggung jawab, serius, dan dapat diandalkan. Praktis, faktual, realistis, dan bertanggung jawab atas tindakan mereka.",
    traits: ["Introvert", "Sensing", "Thinking", "Judging"]
  },
  ISTP: {
    name: "ISTP - The Crafter",
    description: "Toleran dan fleksibel, pengamat yang tenang sampai masalah muncul, kemudian bertindak cepat untuk menemukan solusi yang berhasil.",
    traits: ["Introvert", "Sensing", "Thinking", "Perceiving"]
  },
  ISFJ: {
    name: "ISFJ - The Protector",
    description: "Tenang, ramah, bertanggung jawab, dan teliti. Berkomitmen dan mantap dalam memenuhi kewajiban mereka.",
    traits: ["Introvert", "Sensing", "Feeling", "Judging"]
  },
  ISFP: {
    name: "ISFP - The Artist",
    description: "Tenang, ramah, sensitif, dan baik hati. Menikmati saat ini, apa yang terjadi di sekitar mereka.",
    traits: ["Introvert", "Sensing", "Feeling", "Perceiving"]
  },
  INFJ: {
    name: "INFJ - The Advocate",
    description: "Mencari makna dan hubungan dalam ide, hubungan, dan harta benda. Ingin memahami apa yang memotivasi orang.",
    traits: ["Introvert", "Intuition", "Feeling", "Judging"]
  },
  INFP: {
    name: "INFP - The Mediator",
    description: "Idealis, setia pada nilai-nilai dan orang-orang yang penting bagi mereka. Ingin menjalani kehidupan yang sesuai dengan nilai-nilai mereka.",
    traits: ["Introvert", "Intuition", "Feeling", "Perceiving"]
  },
  INTJ: {
    name: "INTJ - The Architect",
    description: "Memiliki pikiran orisinal dan dorongan besar untuk menerapkan ide dan mencapai tujuan mereka.",
    traits: ["Introvert", "Intuition", "Thinking", "Judging"]
  },
  INTP: {
    name: "INTP - The Thinker",
    description: "Mencari mengembangkan penjelasan logis untuk segala sesuatu yang menarik minat mereka. Teoretis dan abstrak.",
    traits: ["Introvert", "Intuition", "Thinking", "Perceiving"]
  },
  ESTP: {
    name: "ESTP - The Persuader",
    description: "Fleksibel dan toleran, mereka mengambil pendekatan pragmatis yang berfokus pada hasil langsung.",
    traits: ["Extravert", "Sensing", "Thinking", "Perceiving"]
  },
  ESTJ: {
    name: "ESTJ - The Director",
    description: "Praktis, realistis, faktual. Tegas, cepat bergerak untuk menerapkan keputusan. Terorganisir dan sistematis.",
    traits: ["Extravert", "Sensing", "Thinking", "Judging"]
  },
  ESFP: {
    name: "ESFP - The Performer",
    description: "Ramah, bersahabat, dan menerima. Penyayang hidup, orang, dan kenyamanan materi. Menikmati bekerja dengan orang lain.",
    traits: ["Extravert", "Sensing", "Feeling", "Perceiving"]
  },
  ESFJ: {
    name: "ESFJ - The Caregiver",
    description: "Berhati hangat, teliti, dan kooperatif. Ingin harmoni dalam lingkungan mereka, bekerja keras untuk membangunnya.",
    traits: ["Extravert", "Sensing", "Feeling", "Judging"]
  },
  ENFP: {
    name: "ENFP - The Champion",
    description: "Antusias penuh, kreatif, dan imajinatif. Melihat kehidupan sebagai penuh dengan kemungkinan.",
    traits: ["Extravert", "Intuition", "Feeling", "Perceiving"]
  },
  ENFJ: {
    name: "ENFJ - The Giver",
    description: "Hangat, empatik, responsif, dan bertanggung jawab. Sangat attuned terhadap emosi, kebutuhan, dan motivasi orang lain.",
    traits: ["Extravert", "Intuition", "Feeling", "Judging"]
  },
  ENTP: {
    name: "ENTP - The Debater",
    description: "Cepat, cerdik, stimulasi, waspada, dan vokal. Mahir dalam banyak hal. Menikmati perdebatan untuk kepentingan mereka.",
    traits: ["Extravert", "Intuition", "Thinking", "Perceiving"]
  },
  ENTJ: {
    name: "ENTJ - The Commander",
    description: "Frank, tegas, dan tegas. Pemimpin yang mahir dalam mengembangkan dan mengimplementasikan sistem komprehensif.",
    traits: ["Extravert", "Intuition", "Thinking", "Judging"]
  }
};

// Questions for Forward Chaining - Each question determines one dimension
export const questions = [
  // E vs I (Extraversion vs Introversion)
  {
    id: 1,
    dimension: "EI",
    question: "Ketika Anda menghadiri acara sosial, Anda lebih suka:",
    options: [
      { text: "Berinteraksi dengan banyak orang dan merasa berenergi", value: "E", weight: 1 },
      { text: "Berbicara dengan beberapa orang dekat saja", value: "I", weight: 1 }
    ]
  },
  {
    id: 2,
    dimension: "EI",
    question: "Setelah minggu yang panjang, Anda lebih suka:",
    options: [
      { text: "Pergi keluar dengan teman-teman", value: "E", weight: 1 },
      { text: "Menghabiskan waktu sendirian atau dengan satu orang terdekat", value: "I", weight: 1 }
    ]
  },
  {
    id: 3,
    dimension: "EI",
    question: "Ketika memecahkan masalah, Anda cenderung:",
    options: [
      { text: "Mendiskusikannya dengan orang lain untuk mendapatkan ide", value: "E", weight: 1 },
      { text: "Memikirkannya sendiri terlebih dahulu", value: "I", weight: 1 }
    ]
  },
  
  // S vs N (Sensing vs Intuition)
  {
    id: 4,
    dimension: "SN",
    question: "Ketika belajar sesuatu yang baru, Anda lebih suka:",
    options: [
      { text: "Mempelajari fakta dan detail spesifik", value: "S", weight: 1 },
      { text: "Memahami gambaran besar dan konsep keseluruhan", value: "N", weight: 1 }
    ]
  },
  {
    id: 5,
    dimension: "SN",
    question: "Anda lebih tertarik pada:",
    options: [
      { text: "Hal-hal yang nyata dan praktis", value: "S", weight: 1 },
      { text: "Kemungkinan dan teori masa depan", value: "N", weight: 1 }
    ]
  },
  {
    id: 6,
    dimension: "SN",
    question: "Dalam percakapan, Anda cenderung:",
    options: [
      { text: "Fokus pada detail spesifik dan pengalaman konkret", value: "S", weight: 1 },
      { text: "Berbicara tentang ide abstrak dan makna yang lebih dalam", value: "N", weight: 1 }
    ]
  },
  
  // T vs F (Thinking vs Feeling)
  {
    id: 7,
    dimension: "TF",
    question: "Ketika membuat keputusan, Anda lebih mengandalkan:",
    options: [
      { text: "Logika dan analisis objektif", value: "T", weight: 1 },
      { text: "Nilai-nilai personal dan dampak pada orang lain", value: "F", weight: 1 }
    ]
  },
  {
    id: 8,
    dimension: "TF",
    question: "Anda lebih menghargai:",
    options: [
      { text: "Keadilan dan konsistensi", value: "T", weight: 1 },
      { text: "Empati dan harmoni", value: "F", weight: 1 }
    ]
  },
  {
    id: 9,
    dimension: "TF",
    question: "Ketika memberikan umpan balik, Anda cenderung:",
    options: [
      { text: "Jujur dan langsung, fokus pada fakta", value: "T", weight: 1 },
      { text: "Mempertimbangkan perasaan orang lain", value: "F", weight: 1 }
    ]
  },
  
  // J vs P (Judging vs Perceiving)
  {
    id: 10,
    dimension: "JP",
    question: "Dalam kehidupan sehari-hari, Anda lebih suka:",
    options: [
      { text: "Membuat rencana dan mengikutinya", value: "J", weight: 1 },
      { text: "Tetap fleksibel dan spontan", value: "P", weight: 1 }
    ]
  },
  {
    id: 11,
    dimension: "JP",
    question: "Anda merasa lebih nyaman ketika:",
    options: [
      { text: "Hal-hal terselesaikan dan terorganisir", value: "J", weight: 1 },
      { text: "Pilihan tetap terbuka", value: "P", weight: 1 }
    ]
  },
  {
    id: 12,
    dimension: "JP",
    question: "Ketika mengerjakan proyek, Anda cenderung:",
    options: [
      { text: "Mulai lebih awal dan bekerja secara steady", value: "J", weight: 1 },
      { text: "Menunggu sampai mendekati deadline untuk energi ekstra", value: "P", weight: 1 }
    ]
  }
];
