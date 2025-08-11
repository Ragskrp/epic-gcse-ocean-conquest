const questions = [
  // Mathematics
  {
    id: 101,
    subject: "mathematics",
    topic: "Algebra",
    question: "What is the solution to 2x + 3 = 7?",
    options: ["x=2", "x=3", "x=1", "x=4"],
    answer: "x=2",
    xp: 25
  },
  {
    id: 102,
    subject: "mathematics",
    topic: "Geometry",
    question: "What is the sum of the angles in a triangle?",
    options: ["90°", "180°", "270°", "360°"],
    answer: "180°",
    xp: 20
  },
  // Science
  {
    id: 201,
    subject: "science",
    topic: "Cell Biology",
    question: "What is the powerhouse of the cell?",
    options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi body"],
    answer: "Mitochondria",
    xp: 25
  },
  {
    id: 202,
    subject: "science",
    topic: "Chemistry",
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Gd", "Ge"],
    answer: "Au",
    xp: 20
  },
  // English
  {
    id: 301,
    subject: "english",
    topic: "Literature",
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "George Orwell"],
    answer: "William Shakespeare",
    xp: 15
  },
  {
    id: 302,
    subject: "english",
    topic: "Language",
    question: "Which is a metaphor?",
    options: ["He ran fast.", "She is a shining star.", "It is raining.", "They played chess."],
    answer: "She is a shining star.",
    xp: 15
  },
  // Computer Science
  {
    id: 401,
    subject: "computerscience",
    topic: "Programming",
    question: "Which language is primarily used for web development?",
    options: ["Python", "Java", "HTML", "C++"],
    answer: "HTML",
    xp: 20
  },
  {
    id: 402,
    subject: "computerscience",
    topic: "Algorithms",
    question: "What does 'loop' mean in programming?",
    options: [
      "A repeated sequence of instructions",
      "A way to store data",
      "A math operation",
      "A bug in code"
    ],
    answer: "A repeated sequence of instructions",
    xp: 20
  },
  // Business
  {
    id: 501,
    subject: "business",
    topic: "Finance",
    question: "What does ROI stand for?",
    options: ["Rate of Interest", "Return on Investment", "Revenue on Input", "Risk of Investment"],
    answer: "Return on Investment",
    xp: 20
  },
  {
    id: 502,
    subject: "business",
    topic: "Marketing",
    question: "Which is a part of the marketing mix?",
    options: ["Product", "Profit", "Portfolio", "Plan"],
    answer: "Product",
    xp: 20
  },
  // French
  {
    id: 601,
    subject: "french",
    topic: "Grammar",
    question: "What is the French word for 'cat'?",
    options: ["chien", "chat", "cheval", "chouette"],
    answer: "chat",
    xp: 10
  },
  {
    id: 602,
    subject: "french",
    topic: "Vocabulary",
    question: "How do you say 'thank you' in French?",
    options: ["Bonjour", "Merci", "Pardon", "S'il vous plaît"],
    answer: "Merci",
    xp: 10
  }
];

export default questions;