import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/mbtiData';
import './Test.css';

function Test() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  const handleNext = () => {
    if (selectedRating === null) {
      alert('Silakan pilih salah satu nilai sebelum melanjutkan.');
      return;
    }

    // Save the answer using forward chaining approach
    // Rating 1-2 = opposite trait, 4-5 = main trait, 3 = neutral
    const newAnswer = {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      trait: currentQuestion.trait,
      rating: selectedRating
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Move to next question or results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedRating(null);
    } else {
      // Forward chaining: All data collected, navigate to results for processing
      navigate('/results', { state: { answers: updatedAnswers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      // Remove the last answer
      const updatedAnswers = answers.slice(0, -1);
      setAnswers(updatedAnswers);
      setSelectedRating(null);
    }
  };

  const ratingLabels = [
    { value: 1, label: "Sangat Tidak Setuju" },
    { value: 2, label: "Tidak Setuju" },
    { value: 3, label: "Netral" },
    { value: 4, label: "Setuju" },
    { value: 5, label: "Sangat Setuju" }
  ];

  return (
    <div className="test-container">
      <div className="test-content">
        <div className="test-header">
          <h1>Tes Kepribadian MBTI</h1>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">
            Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
          </p>
        </div>

        <div className="question-card">
          <h2 className="question-text">{currentQuestion.question}</h2>
          
          <div className="likert-scale">
            <div className="scale-labels">
              <span className="scale-label-left">Sangat Tidak Setuju</span>
              <span className="scale-label-right">Sangat Setuju</span>
            </div>
            <div className="rating-options">
              {ratingLabels.map((item) => (
                <div 
                  key={item.value} 
                  className={`rating-option ${selectedRating === item.value ? 'selected' : ''}`}
                  onClick={() => handleRatingSelect(item.value)}
                >
                  <input 
                    type="radio" 
                    name="rating" 
                    value={item.value}
                    checked={selectedRating === item.value}
                    onChange={() => handleRatingSelect(item.value)}
                    id={`rating-${item.value}`}
                  />
                  <label htmlFor={`rating-${item.value}`}>
                    <span className="rating-number">{item.value}</span>
                    <span className="rating-label">{item.label}</span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="navigation-buttons">
          <button 
            className="nav-button prev-button" 
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            ← Sebelumnya
          </button>
          
          <button 
            className="nav-button next-button" 
            onClick={handleNext}
          >
            {currentQuestionIndex === questions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya →'}
          </button>
        </div>

        <div className="dimension-info">
          <p>
            <strong>Dimensi:</strong> {currentQuestion.dimension === 'EI' ? 'Energy Direction' : 
                                       currentQuestion.dimension === 'SN' ? 'Information Processing' :
                                       currentQuestion.dimension === 'TF' ? 'Decision Making' : 
                                       'Lifestyle'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Test;
