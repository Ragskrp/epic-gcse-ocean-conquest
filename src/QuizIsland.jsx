import React, { useState, useEffect } from "react";
import questions from "./questions";

const subjectInfo = {
  mathematics: { name: "Number Island", icon: "📊", color: "from-blue-400 to-blue-600" },
  english: { name: "Story Atoll", icon: "📚", color: "from-purple-400 to-purple-600" },
  science: { name: "Discovery Isle", icon: "🔬", color: "from-green-400 to-green-600" },
  computerscience: { name: "Tech Bay", icon: "💻", color: "from-cyan-400 to-cyan-600" },
  business: { name: "Trade Harbor", icon: "💼", color: "from-orange-400 to-orange-600" },
  french: { name: "Française Reef", icon: "🇫🇷", color: "from-pink-400 to-pink-600" }
};

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function QuizIsland({
  onXP,
  unlockedEmojis,
  quizProgress,
  setQuizProgress
}) {
  const [selectedSubject, setSelectedSubject] = useState("mathematics");
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const [timeOut, setTimeOut] = useState(false);

  // On subject change, pick relevant questions
  useEffect(() => {
    const filtered = shuffle(
      questions.filter(
        q => q.subject === selectedSubject &&
        !(quizProgress?.[selectedSubject]?.includes(q.id))
      )
    ).slice(0, 5); // up to 5 per quiz session
    setQuizQuestions(filtered);
    setCurrent(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setTimer(30);
    setTimeOut(false);
  }, [selectedSubject, quizProgress]);

  // Timer logic
  useEffect(() => {
    if (showResult || !quizQuestions[current]) return;
    if (timer <= 0) {
      setTimeOut(true);
      setShowResult(true);
      return;
    }
    const id = setTimeout(() => setTimer(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer, showResult, quizQuestions, current]);

  const q = quizQuestions[current];
  if (!q) {
    return (
      <div className="max-w-lg mx-auto rounded-3xl shadow-2xl p-8 my-8 bg-gradient-to-br from-green-200 to-teal-300 text-center text-xl">
        All available questions completed for {subjectInfo[selectedSubject].name}! 🏝️<br />
        <button
          className="mt-4 bg-blue-500 text-white rounded-lg px-6 py-2 font-bold"
          onClick={() => setSelectedSubject("mathematics")}
        >
          Try another Island
        </button>
      </div>
    );
  }

  function handleAnswer(option) {
    setSelected(option);
    setShowResult(true);
    setTimeOut(false);

    const correct = option === q.answer;
    if (correct && onXP) {
      onXP(q.xp, subjectInfo[q.subject].icon);
    }
    // update progress
    setQuizProgress(prev => {
      const newProg = { ...prev };
      newProg[selectedSubject] = [...(newProg[selectedSubject] || []), q.id];
      localStorage.setItem("quizProgress", JSON.stringify(newProg));
      return newProg;
    });
    setScore(s => s + (correct ? q.xp : 0));
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      setTimer(30);
      setCurrent(c => c + 1);
    }, 1600);
  }

  return (
    <div
      className={`max-w-lg mx-auto rounded-3xl shadow-2xl p-8 my-8 bg-gradient-to-br ${
        subjectInfo[selectedSubject].color
      } text-white`}
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{subjectInfo[selectedSubject].icon}</span>
        <h2 className="text-2xl font-bold">{subjectInfo[selectedSubject].name} Quiz</h2>
      </div>
      <div className="flex gap-2 mb-6">
        {Object.keys(subjectInfo).map(sub => (
          <button
            key={sub}
            className={`px-3 py-1 rounded-full text-md font-bold border-2 ${
              selectedSubject === sub
                ? "bg-white/50 border-white text-blue-900"
                : "bg-white/20 border-white/30 text-white"
            }`}
            onClick={() => setSelectedSubject(sub)}
          >
            {subjectInfo[sub].icon} {subjectInfo[sub].name.split(" ")[0]}
          </button>
        ))}
      </div>
      <div className="bg-white/30 rounded-2xl p-6 mb-4 text-gray-900">
        <div className="flex justify-between text-lg font-bold mb-2">
          <span>
            Q{current + 1}: {q.topic}
          </span>
          <span>
            <span className="text-blue-800">{timer}s</span>
          </span>
        </div>
        <div className="mb-4">{q.question}</div>
        <div className="grid grid-cols-1 gap-3">
          {q.options.map((opt, i) => (
            <button
              key={i}
              className={`rounded-xl p-3 font-semibold transition-all border-2
                ${
                  !showResult
                    ? "bg-white/80 hover:bg-blue-100 border-blue-200"
                    : opt === q.answer
                    ? "bg-green-200 border-green-500 text-green-900"
                    : selected === opt
                    ? "bg-red-200 border-red-500 text-red-900"
                    : "bg-white/60 border-gray-200"
                }
              `}
              disabled={showResult || timeOut}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="text-center mt-4 text-lg font-bold">
            {timeOut ? (
              <span className="text-red-700">
                ⏰ Time's up! The answer was <b>{q.answer}</b>
              </span>
            ) : selected === q.answer ? (
              <span className="text-green-700">
                🎉 Correct! +{q.xp} XP
              </span>
            ) : (
              <span className="text-red-700">
                ❌ Incorrect! The answer was <b>{q.answer}</b>
              </span>
            )}
          </div>
        )}
      </div>
      <div className="text-right text-white/80">
        Score: {score} XP {unlockedEmojis && unlockedEmojis.join(" ")}
      </div>
    </div>
  );
}