import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useParams } from "react-router-dom";
import UseGetTest from "../../Hooks/useGetTests";
import ProfileNavbar from "../profile/Navbar/ProfileNavbar";
import { instance } from "../../Hooks/api";
import Certificate from "../profile/AdminDoshboard/AdminLessons/Certificate";

ChartJS.register(ArcElement, Tooltip, Legend);

const QuizUser = () => {
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(2);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0); // 0-dan boshlanadi

  const { nomi, dasrnomi } = useParams();
  const { getTest, getQuizzes: quizzes } = UseGetTest();

  // Testlarni yuklash
  useEffect(() => {
    getTest(nomi, dasrnomi); // API orqali testlarni olib keladi
  }, [nomi, dasrnomi]);

  const handleAnswerChange = (selectedVariantId) => {
    setUserAnswers((prev) => ({
      ...prev,
      [quizzes[currentQuizIndex]?.id]: selectedVariantId,
    }));
  };

  const finish = JSON.parse(localStorage.getItem("finish"));

  const handleNextQuiz = () => {
    if (!userAnswers[quizzes[currentQuizIndex]?.id]) {
      alert("Iltimos, savolga javob bering!");
      return;
    }
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  // Javoblarni backendga yuborish va natijani qaytarish
  const handleSubmit = async () => {
    try {
      const response = await instance.post(
        `/api/test/${nomi}/${dasrnomi}/check-answers`,
        { answers: userAnswers }
      );
      setScore(response.data.correctAnswers);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting quiz answers:", err);
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setAttemptsLeft((prev) => prev - 1);
    setCurrentQuizIndex(0);
  };

  const correctPercentage = quizzes.length
    ? Math.floor((score / quizzes.length) * 100)
    : 0;

  const chartData = {
    labels: ["To'g'ri", "Noto'g'ri"],
    datasets: [
      {
        data: [score, quizzes.length - score],
        backgroundColor: ["#4CAF50", "#FF5252"],
        hoverBackgroundColor: ["#45A049", "#FF1744"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <ProfileNavbar />
      <h1 className="text-2xl font-bold text-gray-700 mb-4"> Fan: {nomi}</h1>
      <h1 className="text-2xl font-bold text-gray-700 mb-8">
        Dars: {dasrnomi}
      </h1>

      {quizzes.length === 0 ? (
        <p className="text-gray-700 text-xl">Savollar yuklanmoqda...</p>
      ) : isSubmitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Natija: {score} / {quizzes.length} ({correctPercentage}%)
          </h2>
          <div className="w-1/2 mx-auto mb-6">
            <Pie data={chartData} />
          </div>
          {attemptsLeft > 0 ? (
            <button
              onClick={handleRetry}
              className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
            >
              Qayta urinib ko'ring (Qolgan imkoniyatlar: {attemptsLeft})
            </button>
          ) : (
            <h3 className="text-lg font-semibold text-red-500">
              Testni yechish imkoniyati tugadi.
            </h3>
          )}
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="bg-gray-100 border p-4 rounded-lg shadow mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Savol {currentQuizIndex + 1} / {quizzes.length}
            </h3>
            <h4 className="text-lg font-semibold mb-3 text-gray-700">
              {quizzes[currentQuizIndex]?.title}
            </h4>

            <ul className="list-none p-0">
              {quizzes[currentQuizIndex]?.variant?.map((v) => (
                <li key={v.id} className="flex items-center mb-4">
                  <input
                    type="radio"
                    id={`quiz-${quizzes[currentQuizIndex]?.id}-${v.id}`}
                    name={`quiz-${quizzes[currentQuizIndex]?.id}`}
                    value={v.id}
                    checked={
                      userAnswers[quizzes[currentQuizIndex]?.id] ===
                      v.id.toString()
                    }
                    onChange={() => handleAnswerChange(v.id.toString())}
                    className="w-4 h-4 text-green-500 focus:ring-green-500 border-gray-300 rounded-full transition duration-200 mr-3"
                  />
                  <label
                    htmlFor={`quiz-${quizzes[currentQuizIndex]?.id}-${v.id}`}
                    className="text-gray-700 cursor-pointer"
                  >
                    {v.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleNextQuiz}
            disabled={!userAnswers[quizzes[currentQuizIndex]?.id]}
            className={`bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition mt-6 ${
              !userAnswers[quizzes[currentQuizIndex]?.id]
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Keyingisiga o'tish
          </button>
        </div>
      )}
      {/* {
        finish && correctPercentage >= 70 ? <Certificate correctPercentage={correctPercentage} fannomi={nomi} /> : ""
      } */}
      {finish ? (
        <Certificate correctPercentage={correctPercentage} fannomi={nomi} />
      ) : (
        ""
      )}
    </div>
  );
};

export default QuizUser;