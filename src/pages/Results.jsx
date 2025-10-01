import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { personalityTypes } from '../data/mbtiData';
import { 
  determinePersonalityType, 
  getTraitName, 
  getDimensionName 
} from '../utils/forwardChaining';
import './Results.css';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check if we have answers from the test
    if (!location.state || !location.state.answers) {
      navigate('/');
      return;
    }

    // Apply forward chaining algorithm to determine personality type
    const analysisResult = determinePersonalityType(location.state.answers);
    setResult(analysisResult);

    // Animate through processing steps
    if (analysisResult.processingSteps && analysisResult.processingSteps.length > 0) {
      const interval = setInterval(() => {
        setCurrentStep(prev => {
          if (prev < analysisResult.processingSteps.length) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setShowAnimation(false), 1000);
            return prev;
          }
        });
      }, 150); // Show each step for 150ms

      return () => clearInterval(interval);
    }
  }, [location, navigate]);

  if (!result) {
    return (
      <div className="results-container">
        <div className="loading">Memproses hasil...</div>
      </div>
    );
  }

  const personality = personalityTypes[result.mbtiType];
  const visibleSteps = result.processingSteps ? result.processingSteps.slice(0, currentStep) : [];

  return (
    <div className="results-container">
      <div className="results-content">
        {showAnimation && (
          <div className="forward-chaining-animation">
            <h2>🔄 Proses Forward Chaining</h2>
            <p className="animation-description">
              Sistem sedang menganalisis jawaban Anda menggunakan metode forward chaining...
            </p>
            <div className="processing-steps">
              {visibleSteps.map((step, index) => (
                <div key={index} className="processing-step">
                  <span className="step-number">Q{step.questionId}</span>
                  <span className="step-dimension">{getDimensionName(step.dimension)}</span>
                  <span className="step-arrow">→</span>
                  <span className="step-trait">{getTraitName(step.scoredTrait)}</span>
                  <span className="step-weight">+{step.weight}</span>
                </div>
              ))}
            </div>
            {currentStep >= (result.processingSteps?.length || 0) && (
              <div className="conclusion-step">
                <p>✓ Analisis selesai! Tipe kepribadian Anda: <strong>{result.mbtiType}</strong></p>
              </div>
            )}
          </div>
        )}

        {!showAnimation && (
          <>
            <div className="results-header">
              <h1>Hasil Tes Kepribadian</h1>
              <div className="mbti-type-display">
                <div className="type-letters">
                  {result.mbtiType.split('').map((letter, index) => (
                    <span key={index} className="type-letter">{letter}</span>
                  ))}
                </div>
                <h2>{personality.name}</h2>
              </div>
            </div>

            <div className="personality-description">
              <h3>Deskripsi Kepribadian</h3>
              <p>{personality.description}</p>
            </div>

            <div className="personality-details">
              <div className="detail-section">
                <h3>👥 Pandangan Terhadap Orang Lain</h3>
                <p>{personality.viewOfOthers}</p>
              </div>

              <div className="detail-section">
                <h3>💼 Pilihan Karir</h3>
                <p>{personality.careerPath}</p>
              </div>

              <div className="detail-section">
                <h3>🎯 Cara Pengambilan Keputusan</h3>
                <p>{personality.decisionMaking}</p>
              </div>
            </div>

            <div className="dimensions-analysis">
              <h3>Analisis Dimensi Kepribadian</h3>
              
              {Object.entries(result.confidence).map(([dimension, data]) => (
                <div key={dimension} className="dimension-result">
                  <div className="dimension-header">
                    <h4>{getDimensionName(dimension)}</h4>
                    <span className="trait-badge">{getTraitName(data.trait)}</span>
                  </div>
                  
                  <div className="confidence-bar-container">
                    <div 
                      className="confidence-bar" 
                      style={{ width: `${data.percentage}%` }}
                    >
                      <span className="confidence-text">{data.percentage}%</span>
                    </div>
                  </div>
                  
                  <div className="dimension-traits">
                    {dimension === 'EI' && (
                      <div className="traits-comparison">
                        <span className={data.trait === 'E' ? 'active' : ''}>
                          Extraversion (E): {data.scores.E}
                        </span>
                        <span>vs</span>
                        <span className={data.trait === 'I' ? 'active' : ''}>
                          Introversion (I): {data.scores.I}
                        </span>
                      </div>
                    )}
                    {dimension === 'SN' && (
                      <div className="traits-comparison">
                        <span className={data.trait === 'S' ? 'active' : ''}>
                          Sensing (S): {data.scores.S}
                        </span>
                        <span>vs</span>
                        <span className={data.trait === 'N' ? 'active' : ''}>
                          Intuition (N): {data.scores.N}
                        </span>
                      </div>
                    )}
                    {dimension === 'TF' && (
                      <div className="traits-comparison">
                        <span className={data.trait === 'T' ? 'active' : ''}>
                          Thinking (T): {data.scores.T}
                        </span>
                        <span>vs</span>
                        <span className={data.trait === 'F' ? 'active' : ''}>
                          Feeling (F): {data.scores.F}
                        </span>
                      </div>
                    )}
                    {dimension === 'JP' && (
                      <div className="traits-comparison">
                        <span className={data.trait === 'J' ? 'active' : ''}>
                          Judging (J): {data.scores.J}
                        </span>
                        <span>vs</span>
                        <span className={data.trait === 'P' ? 'active' : ''}>
                          Perceiving (P): {data.scores.P}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="personality-traits">
              <h3>Karakteristik Utama</h3>
              <div className="traits-list">
                {personality.traits.map((trait, index) => (
                  <div key={index} className="trait-item">
                    <span className="trait-icon">✓</span>
                    {trait}
                  </div>
                ))}
              </div>
            </div>

            <div className="actions">
              <Link to="/test" className="action-button secondary">
                Ulangi Tes
              </Link>
              <Link to="/" className="action-button primary">
                Kembali ke Beranda
              </Link>
            </div>

            <div className="method-explanation">
              <h3>Tentang Metode Forward Chaining</h3>
              <p>
                Forward chaining adalah metode penalaran yang bekerja dari data menuju kesimpulan. 
                Dalam sistem ini:
              </p>
              <ol>
                <li><strong>Data Collection:</strong> Sistem mengumpulkan semua jawaban Anda dari 25 pertanyaan dengan skala Likert 1-5</li>
                <li><strong>Rule Application:</strong> Setiap jawaban dianalisis untuk menentukan trait dominan pada 4 dimensi (E/I, S/N, T/F, J/P)</li>
                <li><strong>Score Accumulation:</strong> Sistem menghitung skor untuk setiap trait berdasarkan rating Anda (5=sangat setuju, 1=sangat tidak setuju)</li>
                <li><strong>Conclusion:</strong> Trait dengan skor tertinggi di setiap dimensi dikombinasikan membentuk tipe MBTI Anda</li>
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Results;
