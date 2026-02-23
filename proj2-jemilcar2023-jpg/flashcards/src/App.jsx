import { useMemo, useState } from "react";
import "./App.css";
import Flashcard from "./components/Flashcard";

const cards = [
  {
    question: "What is a state variable in React?",
    answer: "Data that can change over time and causes a re-render when updated.",
    category: "React",
    image: "/images/react.PNG",
  },
  {
    question: "What does useState return?",
    answer: "An array: [stateValue, setStateFunction].",
    category: "React",
    image: "/images/react.PNG",
  },
  {
    question: "What is an event handler?",
    answer: "A function that runs in response to an event (like onClick).",
    category: "JS",
    image: "/images/js.PNG",
  },
  {
    question: "What is JSX?",
    answer: "A syntax extension that lets you write HTML-like code in JavaScript for React.",
    category: "React",
    image: "/images/react.PNG",
  },
  {
    question: "What is CSS used for?",
    answer: "Styling the layout and appearance of a webpage or app.",
    category: "CSS",
    image: "/images/css.PNG",
  },
];

// --- helpers ---
function normalize(text) {
  return text
    .toLowerCase()
    .trim()
    // remove punctuation/symbols
    .replace(/[^\w\s]|_/g, "")
    // collapse spaces
    .replace(/\s+/g, " ");
}

function isGuessCorrect(guess, answer) {
  const g = normalize(guess);
  const a = normalize(answer);

  if (!g) return false;

  // exact match
  if (g === a) return true;

  // partial match: guess is contained in answer OR answer contained in guess
  // (lets “array” match “an array stateValue setStateFunction”, etc.)
  if (a.includes(g) || g.includes(a)) return true;

  return false;
}

function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function App() {
  // order is an array of indices into cards: [0,1,2,...] or shuffled
  const defaultOrder = useMemo(() => cards.map((_, i) => i), []);
  const [order, setOrder] = useState(defaultOrder);

  const [pos, setPos] = useState(0); // position inside order
  const [flipped, setFlipped] = useState(false);

  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  const currentIndex = order[pos];
  const currentCard = cards[currentIndex];

  const resetPerCard = () => {
    setFlipped(false);
    setGuess("");
    setFeedback(null);
  };

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleSubmit = () => {
    const correct = isGuessCorrect(guess, currentCard.answer);

    if (correct) {
      setFeedback("correct");
      setCurrentStreak((s) => {
        const next = s + 1;
        setLongestStreak((ls) => (next > ls ? next : ls));
        return next;
      });
    } else {
      setFeedback("wrong");
      setCurrentStreak(0);
    }
  };

  const goNext = () => {
    if (pos < order.length - 1) {
      setPos((p) => p + 1);
      resetPerCard();
    }
  };

  const goBack = () => {
    if (pos > 0) {
      setPos((p) => p - 1);
      resetPerCard();
    }
  };

  const handleShuffle = () => {
    // shuffle the order of indices
    const newOrder = shuffleArray(defaultOrder);
    setOrder(newOrder);
    setPos(0);
    resetPerCard();

    // optional: reset streak on shuffle (safer for grading)
    setCurrentStreak(0);
  };

  return (
    <div className="App">
      <header className="header">
        <p className="student-name">Jehu Emilcar | Z23568962</p>
        <h1>CS Concepts Flashcards</h1>

        <p className="desc">Type your guess before flipping the card.</p>

        <div className="top-row">
          <p className="count">
            Card {pos + 1} of {order.length}
          </p>

          <button className="shuffle-btn" onClick={handleShuffle}>
            Shuffle
          </button>
        </div>

        <div className="streaks">
          <span>🔥 Current streak: {currentStreak}</span>
          <span>🏆 Longest streak: {longestStreak}</span>
        </div>
      </header>

      <main className="main">
        <Flashcard
          question={currentCard.question}
          answer={currentCard.answer}
          category={currentCard.category}
          image={currentCard.image}
          flipped={flipped}
          onFlip={handleFlip}
          status={feedback}
        />

        <div className="guess-area">
          <input
            type="text"
            placeholder="Enter your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>

        {feedback === "correct" && <p className="correct">✅ Correct!</p>}
        {feedback === "wrong" && <p className="wrong">❌ Incorrect</p>}

        <div className="nav-buttons">
          <button onClick={goBack} disabled={pos === 0}>
            Back
          </button>
          <button onClick={goNext} disabled={pos === order.length - 1}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}





