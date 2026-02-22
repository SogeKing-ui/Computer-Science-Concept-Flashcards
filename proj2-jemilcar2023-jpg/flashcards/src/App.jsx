import { useState } from "react";
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

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState(null); // "correct" | "wrong" | null

  const currentCard = cards[currentIndex];

  const handleFlip = () => setFlipped((prev) => !prev);

  const handleSubmit = () => {
    if (
      guess.trim().toLowerCase() ===
      currentCard.answer.trim().toLowerCase()
    ) {
      setFeedback("correct");
    } else {
      setFeedback("wrong");
    }
  };

  const goNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex((i) => i + 1);
      resetState();
    }
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      resetState();
    }
  };

  const resetState = () => {
    setFlipped(false);
    setGuess("");
    setFeedback(null);
  };

  return (
    <div className="App">
      <header className="header">
        <p className="student-name">Jehu Emilcar | Z23568962</p>
        <h1>CS Concepts Flashcards</h1>
        <p className="desc">
          Type your guess before flipping the card.
        </p>
        <p className="count">Card {currentIndex + 1} of {cards.length}</p>
      </header>

      <main className="main">
        <Flashcard
          question={currentCard.question}
          answer={currentCard.answer}
          category={currentCard.category}
          image={currentCard.image}
          flipped={flipped}
          onFlip={handleFlip}
        />

        {/* INPUT AREA */}
        <div className="guess-area">
          <input
            type="text"
            placeholder="Enter your guess..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          <button onClick={handleSubmit}>Submit</button>
        </div>

        {feedback === "correct" && (
          <p className="correct">✅ Correct!</p>
        )}
        {feedback === "wrong" && (
          <p className="wrong">❌ Incorrect</p>
        )}

        {/* NAV BUTTONS */}
        <div className="nav-buttons">
          <button onClick={goBack} disabled={currentIndex === 0}>
            Back
          </button>

          <button
            onClick={goNext}
            disabled={currentIndex === cards.length - 1}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}





