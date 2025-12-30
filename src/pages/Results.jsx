import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { motion, useAnimation } from "framer-motion";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TestContext from "../context/TestContext";
import { personalityTypes } from "../data/mbtiData";
import {
	determinePersonalityType,
	getDimensionName,
	getTraitName,
} from "../utils/forwardChaining";

// Animated count-up component
function AnimatedNumber({ value, duration = 300 }) {
	const [displayValue, setDisplayValue] = useState(0);
	const prevValueRef = useRef(0);

	useEffect(() => {
		const startValue = prevValueRef.current;
		const endValue = value;
		const startTime = performance.now();

		const animate = (currentTime) => {
			const elapsed = currentTime - startTime;
			const progress = Math.min(elapsed / duration, 1);

			// Easing function for smooth animation
			const easeOutQuad = (t) => t * (2 - t);
			const easedProgress = easeOutQuad(progress);

			const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
			setDisplayValue(currentValue);

			if (progress < 1) {
				requestAnimationFrame(animate);
			} else {
				prevValueRef.current = endValue;
			}
		};

		requestAnimationFrame(animate);
	}, [value, duration]);

	return <span>{displayValue}</span>;
}

// gaya-gaya dimigrasikan ke utilitas Tailwind dalam JSX; import Results.css dihapus

