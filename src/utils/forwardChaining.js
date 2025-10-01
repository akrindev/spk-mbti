/**
 * Forward Chaining Algorithm for MBTI Type Determination
 * 
 * Forward chaining is a data-driven reasoning approach where we start with the data (answers)
 * and work forward to reach a conclusion (personality type).
 * 
 * Process:
 * 1. Collect answers from user
 * 2. Apply rules to determine each dimension (E/I, S/N, T/F, J/P)
 * 3. Combine dimensions to determine final MBTI type
 */

/**
 * Analyze answers and determine MBTI type using forward chaining
 * @param {Array} answers - Array of answer objects {questionId, dimension, value, weight}
 * @returns {Object} - Contains mbtiType and confidence scores for each dimension
 */
export const determinePersonalityType = (answers) => {
  // Initialize scores for each dimension
  const scores = {
    E: 0, I: 0,  // Extraversion vs Introversion
    S: 0, N: 0,  // Sensing vs Intuition
    T: 0, F: 0,  // Thinking vs Feeling
    J: 0, P: 0   // Judging vs Perceiving
  };

  // Forward chaining: Process each answer and accumulate scores
  answers.forEach(answer => {
    if (answer.value && Object.prototype.hasOwnProperty.call(scores, answer.value)) {
      scores[answer.value] += answer.weight || 1;
    }
  });

  // Determine dominant trait for each dimension
  const dimensions = {
    EI: scores.E > scores.I ? 'E' : 'I',
    SN: scores.S > scores.N ? 'S' : 'N',
    TF: scores.T > scores.F ? 'T' : 'F',
    JP: scores.J > scores.P ? 'J' : 'P'
  };

  // Calculate confidence for each dimension (percentage)
  const confidence = {
    EI: {
      trait: dimensions.EI,
      percentage: Math.round((Math.max(scores.E, scores.I) / (scores.E + scores.I)) * 100) || 50
    },
    SN: {
      trait: dimensions.SN,
      percentage: Math.round((Math.max(scores.S, scores.N) / (scores.S + scores.N)) * 100) || 50
    },
    TF: {
      trait: dimensions.TF,
      percentage: Math.round((Math.max(scores.T, scores.F) / (scores.T + scores.F)) * 100) || 50
    },
    JP: {
      trait: dimensions.JP,
      percentage: Math.round((Math.max(scores.J, scores.P) / (scores.J + scores.P)) * 100) || 50
    }
  };

  // Combine dimensions to form MBTI type
  const mbtiType = dimensions.EI + dimensions.SN + dimensions.TF + dimensions.JP;

  return {
    mbtiType,
    confidence,
    rawScores: scores,
    dimensions
  };
};

/**
 * Get trait name from dimension code
 */
export const getTraitName = (dimension, trait) => {
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
