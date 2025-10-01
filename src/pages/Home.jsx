import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Sistem Pendukung Keputusan MBTI</h1>
        <h2>Temukan Tipe Kepribadian Anda</h2>
        
        <div className="info-section">
          <p>
            MBTI (Myers-Briggs Type Indicator) adalah alat penilaian kepribadian yang 
            mengidentifikasi preferensi psikologis individu dalam empat dimensi:
          </p>
          
          <div className="dimensions-grid">
            <div className="dimension-card">
              <h3>Extraversion (E) vs Introversion (I)</h3>
              <p>Bagaimana Anda mengarahkan energi</p>
            </div>
            
            <div className="dimension-card">
              <h3>Sensing (S) vs Intuition (N)</h3>
              <p>Bagaimana Anda memproses informasi</p>
            </div>
            
            <div className="dimension-card">
              <h3>Thinking (T) vs Feeling (F)</h3>
              <p>Bagaimana Anda membuat keputusan</p>
            </div>
            
            <div className="dimension-card">
              <h3>Judging (J) vs Perceiving (P)</h3>
              <p>Bagaimana Anda mengatur gaya hidup</p>
            </div>
          </div>

          <div className="personality-types">
            <h3>16 Tipe Kepribadian:</h3>
            <div className="types-grid">
              <span className="type-badge">ISTJ - The Inspector</span>
              <span className="type-badge">ISTP - The Crafter</span>
              <span className="type-badge">ISFJ - The Protector</span>
              <span className="type-badge">ISFP - The Artist</span>
              <span className="type-badge">INFJ - The Advocate</span>
              <span className="type-badge">INFP - The Mediator</span>
              <span className="type-badge">INTJ - The Architect</span>
              <span className="type-badge">INTP - The Thinker</span>
              <span className="type-badge">ESTP - The Persuader</span>
              <span className="type-badge">ESTJ - The Director</span>
              <span className="type-badge">ESFP - The Performer</span>
              <span className="type-badge">ESFJ - The Caregiver</span>
              <span className="type-badge">ENFP - The Champion</span>
              <span className="type-badge">ENFJ - The Giver</span>
              <span className="type-badge">ENTP - The Debater</span>
              <span className="type-badge">ENTJ - The Commander</span>
            </div>
          </div>

          <div className="method-info">
            <h3>Metode Forward Chaining</h3>
            <p>
              Sistem ini menggunakan metode <strong>Forward Chaining</strong>, yaitu 
              pendekatan penalaran yang dimulai dari data (jawaban Anda) dan bekerja 
              maju untuk mencapai kesimpulan (tipe kepribadian).
            </p>
            <p>
              Proses: Jawaban → Analisis Dimensi → Penentuan Tipe Kepribadian
            </p>
          </div>
        </div>

        <Link to="/test" className="start-button">
          Mulai Tes Kepribadian
        </Link>
        
        <p className="disclaimer">
          * Tes ini dirancang untuk tujuan edukatif dan eksplorasi diri.
        </p>
      </div>
    </div>
  );
}

export default Home;
