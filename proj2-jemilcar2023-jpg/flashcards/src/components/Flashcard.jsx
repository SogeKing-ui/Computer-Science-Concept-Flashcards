import "./Flashcard.css";

export default function Flashcard({
  question,
  answer,
  category,
  image,
  flipped,
  onFlip,
  status, // "correct" | "wrong" | null
}) {
  const catClass = category.toLowerCase(); // react/js/css
  const statusClass = status ? `status-${status}` : "";

  return (
    <div
      className={`card card-${catClass} ${statusClass}`}
      onClick={onFlip}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onFlip();
      }}
      role="button"
      tabIndex={0}
    >
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-front">
          {image && <img className="card-img" src={image} alt={category} />}
          <div className="badge">{category}</div>
          <p>{question}</p>
          <p className="hint">(click to flip)</p>
        </div>

        <div className="card-face card-back">
          {image && <img className="card-img" src={image} alt={category} />}
          <div className="badge">{category}</div>
          <p>{answer}</p>
          <p className="hint">(click to flip back)</p>
        </div>
      </div>
    </div>
  );
}

