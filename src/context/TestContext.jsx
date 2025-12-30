import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'mbti_test_state_v1';

const TestContext = createContext(null);

export function TestProvider({ children }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  // Muat dari localStorage saat mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed.currentQuestionIndex === 'number') setCurrentQuestionIndex(parsed.currentQuestionIndex);
        if (Array.isArray(parsed.answers)) setAnswers(parsed.answers);
        if (parsed.selectedRating !== undefined) setSelectedRating(parsed.selectedRating);
      }
    } catch (e) {
      // abaikan error parsing
      console.warn('Gagal memuat status tes', e);
    }
  }, []);

  // Simpan ke localStorage ketika state yang relevan berubah
  useEffect(() => {
    try {
      const payload = JSON.stringify({ currentQuestionIndex, answers, selectedRating });
      localStorage.setItem(STORAGE_KEY, payload);
    } catch (e) {
      console.warn('Gagal menyimpan status tes', e);
    }
  }, [currentQuestionIndex, answers, selectedRating]);

  const resetTest = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedRating(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
  };

  return (
    <TestContext.Provider value={{ currentQuestionIndex, setCurrentQuestionIndex, answers, setAnswers, selectedRating, setSelectedRating, resetTest }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTestContext() {
  const ctx = useContext(TestContext);
  if (!ctx) throw new Error('useTestContext must be used within a TestProvider');
  return ctx;
}

export default TestContext;
