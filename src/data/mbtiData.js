// Tipe Kepribadian MBTI
export const personalityTypes = {
  ISTJ: {
    name: "ISTJ - The Inspector",
    description: "Bertanggung jawab, serius, dan dapat diandalkan. Praktis, faktual, realistis, dan bertanggung jawab atas tindakan mereka.",
    traits: ["Introvert", "Sensing", "Thinking", "Judging"],
    viewOfOthers: "ISTJ melihat orang lain dari sisi tanggung jawab dan keandalan mereka. Mereka menghargai orang yang konsisten, dapat dipercaya, dan menepati janji. Cenderung skeptis terhadap orang yang terlalu spontan atau tidak terorganisir.",
    careerPath: "Cocok untuk karir yang membutuhkan struktur, detail, dan keandalan seperti: Akuntan, Auditor, Manajer Operasional, Pengacara, Analis Data, Dokter, Insinyur, atau Administrator. Mereka unggul dalam peran yang memerlukan presisi dan konsistensi.",
    decisionMaking: "Membuat keputusan berdasarkan fakta, data, dan pengalaman masa lalu. Menganalisis semua detail dengan cermat sebelum mengambil keputusan. Cenderung konservatif dan menghindari risiko yang tidak perlu."
  },
  ISTP: {
    name: "ISTP - The Crafter",
    description: "Toleran dan fleksibel, pengamat yang tenang sampai masalah muncul, kemudian bertindak cepat untuk menemukan solusi yang berhasil.",
    traits: ["Introvert", "Sensing", "Thinking", "Perceiving"],
    viewOfOthers: "ISTP menilai orang lain berdasarkan kemampuan praktis dan fleksibilitas mereka. Menghargai orang yang efisien dan tidak terlalu emosional. Cenderung tidak tertarik pada drama atau konflik interpersonal.",
    careerPath: "Cocok untuk karir yang melibatkan pemecahan masalah praktis dan penggunaan alat: Mekanik, Teknisi, Pilot, Insinyur, Programmer, Paramedis, Atlet Profesional, atau Arsitek. Mereka unggul dalam situasi yang membutuhkan respons cepat.",
    decisionMaking: "Mengambil keputusan dengan cepat berdasarkan logika dan analisis situasi saat ini. Fleksibel dan mampu beradaptasi dengan perubahan. Lebih suka mencoba solusi langsung daripada perencanaan jangka panjang."
  },
  ISFJ: {
    name: "ISFJ - The Protector",
    description: "Tenang, ramah, bertanggung jawab, dan teliti. Berkomitmen dan mantap dalam memenuhi kewajiban mereka.",
    traits: ["Introvert", "Sensing", "Feeling", "Judging"],
    viewOfOthers: "ISFJ melihat orang lain dengan empati dan kepedulian. Sangat peka terhadap kebutuhan emosional orang lain dan berusaha membantu. Menghargai tradisi dan loyalitas dalam hubungan.",
    careerPath: "Cocok untuk karir yang melibatkan pelayanan dan kepedulian: Perawat, Guru SD, Konselor, Pekerja Sosial, Pustakawan, Administrator Kantor, atau Desainer Interior. Mereka unggul dalam menciptakan lingkungan yang mendukung dan teratur.",
    decisionMaking: "Membuat keputusan dengan mempertimbangkan dampak pada orang lain dan nilai-nilai personal. Menggunakan pengalaman masa lalu sebagai panduan. Cenderung menghindari konflik dan mencari solusi yang memuaskan semua pihak."
  },
  ISFP: {
    name: "ISFP - The Artist",
    description: "Tenang, ramah, sensitif, dan baik hati. Menikmati saat ini, apa yang terjadi di sekitar mereka.",
    traits: ["Introvert", "Sensing", "Feeling", "Perceiving"],
    viewOfOthers: "ISFP melihat keunikan dalam setiap individu dan menghargai keaslian. Toleran dan tidak menghakimi. Menghargai orang yang ekspresif secara kreatif dan autentik terhadap diri mereka sendiri.",
    careerPath: "Cocok untuk karir kreatif dan artistik: Seniman, Desainer Grafis, Musisi, Fotografer, Chef, Terapis Okupasi, Perawat, atau Pendidik Anak Usia Dini. Mereka unggul dalam mengekspresikan kreativitas dengan cara praktis.",
    decisionMaking: "Mengambil keputusan berdasarkan nilai-nilai personal dan perasaan di saat itu. Fleksibel dan spontan. Lebih suka menjaga pilihan tetap terbuka dan beradaptasi dengan situasi yang berubah."
  },
  INFJ: {
    name: "INFJ - The Advocate",
    description: "Mencari makna dan hubungan dalam ide, hubungan, dan harta benda. Ingin memahami apa yang memotivasi orang.",
    traits: ["Introvert", "Intuition", "Feeling", "Judging"],
    viewOfOthers: "INFJ melihat potensi dan makna dalam setiap orang. Sangat intuitif tentang motivasi dan perasaan orang lain. Mencari hubungan yang dalam dan bermakna, bukan superfisial.",
    careerPath: "Cocok untuk karir yang bermakna dan membantu orang lain: Psikolog, Konselor, Penulis, Guru, Pekerja Sosial, Aktivis, Human Resources, atau Pendeta. Mereka unggul dalam memahami dan memotivasi orang lain.",
    decisionMaking: "Membuat keputusan dengan mempertimbangkan nilai-nilai mendalam dan dampak jangka panjang pada orang lain. Menggunakan intuisi yang kuat untuk memahami situasi. Berkomitmen pada keputusan yang selaras dengan visi mereka."
  },
  INFP: {
    name: "INFP - The Mediator",
    description: "Idealis, setia pada nilai-nilai dan orang-orang yang penting bagi mereka. Ingin menjalani kehidupan yang sesuai dengan nilai-nilai mereka.",
    traits: ["Introvert", "Intuition", "Feeling", "Perceiving"],
    viewOfOthers: "INFP melihat potensi baik dalam setiap orang. Sangat idealis tentang hubungan dan mencari keaslian. Menghargai orang yang jujur pada diri sendiri dan memiliki nilai-nilai yang kuat.",
    careerPath: "Cocok untuk karir kreatif dan bermakna: Penulis, Seniman, Konselor, Psikolog, Guru, Editor, Pekerja Nirlaba, atau Musisi. Mereka unggul dalam pekerjaan yang memungkinkan ekspresi nilai-nilai personal mereka.",
    decisionMaking: "Mengambil keputusan berdasarkan nilai-nilai personal yang mendalam dan apakah sesuatu terasa 'benar'. Fleksibel dan terbuka pada informasi baru. Menghindari keputusan yang bertentangan dengan idealisme mereka."
  },
  INTJ: {
    name: "INTJ - The Architect",
    description: "Memiliki pikiran orisinal dan dorongan besar untuk menerapkan ide dan mencapai tujuan mereka.",
    traits: ["Introvert", "Intuition", "Thinking", "Judging"],
    viewOfOthers: "INTJ menilai orang lain berdasarkan kompetensi dan kemampuan intelektual mereka. Menghargai orang yang logis, independen, dan berorientasi pada tujuan. Kurang tertarik pada small talk atau emosi yang tidak relevan.",
    careerPath: "Cocok untuk karir strategis dan kompleks: Scientist, Engineer, Programmer, Analis Sistem, Arsitek, Profesor, Konsultan Strategi, atau Pengusaha. Mereka unggul dalam menciptakan sistem dan strategi jangka panjang yang kompleks.",
    decisionMaking: "Membuat keputusan berdasarkan analisis logis mendalam dan visi jangka panjang. Sangat independen dalam berpikir. Menggunakan model mental kompleks untuk mengevaluasi pilihan dan memprediksi hasil."
  },
  INTP: {
    name: "INTP - The Thinker",
    description: "Mencari mengembangkan penjelasan logis untuk segala sesuatu yang menarik minat mereka. Teoretis dan abstrak.",
    traits: ["Introvert", "Intuition", "Thinking", "Perceiving"],
    viewOfOthers: "INTP menilai orang lain berdasarkan kemampuan berpikir logis dan keterbukaan terhadap ide baru. Menghargai debat intelektual dan pertukaran ide. Cenderung tidak tertarik pada konvensi sosial atau hierarki.",
    careerPath: "Cocok untuk karir yang melibatkan analisis dan inovasi: Peneliti, Programmer, Matematikawan, Filsuf, Analis, Scientist, Arsitek Sistem, atau Inventor. Mereka unggul dalam pemecahan masalah teoritis yang kompleks.",
    decisionMaking: "Mengambil keputusan dengan menganalisis semua kemungkinan secara logis. Sangat fleksibel dan terbuka pada perspektif baru. Sering menunda keputusan untuk mengumpulkan lebih banyak informasi dan mengeksplorasi alternatif."
  },
  ESTP: {
    name: "ESTP - The Persuader",
    description: "Fleksibel dan toleran, mereka mengambil pendekatan pragmatis yang berfokus pada hasil langsung.",
    traits: ["Extravert", "Sensing", "Thinking", "Perceiving"],
    viewOfOthers: "ESTP melihat orang lain sebagai potensi mitra dalam petualangan atau proyek. Menghargai orang yang spontan, berani, dan action-oriented. Kurang sabar dengan orang yang terlalu teoritis atau lambat mengambil keputusan.",
    careerPath: "Cocok untuk karir yang dinamis dan berorientasi aksi: Entrepreneur, Sales, Marketing, Paramedis, Polisi, Atlet, Event Planner, atau Broker Saham. Mereka unggul dalam situasi yang bergerak cepat dan membutuhkan respons cepat.",
    decisionMaking: "Membuat keputusan cepat berdasarkan fakta yang tersedia dan hasil yang dapat dilihat. Berani mengambil risiko dan percaya pada kemampuan mereka untuk mengatasi masalah saat muncul. Pragmatis dan fokus pada apa yang berhasil."
  },
  ESTJ: {
    name: "ESTJ - The Director",
    description: "Praktis, realistis, faktual. Tegas, cepat bergerak untuk menerapkan keputusan. Terorganisir dan sistematis.",
    traits: ["Extravert", "Sensing", "Thinking", "Judging"],
    viewOfOthers: "ESTJ menilai orang lain berdasarkan etika kerja dan keandalan mereka. Menghargai tradisi, hierarki, dan aturan. Mengharapkan orang lain untuk memenuhi standar dan tanggung jawab mereka.",
    careerPath: "Cocok untuk karir kepemimpinan dan manajemen: Manajer, Eksekutif, Administrasi, Hakim, Militer, Polisi, Banker, atau Manajer Proyek. Mereka unggul dalam mengorganisir sumber daya dan memimpin tim menuju tujuan konkret.",
    decisionMaking: "Membuat keputusan dengan cepat dan tegas berdasarkan fakta, logika, dan prosedur yang telah terbukti. Menghargai efisiensi dan hasil yang dapat diukur. Tidak ragu untuk mengambil tindakan dan bertanggung jawab atas hasilnya."
  },
  ESFP: {
    name: "ESFP - The Performer",
    description: "Ramah, bersahabat, dan menerima. Penyayang hidup, orang, dan kenyamanan materi. Menikmati bekerja dengan orang lain.",
    traits: ["Extravert", "Sensing", "Feeling", "Perceiving"],
    viewOfOthers: "ESFP melihat yang terbaik dalam setiap orang dan senang membuat orang lain bahagia. Sangat sosial dan menerima. Menghargai orang yang fun-loving, spontan, dan autentik.",
    careerPath: "Cocok untuk karir yang melibatkan interaksi sosial dan kreativitas: Entertainer, Event Planner, Sales, Public Relations, Guru, Perawat, Desainer Fashion, atau Tour Guide. Mereka unggul dalam menciptakan pengalaman positif untuk orang lain.",
    decisionMaking: "Mengambil keputusan berdasarkan apa yang terasa baik di saat itu dan dampak pada orang-orang di sekitar mereka. Spontan dan fleksibel. Lebih suka mencoba sesuatu langsung daripada merencanakan secara berlebihan."
  },
  ESFJ: {
    name: "ESFJ - The Caregiver",
    description: "Berhati hangat, teliti, dan kooperatif. Ingin harmoni dalam lingkungan mereka, bekerja keras untuk membangunnya.",
    traits: ["Extravert", "Sensing", "Feeling", "Judging"],
    viewOfOthers: "ESFJ sangat peduli tentang kesejahteraan orang lain dan ingin membantu. Menghargai tradisi, loyalitas, dan keharmonisan sosial. Sensitif terhadap kebutuhan dan perasaan orang lain.",
    careerPath: "Cocok untuk karir yang melibatkan kepedulian dan organisasi: Perawat, Guru, Pekerja Sosial, Event Planner, HR Manager, Receptionist, atau Administrator Kantor. Mereka unggul dalam menciptakan lingkungan yang mendukung dan terorganisir.",
    decisionMaking: "Membuat keputusan dengan mempertimbangkan bagaimana hal itu akan mempengaruhi orang lain dan apakah itu akan menjaga harmoni. Menggunakan nilai-nilai tradisional dan apa yang telah berhasil di masa lalu sebagai panduan."
  },
  ENFP: {
    name: "ENFP - The Champion",
    description: "Antusias penuh, kreatif, dan imajinatif. Melihat kehidupan sebagai penuh dengan kemungkinan.",
    traits: ["Extravert", "Intuition", "Feeling", "Perceiving"],
    viewOfOthers: "ENFP melihat potensi dalam setiap orang dan antusias membantu orang lain berkembang. Sangat empati dan tulus tertarik pada orang lain. Menghargai keaslian dan keunikan individu.",
    careerPath: "Cocok untuk karir kreatif dan people-oriented: Konselor, Guru, Penulis, Public Relations, Marketing, Aktivis, Seniman, atau Entrepreneur. Mereka unggul dalam menginspirasi dan memotivasi orang lain.",
    decisionMaking: "Mengambil keputusan berdasarkan nilai-nilai dan kemungkinan masa depan. Sangat intuitif dan terbuka pada ide baru. Cenderung mengeksplorasi banyak pilihan sebelum berkomitmen, dan mungkin mengubah keputusan jika menemukan opsi yang lebih baik."
  },
  ENFJ: {
    name: "ENFJ - The Giver",
    description: "Hangat, empatik, responsif, dan bertanggung jawab. Sangat attuned terhadap emosi, kebutuhan, dan motivasi orang lain.",
    traits: ["Extravert", "Intuition", "Feeling", "Judging"],
    viewOfOthers: "ENFJ sangat peduli tentang pertumbuhan dan perkembangan orang lain. Intuitif tentang kebutuhan emosional orang dan berusaha membantu mereka mencapai potensi mereka. Menghargai harmoni dan kerjasama.",
    careerPath: "Cocok untuk karir yang melibatkan kepemimpinan dan pengembangan orang: Guru, Konselor, Coach, HR Manager, Public Relations, Sales, Pendeta, atau Pekerja Sosial. Mereka unggul dalam memimpin dan menginspirasi tim.",
    decisionMaking: "Membuat keputusan dengan mempertimbangkan dampak pada orang lain dan visi untuk masa depan. Terorganisir dan menentukan, tetapi juga empatik. Mencari konsensus dan solusi yang menguntungkan semua orang."
  },
  ENTP: {
    name: "ENTP - The Debater",
    description: "Cepat, cerdik, stimulasi, waspada, dan vokal. Mahir dalam banyak hal. Menikmati perdebatan untuk kepentingan mereka.",
    traits: ["Extravert", "Intuition", "Thinking", "Perceiving"],
    viewOfOthers: "ENTP menilai orang lain berdasarkan kemampuan intelektual dan keterbukaan mereka terhadap ide baru. Menikmati tantangan mental dan debat. Menghargai orang yang bisa mengikuti pemikiran cepat mereka.",
    careerPath: "Cocok untuk karir yang melibatkan inovasi dan strategi: Entrepreneur, Konsultan, Lawyer, Marketing Strategist, Inventor, Analyst, atau Engineer. Mereka unggul dalam mengidentifikasi peluang baru dan menciptakan solusi inovatif.",
    decisionMaking: "Mengambil keputusan dengan menganalisis semua kemungkinan dan mencari solusi paling inovatif. Sangat fleksibel dan suka menantang status quo. Cenderung melihat keputusan sebagai hipotesis yang dapat diubah jika informasi baru muncul."
  },
  ENTJ: {
    name: "ENTJ - The Commander",
    description: "Frank, tegas, dan tegas. Pemimpin yang mahir dalam mengembangkan dan mengimplementasikan sistem komprehensif.",
    traits: ["Extravert", "Intuition", "Thinking", "Judging"],
    viewOfOthers: "ENTJ menilai orang lain berdasarkan kompetensi dan kemampuan mereka untuk mencapai hasil. Mengharapkan standar tinggi dan efisiensi. Menghargai orang yang kompeten, ambisius, dan berorientasi pada tujuan.",
    careerPath: "Cocok untuk karir kepemimpinan eksekutif: CEO, Executive, Lawyer, Consultant, Engineer, Professor, atau Entrepreneur. Mereka unggul dalam perencanaan strategis jangka panjang dan memimpin organisasi besar menuju kesuksesan.",
    decisionMaking: "Membuat keputusan dengan cepat dan tegas berdasarkan analisis logis dan visi strategis jangka panjang. Sangat percaya diri dalam penilaian mereka. Fokus pada efisiensi dan pencapaian tujuan, bukan pada emosi atau hubungan."
  }
};

