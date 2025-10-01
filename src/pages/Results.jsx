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

  useEffect(() => {
    // Check if we have answers from the test
    if (!location.state || !location.state.answers) {
      navigate('/');
      return;
    }

    // Apply forward chaining algorithm to determine personality type
    const analysisResult = determinePersonalityType(location.state.answers);
    setResult(analysisResult);
  }, [location, navigate]);

  if (!result) {
    return (
      <div className="results-container">
        <div className="loading">Memproses hasil...</div>
      </div>
    );
  }

  const personality = personalityTypes[result.mbtiType];

  return (
    <div className="results-container">
      <div className="results-content">
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

        <div className="forward-chaining-info">
          <h3>🔍 Analisis Forward Chaining</h3>
          <p>
            Sistem menggunakan metode forward chaining untuk menganalisis jawaban Anda 
            dan menentukan tipe kepribadian berdasarkan dominasi trait pada setiap dimensi.
          </p>
        </div>

        <div className="dimensions-analysis">
          <h3>Analisis Dimensi Kepribadian</h3>
          
          {Object.entries(result.confidence).map(([dimension, data]) => (
            <div key={dimension} className="dimension-result">
              <div className="dimension-header">
                <h4>{getDimensionName(dimension)}</h4>
                <span className="trait-badge">{getTraitName(dimension, data.trait)}</span>
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
                      Extraversion (E)
                    </span>
                    <span>vs</span>
                    <span className={data.trait === 'I' ? 'active' : ''}>
                      Introversion (I)
                    </span>
                  </div>
                )}
                {dimension === 'SN' && (
                  <div className="traits-comparison">
                    <span className={data.trait === 'S' ? 'active' : ''}>
                      Sensing (S)
                    </span>
                    <span>vs</span>
                    <span className={data.trait === 'N' ? 'active' : ''}>
                      Intuition (N)
                    </span>
                  </div>
                )}
                {dimension === 'TF' && (
                  <div className="traits-comparison">
                    <span className={data.trait === 'T' ? 'active' : ''}>
                      Thinking (T)
                    </span>
                    <span>vs</span>
                    <span className={data.trait === 'F' ? 'active' : ''}>
                      Feeling (F)
                    </span>
                  </div>
                )}
                {dimension === 'JP' && (
                  <div className="traits-comparison">
                    <span className={data.trait === 'J' ? 'active' : ''}>
                      Judging (J)
                    </span>
                    <span>vs</span>
                    <span className={data.trait === 'P' ? 'active' : ''}>
                      Perceiving (P)
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
            <li><strong>Data Collection:</strong> Sistem mengumpulkan semua jawaban Anda dari 12 pertanyaan</li>
            <li><strong>Rule Application:</strong> Setiap jawaban dianalisis untuk menentukan trait dominan pada 4 dimensi (E/I, S/N, T/F, J/P)</li>
            <li><strong>Score Accumulation:</strong> Sistem menghitung skor untuk setiap trait berdasarkan jawaban</li>
            <li><strong>Conclusion:</strong> Trait dengan skor tertinggi di setiap dimensi dikombinasikan membentuk tipe MBTI Anda</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Results;
