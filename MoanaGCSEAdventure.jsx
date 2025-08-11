import React, { useState } from "react";
import QuizIsland from "./QuizIsland";

// ... import your icons and other code from your existing file

export default function MoanaGCSEAdventure() {
  const [showQuiz, setShowQuiz] = useState(false);
  // ...all your previous states, e.g. XP, avatars, etc.
  const [totalXP, setTotalXP] = useState(0);
  const [unlockedEmojis, setUnlockedEmojis] = useState(["⭐", "🌊", "🚢"]);
  const [showReward, setShowReward] = useState(null);

  function handleQuizXP(xp, rewardEmoji) {
    setTotalXP((prev) => prev + xp);
    if (rewardEmoji && !unlockedEmojis.includes(rewardEmoji)) {
      setUnlockedEmojis((prev) => [...prev, rewardEmoji]);
      setShowReward(`Unlocked new emoji: ${rewardEmoji}`);
      setTimeout(() => setShowReward(null), 2000);
    }
  }

  return (
    <div>
      {/* ...your hero header, dashboard, and main quest UI as before... */}
      <div className="flex justify-center my-8">
        <button
          className="bg-gradient-to-r from-blue-500 to-teal-500 text-white font-bold py-3 px-8 rounded-full text-xl shadow-lg hover:scale-105 transition-all"
          onClick={() => setShowQuiz((q) => !q)}
        >
          {showQuiz ? "Return to Main Map 🗺️" : "Take Island Quiz 🏝️"}
        </button>
      </div>
      {showReward && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-yellow-300 text-black px-8 py-4 rounded-full shadow-xl z-50 animate-bounce font-bold">
          {showReward}
        </div>
      )}
      {showQuiz ? (
        <QuizIsland onXP={handleQuizXP} unlockedEmojis={unlockedEmojis} />
      ) : (
        // ...your main journey/tracker UI here
        <div>
          {/* Your main code from the previous "MoanaGCSEAdventure" UI */}
        </div>
      )}
    </div>
  );
}