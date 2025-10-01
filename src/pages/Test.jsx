import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions } from '../data/mbtiData';
import './Test.css';

function Test() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('Silakan pilih salah satu jawaban sebelum melanjutkan.');
      return;
    }

    // Save the answer using forward chaining approach
    const newAnswer = {
      questionId: currentQuestion.id,
      dimension: currentQuestion.dimension,
      value: selectedOption.value,
      weight: selectedOption.weight
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // Move to next question or results
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
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
      setSelectedOption(null);
    }
  };

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
          
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option.text}</span>
              </button>
            ))}
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
