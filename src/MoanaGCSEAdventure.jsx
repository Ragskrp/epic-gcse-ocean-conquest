import React, { useState, useEffect } from "react";
import QuizIsland from "./QuizIsland";
// import your icons and your themed UI here...

export default function MoanaGCSEAdventure() {
  // Core state
  const [showQuiz, setShowQuiz] = useState(false);
  const [totalXP, setTotalXP] = useState(() => Number(localStorage.getItem("totalXP")) || 0);
  const [unlockedEmojis, setUnlockedEmojis] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("unlockedEmojis")) || ["⭐", "🌊", "🚢"];
    } catch { return ["⭐", "🌊", "🚢"]; }
  });
  const [quizProgress, setQuizProgress] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("quizProgress")) || {};
    } catch { return {}; }
  });
  const [showReward, setShowReward] = useState(null);

  // XP/Emoji unlock logic
  function handleQuizXP(xp, emoji) {
    const newXP = totalXP + xp;
    setTotalXP(newXP);
    localStorage.setItem("totalXP", newXP);

    // Unlock emoji on XP milestones
    let reward = null;
    if (newXP >= 100 && !unlockedEmojis.includes("🏝️")) {
      setUnlockedEmojis([...unlockedEmojis, "🏝️"]);
      reward = "🏝️ Island unlocked!";
    }
    if (newXP >= 300 && !unlockedEmojis.includes("🏆")) {
      setUnlockedEmojis([...unlockedEmojis, "🏆"]);
      reward = "🏆 Champion of the Sea!";
    }
    if (emoji && !unlockedEmojis.includes(emoji)) {
      setUnlockedEmojis([...unlockedEmojis, emoji]);
      reward = `New emoji: ${emoji}`;
    }
    if (reward) {
      setShowReward(reward);
      setTimeout(() => setShowReward(null), 1800);
      localStorage.setItem("unlockedEmojis", JSON.stringify([...unlockedEmojis, emoji]));
    }
  }

  // Persist quiz progress
  useEffect(() => {
    localStorage.setItem("quizProgress", JSON.stringify(quizProgress));
  }, [quizProgress]);

  useEffect(() => {
    localStorage.setItem("unlockedEmojis", JSON.stringify(unlockedEmojis));
  }, [unlockedEmojis]);

  // Main UI
  return (
    <div>
      <div className="text-center my-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent mb-4">
          🌊 YOUR EPIC GCSE OCEAN CONQUEST! 🌊
        </h1>
        <button
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg hover:scale-105 transition-all"
          onClick={() => setShowQuiz(q => !q)}
        >
          {showQuiz ? "Return to Main Map 🗺️" : "Take Island Quiz 🏝️"}
        </button>
        <div className="mt-4 text-xl">
          XP: {totalXP} {unlockedEmojis.join(" ")}
        </div>
      </div>
      {showReward && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-yellow-300 text-black px-8 py-4 rounded-full shadow-xl z-50 animate-bounce font-bold">
          {showReward}
        </div>
      )}
      {showQuiz ? (
        <QuizIsland
          onXP={handleQuizXP}
          unlockedEmojis={unlockedEmojis}
          quizProgress={quizProgress}
          setQuizProgress={setQuizProgress}
        />
      ) : (
        <div>
          {/* Paste your main "island" themed dashboard here! */}
          <div className="text-center p-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-3">🏝️ Welcome to your adventure map!</h2>
            <p className="mb-4">
              Track your progress, choose your avatar, and unlock new islands as you learn!
            </p>
            {/* You can expand this with your actual UI */}
          </div>
        </div>
      )}
    </div>
  );
}