function Results() {
	const location = useLocation();
	const navigate = useNavigate();
	const ctx = useContext(TestContext);
	const [result, setResult] = useState(null);
	const [showAnimation, setShowAnimation] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);
	const [expandedStepId, setExpandedStepId] = useState(null);

	const resultRef = useRef(null);
	const stepIntervalRef = useRef(null);
	const stepsContainerRef = useRef(null);

	const handleRetakeTest = () => {
		// Atur ulang status tes sebelum navigasi
		if (ctx && ctx.resetTest) {
			ctx.resetTest();
		}
		navigate("/test");
	};

	const handleBackToHome = () => {
		// Atur ulang status tes sebelum navigasi
		if (ctx && ctx.resetTest) {
			ctx.resetTest();
		}
		navigate("/");
	};

	// Langkah-langkah terlihat yang diturunkan digunakan oleh efek dan render
	const visibleSteps = result?.processingSteps
		? result.processingSteps.slice(0, currentStep)
		: [];

	// Running totals untuk animasi count-up per dimensi
	const runningTotals = useMemo(() => {
		const totals = {
			E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0
		};
		for (const step of visibleSteps) {
			if (step.scoredTrait && step.weight) {
				totals[step.scoredTrait] = (totals[step.scoredTrait] || 0) + step.weight;
			}
		}
		return totals;
	}, [visibleSteps]);

	// Perbarui ref dengan hasil terbaru agar startAnimation tetap stabil
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

		// hapus interval yang ada untuk menghindari penumpukan
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
					// selesai
					if (stepIntervalRef.current) {
						clearInterval(stepIntervalRef.current);
						stepIntervalRef.current = null;
					}
					setIsAnimating(false);
					return prev;
				}
			});
		}, 220); // Tampilkan setiap langkah selama 220ms (ritme lembut)
	}, []);

	// bersihkan interval saat unmount
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

	// Auto-scroll steps container to bottom when new steps appear
	useEffect(() => {
		if (stepsContainerRef.current && visibleSteps.length > 0) {
			stepsContainerRef.current.scrollTo({
				top: stepsContainerRef.current.scrollHeight,
				behavior: 'smooth'
			});
		}
	}, [visibleSteps.length]);

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
		<div className="bg-gradient-to-br from-blue-900 to-blue-600 p-3 sm:p-4 md:p-8 min-h-screen">
			<div className="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.3)] mx-auto p-4 sm:p-6 md:p-8 rounded-2xl w-full max-w-5xl">
				{/* Results Header */}
				<Card className="mb-4 sm:mb-6">
					<CardHeader className="flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-8">
						<h1 className="font-bold text-blue-900 text-2xl sm:text-3xl md:text-4xl text-center">
							Hasil Tes Kepribadian
						</h1>
					</CardHeader>
				</Card>

				{/* MBTI Type Display (gradient banner) */}
				<div className="mb-4 sm:mb-6">
					<div className="bg-gradient-to-br from-blue-900 to-blue-500 p-4 sm:p-6 rounded-2xl">
						<div className="flex flex-col items-center">
							<div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
								{result.mbtiType.split("").map((letter, i) => (
									<motion.div
										key={`letter-${i}`}
										custom={i}
										initial={{ scale: 0, rotate: -10, opacity: 0 }}
										animate={{
											scale: [0, 1.12, 1],
											rotate: [-10, 8, -4, 0],
											opacity: 1
										}}
										transition={{
											delay: i * 0.15,
											duration: 0.6,
											ease: "easeOut"
										}}
										whileHover={{ scale: 1.06, y: -6 }}
										className="flex justify-center items-center bg-white shadow-md rounded-lg w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 font-bold text-blue-900 text-xl sm:text-2xl md:text-4xl cursor-default select-none"
									>
										{letter}
									</motion.div>
								))}
							</div>
							<h2 className="font-semibold text-white text-lg sm:text-xl md:text-2xl text-center">
								{personality.name}
							</h2>
						</div>
					</div>

					{/* Forward Chaining Animation */}
					{showAnimation && (
						<Card className="bg-blue-50 mt-3 sm:mt-5 mb-4 sm:mb-6 border-2 border-blue-900">
							<CardBody className="p-3 sm:p-6">
								<div className="flex sm:flex-row flex-col justify-between items-start sm:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
									<h2 className="font-bold text-blue-900 text-base sm:text-lg md:text-xl">
										🔄 Simulasi Forward Chaining
									</h2>
									<Button
										size="sm"
										color="primary"
										onPress={() => {
											// gracefully stop and restart
											stopAnimation();
											setShowAnimation(false);
											setTimeout(() => startAnimation(), 120);
										}}
										isDisabled={isAnimating}
										className="whitespace-nowrap"
									>
										Ulangi Animasi
									</Button>
								</div>
								<p className="mb-3 sm:mb-4 text-gray-600 text-sm sm:text-base">
									Sistem menganalisis jawaban Anda menggunakan metode forward
									chaining...
								</p>
								{/* Animated Running Totals per Dimensi */}
								<div className="gap-2 sm:gap-3 grid grid-cols-2 md:grid-cols-4 mb-4">
									{/* E/I Dimension */}
									<motion.div
										className="bg-gradient-to-br from-purple-100 to-purple-50 p-2 sm:p-3 border border-purple-200 rounded-lg"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3 }}
									>
										<div className="mb-1 font-semibold text-purple-800 text-xs text-center">E/I</div>
										<div className="flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
											<div className={`flex flex-col items-center ${runningTotals.E >= runningTotals.I ? 'text-purple-700 font-bold' : 'text-gray-500'}`}>
												<span>E</span>
												<motion.span
													key={runningTotals.E}
													initial={{ scale: 1.3, color: '#7c3aed' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.E} />
												</motion.span>
											</div>
											<span className="text-gray-400">|</span>
											<div className={`flex flex-col items-center ${runningTotals.I > runningTotals.E ? 'text-purple-700 font-bold' : 'text-gray-500'}`}>
												<span>I</span>
												<motion.span
													key={runningTotals.I}
													initial={{ scale: 1.3, color: '#7c3aed' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.I} />
												</motion.span>
											</div>
										</div>
									</motion.div>

									{/* S/N Dimension */}
									<motion.div
										className="bg-gradient-to-br from-green-100 to-green-50 p-2 sm:p-3 border border-green-200 rounded-lg"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.05 }}
									>
										<div className="mb-1 font-semibold text-green-800 text-xs text-center">S/N</div>
										<div className="flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
											<div className={`flex flex-col items-center ${runningTotals.S >= runningTotals.N ? 'text-green-700 font-bold' : 'text-gray-500'}`}>
												<span>S</span>
												<motion.span
													key={runningTotals.S}
													initial={{ scale: 1.3, color: '#16a34a' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.S} />
												</motion.span>
											</div>
											<span className="text-gray-400">|</span>
											<div className={`flex flex-col items-center ${runningTotals.N > runningTotals.S ? 'text-green-700 font-bold' : 'text-gray-500'}`}>
												<span>N</span>
												<motion.span
													key={runningTotals.N}
													initial={{ scale: 1.3, color: '#16a34a' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.N} />
												</motion.span>
											</div>
										</div>
									</motion.div>

									{/* T/F Dimension */}
									<motion.div
										className="bg-gradient-to-br from-orange-100 to-orange-50 p-2 sm:p-3 border border-orange-200 rounded-lg"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.1 }}
									>
										<div className="mb-1 font-semibold text-orange-800 text-xs text-center">T/F</div>
										<div className="flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
											<div className={`flex flex-col items-center ${runningTotals.T >= runningTotals.F ? 'text-orange-700 font-bold' : 'text-gray-500'}`}>
												<span>T</span>
												<motion.span
													key={runningTotals.T}
													initial={{ scale: 1.3, color: '#ea580c' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.T} />
												</motion.span>
											</div>
											<span className="text-gray-400">|</span>
											<div className={`flex flex-col items-center ${runningTotals.F > runningTotals.T ? 'text-orange-700 font-bold' : 'text-gray-500'}`}>
												<span>F</span>
												<motion.span
													key={runningTotals.F}
													initial={{ scale: 1.3, color: '#ea580c' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.F} />
												</motion.span>
											</div>
										</div>
									</motion.div>

									{/* J/P Dimension */}
									<motion.div
										className="bg-gradient-to-br from-blue-100 to-blue-50 p-2 sm:p-3 border border-blue-200 rounded-lg"
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ duration: 0.3, delay: 0.15 }}
									>
										<div className="mb-1 font-semibold text-blue-800 text-xs text-center">J/P</div>
										<div className="flex justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
											<div className={`flex flex-col items-center ${runningTotals.J >= runningTotals.P ? 'text-blue-700 font-bold' : 'text-gray-500'}`}>
												<span>J</span>
												<motion.span
													key={runningTotals.J}
													initial={{ scale: 1.3, color: '#2563eb' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.J} />
												</motion.span>
											</div>
											<span className="text-gray-400">|</span>
											<div className={`flex flex-col items-center ${runningTotals.P > runningTotals.J ? 'text-blue-700 font-bold' : 'text-gray-500'}`}>
												<span>P</span>
												<motion.span
													key={runningTotals.P}
													initial={{ scale: 1.3, color: '#2563eb' }}
													animate={{ scale: 1 }}
													transition={{ duration: 0.2 }}
													className="font-bold text-base sm:text-lg"
												>
													<AnimatedNumber value={runningTotals.P} />
												</motion.span>
											</div>
										</div>
									</motion.div>
								</div>
								<div
									ref={stepsContainerRef}
									className="space-y-1 sm:space-y-2 max-h-80 sm:max-h-96 overflow-y-auto"
								>
									{visibleSteps.map((step, idx) => (
										<motion.button
											key={`step-${step.questionId}`}
											layout
											custom={idx}
											initial={{ opacity: 0, y: 8 }}
											animate={stepsControls}
											className="bg-white shadow-sm rounded-lg w-full overflow-hidden text-left"
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
											<div className="flex flex-wrap items-center gap-1 sm:gap-2 p-2 sm:p-3 cursor-pointer">
												<Chip color="primary" variant="solid" size="sm" className="text-xs">
													Q{step.questionId}
												</Chip>
												<span className="flex-1 min-w-max text-gray-600 text-xs sm:text-sm">
													{getDimensionName(step.dimension)}
												</span>
												<span className="font-bold text-blue-600">→</span>
												<Chip color="primary" variant="flat" size="sm" className="text-xs">
													{getTraitName(step.scoredTrait)}
												</Chip>
												<Chip color="success" variant="solid" size="sm" className="text-xs">
													+{step.weight}
												</Chip>
											</div>
											{expandedStepId === step.questionId && (
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													className="px-2 sm:px-4 pb-2 sm:pb-3 border-t text-gray-700 text-xs sm:text-sm"
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
									<div className="bg-green-100 mt-3 sm:mt-4 p-3 sm:p-4 border-2 border-green-500 rounded-lg animate-fadeIn">
										<p className="font-semibold text-green-800 text-xs sm:text-sm text-center">
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
						<div className="flex justify-center my-4 sm:my-6">
							<Button
								color="primary"
								size="lg"
								onPress={() => {
									stopAnimation();
									startAnimation();
								}}
								className="shadow-lg text-sm sm:text-base"
							>
								🔄 Lihat Simulasi Forward Chaining
							</Button>
						</div>
					)}

					{/* Personality Description */}
					<Card className="mb-4 sm:mb-6">
						<CardBody className="p-4 sm:p-6">
							<h3 className="mb-3 sm:mb-4 font-bold text-blue-900 text-lg sm:text-xl">
								Deskripsi Kepribadian
							</h3>
							<p className="text-gray-700 text-sm sm:text-base leading-relaxed">
								{personality.description}
							</p>
						</CardBody>
					</Card>

					{/* Personality Details */}
					<div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
						<Card>
							<CardBody className="p-4 sm:p-6">
								<h3 className="mb-2 sm:mb-3 font-bold text-blue-900 text-base sm:text-lg">
									👥 Pandangan Terhadap Orang Lain
								</h3>
								<p className="text-gray-700 text-sm sm:text-base leading-relaxed">
									{personality.viewOfOthers}
								</p>
							</CardBody>
						</Card>

						<Card>
							<CardBody className="p-4 sm:p-6">
								<h3 className="mb-2 sm:mb-3 font-bold text-blue-900 text-base sm:text-lg">
									💼 Pilihan Karir
								</h3>
								<p className="text-gray-700 text-sm sm:text-base leading-relaxed">
									{personality.careerPath}
								</p>
							</CardBody>
						</Card>

						<Card>
							<CardBody className="p-4 sm:p-6">
								<h3 className="mb-2 sm:mb-3 font-bold text-blue-900 text-base sm:text-lg">
									🎯 Cara Pengambilan Keputusan
								</h3>
								<p className="text-gray-700 text-sm sm:text-base leading-relaxed">
									{personality.decisionMaking}
								</p>
							</CardBody>
						</Card>
					</div>

					{/* Dimensions Analysis */}
					<Card className="mb-4 sm:mb-6">
						<CardBody className="p-4 sm:p-6">
							<h3 className="mb-4 sm:mb-6 font-bold text-blue-900 text-lg sm:text-xl text-center">
								Analisis Dimensi Kepribadian
							</h3>

							<div className="space-y-4 sm:space-y-6">
								{Object.entries(result.confidence).map(([dimension, data]) => (
									<div key={dimension}>
										<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 mb-2 sm:mb-3">
											<h4 className="font-semibold text-gray-800 text-sm sm:text-base">
												{getDimensionName(dimension)}
											</h4>
											<Chip color="primary" variant="solid" size="sm">
												{getTraitName(data.trait)}
											</Chip>
										</div>

										{/* Rich progress bar + label + trait badge */}
										<div className="mb-2 sm:mb-3">
											<div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-2 mb-2">
												<div className="flex flex-wrap items-center gap-2 sm:gap-3">
													<h4 className="font-semibold text-gray-800 text-xs sm:text-sm">
														{getDimensionName(dimension)}
													</h4>
													<span className="inline-flex items-center bg-gradient-to-r from-blue-900 to-blue-500 shadow-sm px-2 sm:px-3 py-1 rounded-full font-semibold text-white text-xs">
														{getTraitName(data.trait)}
													</span>
												</div>
												<div className="font-medium text-gray-700 text-xs sm:text-sm">
													{data.percentage}%
												</div>
											</div>

											<div
												className="bg-gray-200 mb-2 sm:mb-3 rounded-full w-full h-3 sm:h-4 overflow-hidden"
												aria-hidden
											>
												<motion.div
													className="bg-gradient-to-r from-blue-900 to-blue-500 h-full"
													initial={{ width: 0 }}
													animate={{ width: `${data.percentage}%` }}
													transition={{ duration: 1, ease: "easeOut" }}
												/>
											</div>

											<div className="flex sm:flex-row flex-col gap-2 sm:gap-4 text-xs sm:text-sm">
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
					<Card className="mb-4 sm:mb-6">
						<CardBody className="p-4 sm:p-6">
							<h3 className="mb-3 sm:mb-4 font-bold text-blue-900 text-lg sm:text-xl">
								Karakteristik Utama
							</h3>
							<div className="gap-2 sm:gap-3 grid grid-cols-1 sm:grid-cols-2">
								{personality.traits.map((trait) => (
									<div
										key={trait}
										className="flex items-center gap-2 bg-gray-50 p-2 sm:p-3 rounded-lg text-sm sm:text-base"
									>
										<span className="font-bold text-green-600 text-lg">✓</span>
										<span className="text-gray-800">{trait}</span>
									</div>
								))}
							</div>
						</CardBody>
					</Card>

					{/* Actions */}
					<div className="flex sm:flex-row flex-col justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
						<Button
							onPress={handleRetakeTest}
							color="primary"
							variant="bordered"
							size="lg"
							className="w-full sm:w-auto text-sm sm:text-base"
						>
							Ulangi Tes
						</Button>
						<Button
							onPress={handleBackToHome}
							color="primary"
							size="lg"
							className="w-full sm:w-auto text-sm sm:text-base"
						>
							Kembali ke Beranda
						</Button>
					</div>

					{/* Method Explanation */}
					<Card className="bg-yellow-50 border-2 border-yellow-400">
						<CardBody className="p-4 sm:p-6">
							<h3 className="mb-3 sm:mb-4 font-bold text-yellow-900 text-lg sm:text-xl">
								Tentang Metode Forward Chaining
							</h3>
							<p className="mb-3 sm:mb-4 text-yellow-800 text-sm sm:text-base leading-relaxed">
								Forward chaining adalah metode penalaran yang bekerja dari data
								menuju kesimpulan. Dalam sistem ini:
							</p>
							<ol className="space-y-2 text-yellow-800 text-xs sm:text-sm list-decimal list-inside">
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
