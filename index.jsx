import React, { useState, useEffect } from 'react';
import questions from './questions'; // Import your questions

const MoanaGCSEAdventure = () => {
  // ...other state
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [quizFeedback, setQuizFeedback] = useState('');
  
  // When entering quiz mode, get a random unanswered question
  const startQuiz = () => {
    const unanswered = questions.filter(q => !answeredQuestions.includes(q.id));
    if (unanswered.length === 0) {
      setQuizFeedback('All questions answered!');
      setCurrentQuestion(null);
      return;
    }
    setCurrentQuestion(unanswered[Math.floor(Math.random() * unanswered.length)]);
    setQuizMode(true);
    setQuizFeedback('');
  };

  // Handle answer selection
  const answerQuestion = (selectedOption) => {
    if (!currentQuestion) return;
    const correct = selectedOption === currentQuestion.answer;
    setQuizFeedback(correct ? 'Correct! XP awarded.' : 'Incorrect, try again next time!');
    if (correct) {
      setTotalXP(prev => prev + currentQuestion.xp);
      setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
      // Optionally: trigger reward logic here
    }
    setTimeout(() => {
      startQuiz(); // Show next question
    }, 1500);
  };

  // ...rest of your code

  return (
    <div>
      {/* ...rest of your UI */}
      <button onClick={startQuiz}>Take Quiz!</button>
      {quizMode && currentQuestion && (
        <div>
          <h2>{currentQuestion.question}</h2>
          {currentQuestion.options.map(option => (
            <button key={option} onClick={() => answerQuestion(option)}>{option}</button>
          ))}
          <div>{quizFeedback}</div>
        </div>
      )}
    </div>
  );
};

export default MoanaGCSEAdventure;