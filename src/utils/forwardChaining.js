/**
 * Algoritma Forward Chaining untuk Penentuan Tipe MBTI
 * 
 * Forward chaining adalah pendekatan penalaran berbasis data di mana kita mulai dengan data (jawaban)
 * dan bekerja maju untuk mencapai kesimpulan (tipe kepribadian).
 * 
 * Proses:
 * 1. Kumpulkan jawaban pengguna (skala Likert 1-5)
 * 2. Terapkan aturan untuk menentukan setiap dimensi (E/I, S/N, T/F, J/P)
 * 3. Gabungkan dimensi untuk menentukan tipe MBTI akhir
 */

/**
 * Analisis jawaban dan tentukan tipe MBTI menggunakan forward chaining
 * @param {Array} answers - Array objek jawaban {questionId, dimension, trait, rating}
 * @returns {Object} - Berisi mbtiType, skor kepercayaan, dan langkah pemrosesan
 */
export const determinePersonalityType = (answers) => {
  // Inisialisasi skor untuk setiap dimensi
  const scores = {
    E: 0, I: 0,  // Extraversion vs Introversion
    S: 0, N: 0,  // Sensing vs Intuition
    T: 0, F: 0,  // Thinking vs Feeling
    J: 0, P: 0   // Judging vs Perceiving
  };

  // Lacak langkah pemrosesan untuk visualisasi
  const processingSteps = [];

  // Forward chaining: Proses setiap jawaban dan akumulasi skor
  answers.forEach(answer => {
    const { trait, rating, dimension } = answer;

    // Logika rating:
    // 5 = Sangat setuju dengan sifat (bobot 2)
    // 4 = Setuju dengan sifat (bobot 1)
    // 3 = Netral (tidak ada bobot)
    // 2 = Tidak setuju dengan sifat (sifat kebalikan mendapat bobot 1)
    // 1 = Sangat tidak setuju dengan sifat (sifat kebalikan mendapat bobot 2)

    let weight = 0;
    let scoredTrait = trait;

    if (rating === 5) {
      weight = 2;
      scoredTrait = trait;
    } else if (rating === 4) {
      weight = 1;
      scoredTrait = trait;
    } else if (rating === 3) {
      weight = 0; // Netral, tidak ada kontribusi
    } else if (rating === 2) {
      weight = 1;
      scoredTrait = getOppositeTrait(trait);
    } else if (rating === 1) {
      weight = 2;
      scoredTrait = getOppositeTrait(trait);
    }

    if (weight > 0 && Object.prototype.hasOwnProperty.call(scores, scoredTrait)) {
      scores[scoredTrait] += weight;

      processingSteps.push({
        questionId: answer.questionId,
        dimension,
        originalTrait: trait,
        rating,
        scoredTrait,
        weight,
        interpretation: getInterpretation(rating, trait, scoredTrait)
      });
    }
  });

  // Tentukan sifat dominan untuk setiap dimensi
  const dimensions = {
    EI: scores.E > scores.I ? 'E' : (scores.E < scores.I ? 'I' : 'E'), // Default ke E jika seri
    SN: scores.S > scores.N ? 'S' : (scores.S < scores.N ? 'N' : 'S'), // Default ke S jika seri
    TF: scores.T > scores.F ? 'T' : (scores.T < scores.F ? 'F' : 'T'), // Default ke T jika seri
    JP: scores.J > scores.P ? 'J' : (scores.J < scores.P ? 'P' : 'J')  // Default ke J jika seri
  };

  // Hitung kepercayaan untuk setiap dimensi (persentase)
  const confidence = {
    EI: {
      trait: dimensions.EI,
      percentage: Math.round((Math.max(scores.E, scores.I) / (scores.E + scores.I)) * 100) || 50,
      scores: { E: scores.E, I: scores.I }
    },
    SN: {
      trait: dimensions.SN,
      percentage: Math.round((Math.max(scores.S, scores.N) / (scores.S + scores.N)) * 100) || 50,
      scores: { S: scores.S, N: scores.N }
    },
    TF: {
      trait: dimensions.TF,
      percentage: Math.round((Math.max(scores.T, scores.F) / (scores.T + scores.F)) * 100) || 50,
      scores: { T: scores.T, F: scores.F }
    },
    JP: {
      trait: dimensions.JP,
      percentage: Math.round((Math.max(scores.J, scores.P) / (scores.J + scores.P)) * 100) || 50,
      scores: { J: scores.J, P: scores.P }
    }
  };

  // Gabungkan dimensi untuk membentuk tipe MBTI
  const mbtiType = dimensions.EI + dimensions.SN + dimensions.TF + dimensions.JP;

  return {
    mbtiType,
    confidence,
    rawScores: scores,
    dimensions,
    processingSteps
  };
};

/**
 * Dapatkan sifat kebalikan
 */
const getOppositeTrait = (trait) => {
  const opposites = {
    E: 'I', I: 'E',
    S: 'N', N: 'S',
    T: 'F', F: 'T',
    J: 'P', P: 'J'
  };
  return opposites[trait] || trait;
};

/**
 * Dapatkan interpretasi rating
 */
const getInterpretation = (rating, originalTrait, scoredTrait) => {
  if (rating === 5) {
    return `Sangat setuju dengan ${getTraitName(originalTrait)}`;
  } else if (rating === 4) {
    return `Setuju dengan ${getTraitName(originalTrait)}`;
  } else if (rating === 3) {
    return `Netral`;
  } else if (rating === 2) {
    return `Tidak setuju, cenderung ${getTraitName(scoredTrait)}`;
  } else if (rating === 1) {
    return `Sangat tidak setuju, kuat di ${getTraitName(scoredTrait)}`;
  }
  return '';
};

/**
 * Dapatkan nama sifat dari kode dimensi
 */
export const getTraitName = (trait) => {
  const traitNames = {
    E: 'Extraversion',
    I: 'Introversion',
    S: 'Sensing',
    N: 'Intuition',
    T: 'Thinking',
    F: 'Feeling',
    J: 'Judging',
    P: 'Perceiving'
  };
  return traitNames[trait] || trait;
};

/**
 * Dapatkan nama dimensi
 */
export const getDimensionName = (dimension) => {
  const dimensionNames = {
    EI: 'Energy Direction',
    SN: 'Information Processing',
    TF: 'Decision Making',
    JP: 'Lifestyle'
  };
  return dimensionNames[dimension] || dimension;
};

/**
 * Validasi apakah semua pertanyaan yang diperlukan telah dijawab
 */
export const validateAnswers = (answers, totalQuestions) => {
  return answers.length === totalQuestions;
};