// Pertanyaan untuk Forward Chaining - Setiap pertanyaan menentukan satu dimensi
// Pertanyaan menggunakan skala Likert 5-poin di mana pengguna menilai persetujuan mereka
export const questions = [
  // E vs I (Ekstravesi vs Introversi) - 7 pertanyaan
  {
    id: 1,
    dimension: "EI",
    question: "Saya merasa berenergi ketika berada di tengah banyak orang",
    trait: "E" // Pertanyaan ini mengukur Ekstravesi
  },
  {
    id: 2,
    dimension: "EI",
    question: "Saya lebih suka menghabiskan waktu sendirian atau dengan satu orang terdekat",
    trait: "I" // Pertanyaan ini mengukur Introversi
  },
  {
    id: 3,
    dimension: "EI",
    question: "Saya mudah memulai percakapan dengan orang yang baru saya temui",
    trait: "E"
  },
  {
    id: 4,
    dimension: "EI",
    question: "Saya perlu waktu sendiri untuk mengisi ulang energi saya",
    trait: "I"
  },
  {
    id: 5,
    dimension: "EI",
    question: "Saya lebih suka berpikir dengan keras dan mendiskusikan ide dengan orang lain",
    trait: "E"
  },
  {
    id: 6,
    dimension: "EI",
    question: "Saya sering merasa lelah setelah bersosialisasi dalam waktu lama",
    trait: "I"
  },
  {
    id: 7,
    dimension: "EI",
    question: "Saya senang menjadi pusat perhatian dalam kelompok",
    trait: "E"
  },

  // S vs N (Sensing vs Intuisi) - 6 pertanyaan
  {
    id: 8,
    dimension: "SN",
    question: "Saya lebih fokus pada fakta dan detail konkret daripada kemungkinan masa depan",
    trait: "S"
  },
  {
    id: 9,
    dimension: "SN",
    question: "Saya tertarik pada teori dan konsep abstrak",
    trait: "N"
  },
  {
    id: 10,
    dimension: "SN",
    question: "Saya lebih percaya pada pengalaman praktis daripada intuisi",
    trait: "S"
  },
  {
    id: 11,
    dimension: "SN",
    question: "Saya sering memikirkan kemungkinan dan makna yang lebih dalam dari suatu situasi",
    trait: "N"
  },
  {
    id: 12,
    dimension: "SN",
    question: "Saya lebih suka mengikuti prosedur yang sudah terbukti berhasil",
    trait: "S"
  },
  {
    id: 13,
    dimension: "SN",
    question: "Saya sering membayangkan cara-cara baru dan inovatif untuk melakukan sesuatu",
    trait: "N"
  },

  // T vs F (Pemikiran vs Perasaan) - 6 pertanyaan
  {
    id: 14,
    dimension: "TF",
    question: "Saya membuat keputusan berdasarkan logika dan analisis objektif",
    trait: "T"
  },
  {
    id: 15,
    dimension: "TF",
    question: "Saya mempertimbangkan perasaan dan nilai-nilai personal ketika membuat keputusan",
    trait: "F"
  },
  {
    id: 16,
    dimension: "TF",
    question: "Saya lebih menghargai keadilan dan konsistensi daripada harmoni dalam kelompok",
    trait: "T"
  },
  {
    id: 17,
    dimension: "TF",
    question: "Saya mudah merasakan dan memahami emosi orang lain",
    trait: "F"
  },
  {
    id: 18,
    dimension: "TF",
    question: "Saya memberikan kritik secara langsung tanpa terlalu memikirkan perasaan orang lain",
    trait: "T"
  },
  {
    id: 19,
    dimension: "TF",
    question: "Saya berusaha menjaga harmoni dan menghindari konflik dalam hubungan",
    trait: "F"
  },

  // J vs P (Penilaian vs Persepsi) - 6 pertanyaan
  {
    id: 20,
    dimension: "JP",
    question: "Saya suka membuat rencana detail dan mengikutinya dengan ketat",
    trait: "J"
  },
  {
    id: 21,
    dimension: "JP",
    question: "Saya lebih suka menjaga pilihan tetap terbuka dan fleksibel",
    trait: "P"
  },
  {
    id: 22,
    dimension: "JP",
    question: "Saya merasa nyaman ketika segala sesuatu terorganisir dan terselesaikan",
    trait: "J"
  },
  {
    id: 23,
    dimension: "JP",
    question: "Saya bekerja lebih baik di bawah tekanan deadline yang mendekat",
    trait: "P"
  },
  {
    id: 24,
    dimension: "JP",
    question: "Saya membuat keputusan dengan cepat dan berkomitmen pada pilihan tersebut",
    trait: "J"
  },
  {
    id: 25,
    dimension: "JP",
    question: "Saya senang mengeksplorasi berbagai pilihan sebelum membuat keputusan final",
    trait: "P"
  }
];
