import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-900 to-blue-600 p-4 md:p-8 min-h-screen">
      <div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] mx-auto p-6 sm:p-8 md:p-12 rounded-[20px] w-full max-w-5xl">
        <h1 className="mb-2 font-bold text-blue-900 text-2xl sm:text-4xl md:text-5xl text-center">Sistem Pendukung Keputusan MBTI</h1>
        <h2 className="mb-6 sm:mb-8 font-normal text-[#764ba2] text-lg sm:text-xl md:text-2xl text-center">Temukan Tipe Kepribadian Anda</h2>

        <div className="mb-6">
          <p className="mb-6 sm:mb-8 text-gray-600 text-base sm:text-lg text-center leading-relaxed">
            MBTI (Myers-Briggs Type Indicator) adalah alat penilaian kepribadian yang
            mengidentifikasi preferensi psikologis individu dalam empat dimensi:
          </p>

          <div className="gap-4 sm:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            <div className="bg-gradient-to-br from-blue-900 to-[#764ba2] p-4 sm:p-6 rounded-lg text-white text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="mb-2 text-base sm:text-lg">Extraversion (E) vs Introversion (I)</h3>
              <p className="opacity-90 text-xs sm:text-sm">Bagaimana Anda mengarahkan energi</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-[#764ba2] p-4 sm:p-6 rounded-lg text-white text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="mb-2 text-base sm:text-lg">Sensing (S) vs Intuition (N)</h3>
              <p className="opacity-90 text-xs sm:text-sm">Bagaimana Anda memproses informasi</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-[#764ba2] p-4 sm:p-6 rounded-lg text-white text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="mb-2 text-base sm:text-lg">Thinking (T) vs Feeling (F)</h3>
              <p className="opacity-90 text-xs sm:text-sm">Bagaimana Anda membuat keputusan</p>
            </div>

            <div className="bg-gradient-to-br from-blue-900 to-[#764ba2] p-4 sm:p-6 rounded-lg text-white text-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="mb-2 text-base sm:text-lg">Judging (J) vs Perceiving (P)</h3>
              <p className="opacity-90 text-xs sm:text-sm">Bagaimana Anda mengatur gaya hidup</p>
            </div>
          </div>

          <div className="bg-gray-100 mb-6 p-4 sm:p-6 md:p-8 rounded-lg">
            <h3 className="mb-4 sm:mb-6 text-blue-900 text-base sm:text-lg text-center">16 Tipe Kepribadian:</h3>
            <div className="gap-2 sm:gap-3 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ISTJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ISTP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ISFJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ISFP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">INFJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">INFP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">INTJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">INTP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ESTP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ESTJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ESFP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ESFJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ENFP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ENFJ</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ENTP</span>
              <span className="block bg-white hover:bg-blue-900 px-2 sm:px-4 py-2 sm:py-3 border-[#667eea] border-2 rounded-md font-medium text-blue-900 hover:text-white text-xs sm:text-sm text-center hover:scale-105 transition transform">ENTJ</span>
            </div>
          </div>

          <div className="bg-yellow-50 mb-6 p-4 sm:p-6 border-yellow-400 border-l-4 rounded-md text-yellow-800 text-sm sm:text-base">
            <h3 className="mb-2 font-semibold text-yellow-900">Metode Forward Chaining</h3>
            <p className="mb-2 leading-relaxed">Sistem ini menggunakan metode <strong>Forward Chaining</strong>, yaitu pendekatan penalaran yang dimulai dari data (jawaban Anda) dan bekerja maju untuk mencapai kesimpulan (tipe kepribadian).</p>
            <p className="leading-relaxed">Proses: Jawaban → Analisis Dimensi → Penentuan Tipe Kepribadian</p>
          </div>
        </div>

        <div className="flex justify-center">
          <Link to="/test" className="inline-block bg-gradient-to-br from-blue-900 to-[#764ba2] shadow-[0_10px_30px_rgba(102,126,234,0.4)] px-6 sm:px-12 py-3 sm:py-4 rounded-full font-bold text-white text-base sm:text-xl transition-transform hover:-translate-y-1">
            Mulai Tes Kepribadian
          </Link>
        </div>

        <p className="mt-6 sm:mt-8 text-gray-400 text-xs sm:text-sm text-center italic">* Tes ini dirancang untuk tujuan edukatif dan eksplorasi diri.</p>
      </div>
    </div>
  );
}

export default Home;
