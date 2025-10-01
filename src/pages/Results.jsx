import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Progress, Chip } from '@heroui/react';
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
  const [showAnimation, setShowAnimation] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

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

  const startAnimation = () => {
    if (!result || !result.processingSteps) return;
    
    setShowAnimation(true);
    setIsAnimating(true);
    setCurrentStep(0);

    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < result.processingSteps.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsAnimating(false);
          return prev;
        }
      });
    }, 150); // Show each step for 150ms

    return () => clearInterval(interval);
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-600">
        <div className="text-white text-2xl">Memproses hasil...</div>
      </div>
    );
  }

  const personality = personalityTypes[result.mbtiType];
  const visibleSteps = result.processingSteps ? result.processingSteps.slice(0, currentStep) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Results Header */}
        <Card className="mb-6">
          <CardHeader className="flex flex-col items-center gap-4 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Hasil Tes Kepribadian</h1>
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {result.mbtiType.split('').map((letter, index) => (
                  <div 
                    key={index} 
                    className="w-16 h-16 md:w-20 md:h-20 bg-blue-900 text-white rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold shadow-lg"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-semibold text-blue-800">{personality.name}</h2>
            </div>
          </CardHeader>
        </Card>

        {/* Personality Description */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Deskripsi Kepribadian</h3>
            <p className="text-gray-700 leading-relaxed">{personality.description}</p>
          </CardBody>
        </Card>

        {/* Forward Chaining Animation */}
        {showAnimation && (
          <Card className="mb-6 bg-blue-50 border-2 border-blue-900">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-900">🔄 Simulasi Forward Chaining</h2>
                <Button 
                  size="sm"
                  color="primary"
                  onClick={() => {
                    setShowAnimation(false);
                    setTimeout(() => startAnimation(), 100);
                  }}
                  isDisabled={isAnimating}
                >
                  Ulangi Animasi
                </Button>
              </div>
              <p className="text-gray-600 mb-4">
                Sistem menganalisis jawaban Anda menggunakan metode forward chaining...
              </p>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {visibleSteps.map((step, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm animate-slideIn"
                  >
                    <Chip color="primary" variant="solid" size="sm">Q{step.questionId}</Chip>
                    <span className="text-sm text-gray-600 flex-1">{getDimensionName(step.dimension)}</span>
                    <span className="text-blue-600 font-bold">→</span>
                    <Chip color="primary" variant="flat" size="sm">{getTraitName(step.scoredTrait)}</Chip>
                    <Chip color="success" variant="solid" size="sm">+{step.weight}</Chip>
                  </div>
                ))}
              </div>
              {currentStep >= (result.processingSteps?.length || 0) && (
                <div className="mt-4 p-4 bg-green-100 border-2 border-green-500 rounded-lg animate-fadeIn">
                  <p className="text-green-800 font-semibold text-center">
                    ✓ Analisis selesai! Tipe kepribadian Anda: <strong>{result.mbtiType}</strong>
                  </p>
                </div>
              )}
            </CardBody>
          </Card>
        )}

        {/* Button to show animation if not visible */}
        {!showAnimation && (
          <div className="mb-6 flex justify-center">
            <Button 
              color="primary"
              size="lg"
              onClick={startAnimation}
              className="shadow-lg"
            >
              🔄 Lihat Simulasi Forward Chaining
            </Button>
          </div>
        )}

        {/* Personality Details */}
        <div className="space-y-4 mb-6">
          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">👥 Pandangan Terhadap Orang Lain</h3>
              <p className="text-gray-700 leading-relaxed">{personality.viewOfOthers}</p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">💼 Pilihan Karir</h3>
              <p className="text-gray-700 leading-relaxed">{personality.careerPath}</p>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">🎯 Cara Pengambilan Keputusan</h3>
              <p className="text-gray-700 leading-relaxed">{personality.decisionMaking}</p>
            </CardBody>
          </Card>
        </div>

        {/* Dimensions Analysis */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-6 text-center">Analisis Dimensi Kepribadian</h3>
            
            <div className="space-y-6">
              {Object.entries(result.confidence).map(([dimension, data]) => (
                <div key={dimension}>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-gray-800">{getDimensionName(dimension)}</h4>
                    <Chip color="primary" variant="solid">{getTraitName(data.trait)}</Chip>
                  </div>
                  
                  <Progress 
                    value={data.percentage}
                    color="primary"
                    size="lg"
                    showValueLabel={true}
                    className="mb-2"
                    aria-label={`${getDimensionName(dimension)} confidence level`}
                  />
                  
                  <div className="flex justify-between text-sm">
                    {dimension === 'EI' && (
                      <>
                        <span className={data.trait === 'E' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Extraversion (E): {data.scores.E}
                        </span>
                        <span className={data.trait === 'I' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Introversion (I): {data.scores.I}
                        </span>
                      </>
                    )}
                    {dimension === 'SN' && (
                      <>
                        <span className={data.trait === 'S' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Sensing (S): {data.scores.S}
                        </span>
                        <span className={data.trait === 'N' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Intuition (N): {data.scores.N}
                        </span>
                      </>
                    )}
                    {dimension === 'TF' && (
                      <>
                        <span className={data.trait === 'T' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Thinking (T): {data.scores.T}
                        </span>
                        <span className={data.trait === 'F' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Feeling (F): {data.scores.F}
                        </span>
                      </>
                    )}
                    {dimension === 'JP' && (
                      <>
                        <span className={data.trait === 'J' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Judging (J): {data.scores.J}
                        </span>
                        <span className={data.trait === 'P' ? 'text-blue-900 font-bold' : 'text-gray-500'}>
                          Perceiving (P): {data.scores.P}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Personality Traits */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Karakteristik Utama</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {personality.traits.map((trait, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-600 font-bold text-xl">✓</span>
                  <span className="text-gray-800">{trait}</span>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <Button 
            as={Link}
            to="/test"
            color="default"
            variant="bordered"
            size="lg"
            className="w-full md:w-auto"
          >
            Ulangi Tes
          </Button>
          <Button 
            as={Link}
            to="/"
            color="primary"
            size="lg"
            className="w-full md:w-auto"
          >
            Kembali ke Beranda
          </Button>
        </div>

        {/* Method Explanation */}
        <Card className="bg-yellow-50 border-2 border-yellow-400">
          <CardBody className="p-6">
            <h3 className="text-xl font-bold text-yellow-900 mb-4">Tentang Metode Forward Chaining</h3>
            <p className="text-yellow-800 mb-4 leading-relaxed">
              Forward chaining adalah metode penalaran yang bekerja dari data menuju kesimpulan. 
              Dalam sistem ini:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-yellow-800">
              <li><strong>Data Collection:</strong> Sistem mengumpulkan semua jawaban Anda dari 25 pertanyaan dengan skala Likert 1-5</li>
              <li><strong>Rule Application:</strong> Setiap jawaban dianalisis untuk menentukan trait dominan pada 4 dimensi (E/I, S/N, T/F, J/P)</li>
              <li><strong>Score Accumulation:</strong> Sistem menghitung skor untuk setiap trait berdasarkan rating Anda (5=sangat setuju, 1=sangat tidak setuju)</li>
              <li><strong>Conclusion:</strong> Trait dengan skor tertinggi di setiap dimensi dikombinasikan membentuk tipe MBTI Anda</li>
            </ol>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Results;
