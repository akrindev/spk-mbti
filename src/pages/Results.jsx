import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { personalityTypes } from "../data/mbtiData";
import {
  determinePersonalityType,
  getDimensionName,
  getTraitName,
} from "../utils/forwardChaining";

// styles migrated to Tailwind utilities in JSX; removed Results.css import

function Results() {
	const location = useLocation();
	const navigate = useNavigate();
	const [result, setResult] = useState(null);
	const [showAnimation, setShowAnimation] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [expandedStepId, setExpandedStepId] = useState(null);

	const resultRef = useRef(null);
	const stepIntervalRef = useRef(null);

	// Derived visible steps used by effects and render
	const visibleSteps = result?.processingSteps
		? result.processingSteps.slice(0, currentStep)
		: [];

	// keep ref updated with latest result so startAnimation can be stable
	useEffect(() => {
		resultRef.current = result;
	}, [result]);

	const stopAnimation = useCallback(() => {
		if (stepIntervalRef.current) {
			clearInterval(stepIntervalRef.current);
			stepIntervalRef.current = null;
		}
		setIsAnimating(false);
	}, []);

	const startAnimation = useCallback(() => {
		const r = resultRef.current;
		if (!r || !r.processingSteps) return;

		// clear any existing interval to avoid stacking
		if (stepIntervalRef.current) {
			clearInterval(stepIntervalRef.current);
			stepIntervalRef.current = null;
		}

		setShowAnimation(true);
		setIsAnimating(true);
		setCurrentStep(0);

		stepIntervalRef.current = setInterval(() => {
			setCurrentStep((prev) => {
				if (prev < r.processingSteps.length) {
					return prev + 1;
				} else {
					// finished
					if (stepIntervalRef.current) {
						clearInterval(stepIntervalRef.current);
						stepIntervalRef.current = null;
					}
					setIsAnimating(false);
					return prev;
				}
			});
		}, 220); // Show each step for 220ms (gentle pacing)
	}, []);

	// cleanup interval on unmount
	useEffect(() => {
		return () => {
			if (stepIntervalRef.current) {
				clearInterval(stepIntervalRef.current);
				stepIntervalRef.current = null;
			}
		};
	}, []);

	// Framer-motion controls for interactive animations
	const lettersControls = useAnimation();
	const stepsControls = useAnimation();

	useEffect(() => {
		if (result?.mbtiType) {
			// animate MBTI letters on mount
			lettersControls.start((i) => ({
				scale: [0, 1.12, 1],
				rotate: [-10, 8, -4, 0],
				opacity: [0, 1],
				transition: { delay: i * 0.06, duration: 0.6, ease: "easeOut" },
			}));
		}
	}, [result, lettersControls]);

	// when animation runs, stagger the visible steps appearance
	useEffect(() => {
		if (showAnimation && visibleSteps.length > 0) {
			// staggered appearance for steps
			stepsControls.start((i) => ({
				opacity: 1,
				y: 0,
				transition: { delay: i * 0.0006, duration: 0.35, ease: "easeOut" },
			}));
		}
	}, [showAnimation, visibleSteps.length, stepsControls]);

	useEffect(() => {
		// Check if we have answers from the test
		if (!location.state || !location.state.answers) {
			navigate("/");
			return;
		}

		// Apply forward chaining algorithm to determine personality type
		const analysisResult = determinePersonalityType(location.state.answers);
		setResult(analysisResult);

		startAnimation();
	}, [location, navigate, startAnimation]);

	if (!result) {
		return (
			<div className="flex justify-center items-center bg-gradient-to-br from-blue-900 to-blue-600 min-h-screen">
				<div className="text-white text-2xl">Memproses hasil...</div>
			</div>
		);
	}

	const personality = personalityTypes[result.mbtiType];

	return (
		<div className="bg-gradient-to-br from-blue-900 to-blue-600 p-4 md:p-8 min-h-screen">
			<div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] mx-auto p-6 md:p-8 rounded-2xl max-w-5xl">
				{/* Results Header */}
				<Card className="mb-6">
					<CardHeader className="flex flex-col items-center gap-4 p-8">
						<h1 className="font-bold text-blue-900 text-3xl md:text-4xl">
							Hasil Tes Kepribadian
						</h1>
					</CardHeader>
				</Card>

				{/* MBTI Type Display (gradient banner) */}
				<div className="mb-6">
					<div className="bg-gradient-to-br from-blue-900 to-blue-500 p-6 rounded-2xl">
						<div className="flex flex-col items-center">
							<div className="flex gap-3 mb-4">
								{result.mbtiType.split("").map((letter, i) => (
									<motion.div
										key={`${letter}`}
										custom={i}
										animate={lettersControls}
										initial={{ scale: 0, rotate: -10, opacity: 0 }}
										whileHover={{ scale: 1.06, y: -6 }}
										className="flex justify-center items-center bg-white shadow-md rounded-lg w-16 md:w-20 h-16 md:h-20 font-bold text-blue-900 text-2xl md:text-4xl cursor-default select-none"
									>
										{letter}
									</motion.div>
								))}
							</div>
							<h2 className="font-semibold text-white text-xl md:text-2xl">
								{personality.name}
							</h2>
						</div>
					</div>

					{/* Forward Chaining Animation */}
					{showAnimation && (
						<Card className="bg-blue-50 mt-5 mb-6 border-2 border-blue-900">
							<CardBody className="p-6">
								<div className="flex justify-between items-center mb-4">
									<h2 className="font-bold text-blue-900 text-xl">
										🔄 Simulasi Forward Chaining
									</h2>
									<Button
										size="sm"
										color="primary"
										onClick={() => {
											// gracefully stop and restart
											stopAnimation();
											setShowAnimation(false);
											setTimeout(() => startAnimation(), 120);
										}}
										isDisabled={isAnimating}
									>
										Ulangi Animasi
									</Button>
								</div>
								<p className="mb-4 text-gray-600">
									Sistem menganalisis jawaban Anda menggunakan metode forward
									chaining...
								</p>
								<div className="space-y-2 max-h-96 overflow-y-auto">
									{visibleSteps.map((step, idx) => (
										<motion.button
											key={`step-${step.questionId}`}
											layout
											custom={idx}
											initial={{ opacity: 0, y: 8 }}
											animate={stepsControls}
											className="bg-white shadow-sm rounded-lg overflow-hidden text-left"
											type="button"
											onClick={() =>
												setExpandedStepId(
													expandedStepId === step.questionId
														? null
														: step.questionId,
												)
											}
											aria-expanded={expandedStepId === step.questionId}
											whileTap={{ scale: 0.995 }}
										>
											<div className="flex items-center gap-2 p-3 cursor-pointer">
												<Chip color="primary" variant="solid" size="sm">
													Q{step.questionId}
												</Chip>
												<span className="flex-1 text-gray-600 text-sm">
													{getDimensionName(step.dimension)}
												</span>
												<span className="font-bold text-blue-600">→</span>
												<Chip color="primary" variant="flat" size="sm">
													{getTraitName(step.scoredTrait)}
												</Chip>
												<Chip color="success" variant="solid" size="sm">
													+{step.weight}
												</Chip>
											</div>
											{expandedStepId === step.questionId && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="px-4 pb-3 border-t text-gray-700 text-sm"
												>
													<div className="mb-1 font-semibold">Interpretasi</div>
													<div className="text-gray-600">
														{step.interpretation}
													</div>
													<div className="mt-2 text-gray-500 text-xs">
														Original: {getTraitName(step.originalTrait)} •
														Rating: {step.rating}
													</div>
												</motion.div>
											)}
										</motion.button>
									))}
								</div>
								{currentStep >= (result.processingSteps?.length || 0) && (
									<div className="bg-green-100 mt-4 p-4 border-2 border-green-500 rounded-lg animate-fadeIn">
										<p className="font-semibold text-green-800 text-center">
											✓ Analisis selesai! Tipe kepribadian Anda:{" "}
											<strong>{result.mbtiType}</strong>
										</p>
									</div>
								)}
							</CardBody>
						</Card>
					)}

					{/* Button to show animation if not visible */}
					{!showAnimation && (
						<div className="flex justify-center mb-6">
							<Button
								color="primary"
								size="lg"
								onClick={() => {
								stopAnimation();
								startAnimation();
							}}
								className="shadow-lg"
							>
								🔄 Lihat Simulasi Forward Chaining
							</Button>
						</div>
					)}

					{/* Personality Description */}
					<Card className="mb-6">
						<CardBody className="p-6">
							<h3 className="mb-4 font-bold text-blue-900 text-xl">
								Deskripsi Kepribadian
							</h3>
							<p className="text-gray-700 leading-relaxed">
								{personality.description}
							</p>
						</CardBody>
					</Card>

					{/* Personality Details */}
					<div className="space-y-4 mb-6">
						<Card>
							<CardBody className="p-6">
								<h3 className="mb-3 font-bold text-blue-900 text-lg">
									👥 Pandangan Terhadap Orang Lain
								</h3>
								<p className="text-gray-700 leading-relaxed">
									{personality.viewOfOthers}
								</p>
							</CardBody>
						</Card>

						<Card>
							<CardBody className="p-6">
								<h3 className="mb-3 font-bold text-blue-900 text-lg">
									💼 Pilihan Karir
								</h3>
								<p className="text-gray-700 leading-relaxed">
									{personality.careerPath}
								</p>
							</CardBody>
						</Card>

						<Card>
							<CardBody className="p-6">
								<h3 className="mb-3 font-bold text-blue-900 text-lg">
									🎯 Cara Pengambilan Keputusan
								</h3>
								<p className="text-gray-700 leading-relaxed">
									{personality.decisionMaking}
								</p>
							</CardBody>
						</Card>
					</div>

					{/* Dimensions Analysis */}
					<Card className="mb-6">
						<CardBody className="p-6">
							<h3 className="mb-6 font-bold text-blue-900 text-xl text-center">
								Analisis Dimensi Kepribadian
							</h3>

							<div className="space-y-6">
								{Object.entries(result.confidence).map(([dimension, data]) => (
									<div key={dimension}>
										<div className="flex justify-between items-center mb-2">
											<h4 className="font-semibold text-gray-800">
												{getDimensionName(dimension)}
											</h4>
											<Chip color="primary" variant="solid">
												{getTraitName(data.trait)}
											</Chip>
										</div>

										{/* Rich progress bar + label + trait badge */}
										<div className="mb-3">
											<div className="flex justify-between items-center mb-2">
												<div className="flex items-center gap-3">
													<h4 className="font-semibold text-gray-800">
														{getDimensionName(dimension)}
													</h4>
													<span className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-500 shadow-sm px-3 py-1 rounded-full font-semibold text-white text-sm">
														{getTraitName(data.trait)}
													</span>
												</div>
												<div className="font-medium text-gray-700 text-sm">
													{data.percentage}%
												</div>
											</div>

											<div
												className="bg-gray-200 mb-3 rounded-full w-full h-4 overflow-hidden"
												aria-hidden
											>
												<motion.div
													className="bg-gradient-to-r from-blue-900 to-blue-500 h-full"
													initial={{ width: 0 }}
													animate={{ width: `${data.percentage}%` }}
													transition={{ duration: 1, ease: "easeOut" }}
												/>
											</div>

											<div className="flex gap-4 text-sm">
												{dimension === "EI" && (
													<>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "E" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Extraversion (E): {data.scores.E}
														</div>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "I" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Introversion (I): {data.scores.I}
														</div>
													</>
												)}
												{dimension === "SN" && (
													<>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "S" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Sensing (S): {data.scores.S}
														</div>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "N" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Intuition (N): {data.scores.N}
														</div>
													</>
												)}
												{dimension === "TF" && (
													<>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "T" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Thinking (T): {data.scores.T}
														</div>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "F" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Feeling (F): {data.scores.F}
														</div>
													</>
												)}
												{dimension === "JP" && (
													<>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "J" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Judging (J): {data.scores.J}
														</div>
														<div
															className={`flex-1 p-2 rounded-lg ${data.trait === "P" ? "bg-blue-50 text-blue-900 font-semibold" : "text-gray-600 bg-gray-50"}`}
														>
															Perceiving (P): {data.scores.P}
														</div>
													</>
												)}
											</div>
										</div>
									</div>
								))}
							</div>
						</CardBody>
					</Card>

					{/* Personality Traits */}
					<Card className="mb-6">
						<CardBody className="p-6">
							<h3 className="mb-4 font-bold text-blue-900 text-xl">
								Karakteristik Utama
							</h3>
							<div className="gap-3 grid grid-cols-1 md:grid-cols-2">
								{personality.traits.map((trait) => (
									<div
										key={trait}
										className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg"
									>
										<span className="font-bold text-green-600 text-xl">✓</span>
										<span className="text-gray-800">{trait}</span>
									</div>
								))}
							</div>
						</CardBody>
					</Card>

					{/* Actions */}
					<div className="flex md:flex-row flex-col justify-center gap-4 mb-6">
						<Button
							as={Link}
							to="/test"
							color="primary"
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
							<h3 className="mb-4 font-bold text-yellow-900 text-xl">
								Tentang Metode Forward Chaining
							</h3>
							<p className="mb-4 text-yellow-800 leading-relaxed">
								Forward chaining adalah metode penalaran yang bekerja dari data
								menuju kesimpulan. Dalam sistem ini:
							</p>
							<ol className="space-y-2 text-yellow-800 list-decimal list-inside">
								<li>
									<strong>Data Collection:</strong> Sistem mengumpulkan semua
									jawaban Anda dari 25 pertanyaan dengan skala Likert 1-5
								</li>
								<li>
									<strong>Rule Application:</strong> Setiap jawaban dianalisis
									untuk menentukan trait dominan pada 4 dimensi (E/I, S/N, T/F,
									J/P)
								</li>
								<li>
									<strong>Score Accumulation:</strong> Sistem menghitung skor
									untuk setiap trait berdasarkan rating Anda (5=sangat setuju,
									1=sangat tidak setuju)
								</li>
								<li>
									<strong>Conclusion:</strong> Trait dengan skor tertinggi di
									setiap dimensi dikombinasikan membentuk tipe MBTI Anda
								</li>
							</ol>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	);
}

export default Results;
