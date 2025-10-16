import { Button } from "@heroui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TestContext from "../context/TestContext";
import { questions } from "../data/mbtiData";

function Test() {
	const navigate = useNavigate();
	// Use context (persistent to localStorage) when available
	const ctx = useContext(TestContext);

	const [localIndex, setLocalIndex] = useState(0);
	const [localAnswers, setLocalAnswers] = useState([]);
	const [localSelected, setLocalSelected] = useState(null);

	const currentQuestionIndex = ctx ? ctx.currentQuestionIndex : localIndex;
	const setCurrentQuestionIndex = ctx
		? ctx.setCurrentQuestionIndex
		: setLocalIndex;
	const answers = ctx ? ctx.answers : localAnswers;
	const setAnswers = ctx ? ctx.setAnswers : setLocalAnswers;
	const selectedRating = ctx ? ctx.selectedRating : localSelected;
	const setSelectedRating = ctx ? ctx.setSelectedRating : setLocalSelected;

	const currentQuestion = questions[currentQuestionIndex];
	const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

	const handleRatingSelect = (rating) => {
		setSelectedRating(rating);
	};

	const handleNext = () => {
		if (selectedRating === null) {
			alert("Silakan pilih salah satu nilai sebelum melanjutkan.");
			return;
		}

		const newAnswer = {
			questionId: currentQuestion.id,
			dimension: currentQuestion.dimension,
			trait: currentQuestion.trait,
			rating: selectedRating,
		};

		// Save or update answer at the current index
		const updatedAnswers = Array.isArray(answers) ? [...answers] : [];
		updatedAnswers[currentQuestionIndex] = newAnswer;
		setAnswers(updatedAnswers);

		if (currentQuestionIndex < questions.length - 1) {
			const nextIndex = currentQuestionIndex + 1;
			setCurrentQuestionIndex(nextIndex);
			// Prefill next question's rating if already answered
			setSelectedRating(updatedAnswers[nextIndex]?.rating ?? null);
		} else {
			// Navigate with the filled answers
			navigate("/results", { state: { answers: updatedAnswers } });
		}
	};

	const handlePrevious = () => {
		if (currentQuestionIndex > 0) {
			const prevIndex = currentQuestionIndex - 1;
			setCurrentQuestionIndex(prevIndex);
			// Restore previously saved rating for previous question if present
			setSelectedRating(answers[prevIndex]?.rating ?? null);
		}
	};

	// Keep selectedRating in sync with answers/currentQuestionIndex
	useEffect(() => {
		setSelectedRating(answers[currentQuestionIndex]?.rating ?? null);
	}, [currentQuestionIndex, answers]);

	const ratingLabels = [
		{ value: 1, label: "Sangat Tidak Setuju", shortLabel: "1" },
		{ value: 2, label: "Tidak Setuju", shortLabel: "2" },
		{ value: 3, label: "Netral", shortLabel: "3" },
		{ value: 4, label: "Setuju", shortLabel: "4" },
		{ value: 5, label: "Sangat Setuju", shortLabel: "5" },
	];

	const getButtonColorClasses = (value, isSelected) => {
		// Returns color classes for each rating level. When selected, use stronger colors.
		switch (value) {
			case 1:
				return isSelected
					? "bg-gradient-to-br from-red-600 to-red-400 text-white border-transparent"
					: "bg-red-50 text-red-700 border-red-100";
			case 2:
				return isSelected
					? "bg-gradient-to-br from-amber-600 to-amber-400 text-white border-transparent"
					: "bg-amber-50 text-amber-700 border-amber-100";
			case 3:
				return isSelected
					? "bg-gray-400 text-white border-transparent"
					: "bg-gray-100 text-gray-700 border-gray-200";
			case 4:
				return isSelected
					? "bg-gradient-to-br from-blue-700 to-blue-500 text-white border-transparent"
					: "bg-blue-50 text-blue-700 border-blue-100";
			case 5:
				return isSelected
					? "bg-gradient-to-br from-green-600 to-green-400 text-white border-transparent"
					: "bg-green-50 text-green-700 border-green-100";
			default:
				return isSelected
					? "bg-blue-500 text-white"
					: "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-gradient-to-br from-blue-900 to-blue-600 p-4 md:p-8 min-h-screen">
			<div className="mx-auto max-w-5xl">
				<div className="bg-white shadow-lg p-6 md:p-8 rounded-t-2xl">
					<h1 className="mb-4 font-bold text-blue-900 text-2xl md:text-3xl text-center">
						Tes Kepribadian MBTI
					</h1>
					<div className="bg-gray-200 mb-2 rounded-xl w-full h-3 overflow-hidden">
						<div
							className="bg-gradient-to-r from-blue-900 to-blue-500 rounded-xl h-full transition-all"
							style={{ width: `${progress}%` }}
						/>
					</div>
					<p className="text-gray-600 text-sm text-center">
						Pertanyaan {currentQuestionIndex + 1} dari {questions.length}
					</p>
				</div>

				<AnimatePresence mode="wait">
					<motion.div
						key={currentQuestionIndex}
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: -30 }}
						transition={{ duration: 0.35 }}
						className="bg-white shadow-lg mt-4 p-6 md:p-8 rounded-b-2xl"
					>
						<h2 className="mb-6 font-semibold text-gray-800 text-xl md:text-2xl text-center leading-snug">
							{currentQuestion.question}
						</h2>

						<div className="space-y-4">
							<div className="flex justify-between mb-2 text-gray-600 text-xs sm:text-sm">
								<span className="italic">Sangat Tidak Setuju</span>
								<span className="italic">Sangat Setuju</span>
							</div>

							<div className="gap-1 sm:gap-2 md:gap-3 grid grid-cols-5">
								{ratingLabels.map((item) => {
									const isSelected = selectedRating === item.value;
									const colorClasses = getButtonColorClasses(
										item.value,
										isSelected,
									);

									return (
										<button
											key={item.value}
											type="button"
											onClick={() => handleRatingSelect(item.value)}
											aria-pressed={isSelected}
											className={`flex flex-col items-center justify-center p-2 sm:p-3 md:p-4 rounded-xl min-h-[70px] sm:min-h-[80px] md:min-h-[100px] transition transform cursor-pointer border ${isSelected ? "scale-105 shadow-lg" : "hover:-translate-y-1 hover:shadow-md"} ${colorClasses}`}
										>
											<div className="font-medium text-xs sm:text-sm text-center">
												{item.shortLabel}
											</div>
											<div className="hidden sm:block mt-1 text-xs sm:text-sm text-center">
												{item.label}
											</div>
										</button>
									);
								})}
							</div>
						</div>
					</motion.div>
				</AnimatePresence>

				<div className="flex md:flex-row flex-col gap-3 mt-4">
					<Button
						onPress={handlePrevious}
						type="button"
						isDisabled={currentQuestionIndex === 0}
						color="default"
						className={`flex-1 py-3 rounded-full font-bold ${currentQuestionIndex === 0 ? "opacity-60" : ""}`}
					>
						← Sebelumnya
					</Button>

					<Button
						onPress={handleNext}
						type="button"
						color="primary"
						size="lg"
						className="flex-1 bg-gradient-to-r from-blue-900 to-blue-500 hover:shadow-lg py-3 rounded-full font-bold text-white"
					>
						{currentQuestionIndex === questions.length - 1
							? "Lihat Hasil"
							: "Selanjutnya →"}
					</Button>
				</div>

				<div className="bg-white/20 backdrop-blur-sm mt-4 p-3 rounded-lg text-center">
					<p className="text-white text-sm">
						<strong>Dimensi:</strong>{" "}
						{currentQuestion.dimension === "EI"
							? "Energy Direction"
							: currentQuestion.dimension === "SN"
								? "Information Processing"
								: currentQuestion.dimension === "TF"
									? "Decision Making"
									: "Lifestyle"}
					</p>
				</div>
			</div>
		</div>
	);
}

export default Test;
