import React, { useState } from "react";
import questions from "./questions";

const subjectIslands = {
  mathematics: { name: "Number Island", icon: "📊", color: "from-blue-400 to-blue-600" },
  science: { name: "Discovery Isle", icon: "🔬", color: "from-green-400 to-green-600" },
  english: { name: "Story Atoll", icon: "📚", color: "from-purple-400 to-purple-600" },
  // Add more subject mappings as needed
};

export default function QuizIsland({ onXP, unlockedEmojis }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];
  if (!q) return <div className="p-6 text-center">All quiz questions completed! 🏝️</div>;

  const subject = subjectIslands[q.subject] || { name: q.subject, icon: "🏝️", color: "from-gray-300 to-gray-500" };

  function handleAnswer(option) {
    setSelected(option);
    const correct = option === q.answer;
    setShowResult(true);
    if (correct) {
      setScore((s) => s + q.xp);
      if (onXP) onXP(q.xp, q.reward);
    }
    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      setCurrent((c) => c + 1);
    }, 1600);
  }

  return (
    <div className={`max-w-lg mx-auto rounded-3xl shadow-2xl p-8 my-8 bg-gradient-to-br ${subject.color} text-white`}>
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{subject.icon}</span>
        <h2 className="text-2xl font-bold">
          {subject.name} Quiz
        </h2>
      </div>
      <div className="bg-white/30 rounded-2xl p-6 mb-4 text-gray-800">
        <div className="text-lg font-bold mb-2">
          Q{current + 1}: {q.question}
        </div>
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
              disabled={showResult}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
        {showResult && (
          <div className="text-center mt-4 text-lg font-bold">
            {selected === q.answer ? (
              <span className="text-green-700">
                🎉 Correct! +{q.xp} XP {q.reward || ""}
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