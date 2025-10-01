/**
 * Forward Chaining Algorithm for MBTI Type Determination
 * 
 * Forward chaining is a data-driven reasoning approach where we start with the data (answers)
 * and work forward to reach a conclusion (personality type).
 * 
 * Process:
 * 1. Collect answers from user (Likert scale 1-5)
 * 2. Apply rules to determine each dimension (E/I, S/N, T/F, J/P)
 * 3. Combine dimensions to determine final MBTI type
 */

/**
 * Analyze answers and determine MBTI type using forward chaining
 * @param {Array} answers - Array of answer objects {questionId, dimension, trait, rating}
 * @returns {Object} - Contains mbtiType, confidence scores, and processing steps
 */
export const determinePersonalityType = (answers) => {
  // Initialize scores for each dimension
  const scores = {
    E: 0, I: 0,  // Extraversion vs Introversion
    S: 0, N: 0,  // Sensing vs Intuition
    T: 0, F: 0,  // Thinking vs Feeling
    J: 0, P: 0   // Judging vs Perceiving
  };

  // Track processing steps for visualization
  const processingSteps = [];

  // Forward chaining: Process each answer and accumulate scores
  answers.forEach(answer => {
    const { trait, rating, dimension } = answer;
    
    // Rating logic:
    // 5 = Strongly agree with trait (weight 2)
    // 4 = Agree with trait (weight 1)
    // 3 = Neutral (no weight)
    // 2 = Disagree with trait (opposite trait gets weight 1)
    // 1 = Strongly disagree with trait (opposite trait gets weight 2)
    
    let weight = 0;
    let scoredTrait = trait;
    
    if (rating === 5) {
      weight = 2;
      scoredTrait = trait;
    } else if (rating === 4) {
      weight = 1;
      scoredTrait = trait;
    } else if (rating === 3) {
      weight = 0; // Neutral, no contribution
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

  // Determine dominant trait for each dimension
  const dimensions = {
    EI: scores.E > scores.I ? 'E' : (scores.E < scores.I ? 'I' : 'E'), // Default to E if tie
    SN: scores.S > scores.N ? 'S' : (scores.S < scores.N ? 'N' : 'S'), // Default to S if tie
    TF: scores.T > scores.F ? 'T' : (scores.T < scores.F ? 'F' : 'T'), // Default to T if tie
    JP: scores.J > scores.P ? 'J' : (scores.J < scores.P ? 'P' : 'J')  // Default to J if tie
  };

  // Calculate confidence for each dimension (percentage)
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

  // Combine dimensions to form MBTI type
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
 * Get opposite trait
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
 * Get interpretation of rating
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
 * Get trait name from dimension code
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
 * Get dimension name
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
 * Validate if all required questions are answered
 */
export const validateAnswers = (answers, totalQuestions) => {
  return answers.length === totalQuestions;
};
