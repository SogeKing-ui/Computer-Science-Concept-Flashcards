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
    .replace(/[^\w\s]|_/g, "")
    .replace(/\s+/g, " ");
}

function isGuessCorrect(guess, answer) {
  const g = normalize(guess);
  const a = normalize(answer);

  if (!g) return false;
  if (g === a) return true;
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
  const defaultOrder = useMemo(() => cards.map((_, i) => i), []);
  const [order, setOrder] = useState(defaultOrder);

  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // mastered stores indices of cards that are mastered
  const [mastered, setMastered] = useState([]);

  const resetPerCard = () => {
    setFlipped(false);
    setGuess("");
    setFeedback(null);
  };

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleSubmit = () => {
    const currentIndex = order[pos];
    const currentCard = cards[currentIndex];

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
    // Only shuffle non-mastered cards (so mastered stay removed)
    const remaining = defaultOrder.filter((i) => !mastered.includes(i));
    const newOrder = shuffleArray(remaining);

    setOrder(newOrder);
    setPos(0);
    resetPerCard();
    setCurrentStreak(0);
  };

  const handleMaster = () => {
    if (order.length === 0) return;

    const currentIndex = order[pos];

    // add to mastered if not already there
    setMastered((prev) => (prev.includes(currentIndex) ? prev : [...prev, currentIndex]));

    // remove from current order (pool)
    const newOrder = order.filter((i) => i !== currentIndex);

    setOrder(newOrder);

    // adjust pos so we stay in bounds
    // if we removed the last card, move pos back one
    setPos((prevPos) => {
      const nextPos = prevPos >= newOrder.length ? Math.max(0, newOrder.length - 1) : prevPos;
      return nextPos;
    });

    // reset UI for next card
    resetPerCard();
    setCurrentStreak(0);
  };

  // If no cards left, show a finished state
  if (order.length === 0) {
    return (
      <div className="App">
        <header className="header">
          <p className="student-name">Jehu Emilcar | Z23568962</p>
          <h1>CS Concepts Flashcards</h1>
          <p className="desc">You mastered all cards 🎉</p>
          <div className="streaks">
            <span>🏆 Longest streak: {longestStreak}</span>
          </div>
          <p className="count">Mastered: {mastered.length}</p>
        </header>

        <main className="main">
          <button
            className="reset-btn"
            onClick={() => {
              setMastered([]);
              setOrder(defaultOrder);
              setPos(0);
              resetPerCard();
              setCurrentStreak(0);
              setLongestStreak(0);
            }}
          >
            Reset Deck
          </button>

          <div className="mastered-list">
            <h3>Mastered Cards</h3>
            <ul>
              {mastered.map((idx) => (
                <li key={idx}>
                  <strong>{cards[idx].category}:</strong> {cards[idx].question}
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    );
  }

  const currentIndex = order[pos];
  const currentCard = cards[currentIndex];

  return (
    <div className="App">
      <header className="header">
        <p className="student-name">Jehu Emilcar | Z23568962</p>
        <h1>CS Concepts Flashcards</h1>

        <p className="desc">Type your guess before flipping the card.</p>

        <div className="top-row">
          <p className="count">
            Card {pos + 1} of {order.length} (Remaining)
          </p>

          <button className="shuffle-btn" onClick={handleShuffle}>
            Shuffle
          </button>
        </div>

        <div className="streaks">
          <span>🔥 Current streak: {currentStreak}</span>
          <span>🏆 Longest streak: {longestStreak}</span>
          <span>✅ Mastered: {mastered.length}</span>
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
            onChange={(e) => {
              setGuess(e.target.value);
              setFeedback(null);
            }}
          />
          <button onClick={handleSubmit} disabled={!guess.trim()}>
            Submit
          </button>
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

        <button className="master-btn" onClick={handleMaster}>
          Mark as Mastered
        </button>

        <div className="mastered-list">
          <h3>Mastered Cards</h3>
          {mastered.length === 0 ? (
            <p className="hint">No mastered cards yet.</p>
          ) : (
            <ul>
              {mastered.map((idx) => (
                <li key={idx}>
                  <strong>{cards[idx].category}:</strong> {cards[idx].question}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}





