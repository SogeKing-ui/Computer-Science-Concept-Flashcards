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

  {
  question: "What is CSS used for?",
  answer: "Styling and layout of web pages and apps.",
  category: "CSS",
  image: "/images/css.PNG"
},
{
  question: "What does a component return?",
  answer: "JSX that describes the UI.",
  category: "React",
  image: "/images/react.PNG"
},
{
  question: "What does onClick do in React?",
  answer: "Runs a function when an element is clicked.",
  category: "JS",
  image: "/images/js.PNG"
}

];



export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((prev) => !prev);

  const nextRandomCard = () => {
    let nextIndex = currentIndex;

    while (cards.length > 1 && nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * cards.length);
    }

    setCurrentIndex(nextIndex);
    setFlipped(false);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="App">
      <header className="header">
        <p className="student-name">Jehu Emilcar | Z23568962</p>
        <h1>CS Concepts Flashcards</h1>
        <p className="desc">
          Click a card to reveal the answer. Use “Next” for a random card.
        </p>
        <p className="count">Total cards: {cards.length}</p>
      </header>

      <main className="main">
        <Flashcard
          question={cards[currentIndex].question}
          answer={cards[currentIndex].answer}
          category={cards[currentIndex].category}
          image={cards[currentIndex].image}
          flipped={flipped}
          onFlip={handleFlip}
        />

        <button className="next-btn" onClick={nextRandomCard}>
          Next (Random)
        </button>
      </main>
    </div>
  );
}





