import { useEffect, useState } from "react";
import { FaQuoteLeft, FaQuoteRight, FaSyncAlt } from "react-icons/fa";

const affirmations = [
  "You are doing the best you can, and that is enough.",
  "Your feelings are valid, and it's okay to take time for yourself.",
  "You deserve to feel loved and supported.",
  "Every day is a new opportunity to grow.",
  "You are stronger than you think.",
  "It's okay to ask for help when you need it.",
  "You are worthy of good things.",
  "Your journey matters, and it's unique to you.",
  "Taking care of yourself is a strength, not a weakness.",
  "You have the courage to face anything that comes your way.",
];

const AffirmationDisplay = () => {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    setIndex(Math.floor(Math.random() * affirmations.length));
  }, []);

  const nextAffirmation = () => {
    setFading(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % affirmations.length);
      setFading(false);
    }, 250);
  };

  return (
    <div className="text-center">
      <div className="relative rounded-3xl bg-gradient-to-br from-peach-50 to-cream-100 p-8">
        <FaQuoteLeft className="text-peach-200 text-3xl absolute top-4 left-4" />
        <FaQuoteRight className="text-peach-200 text-3xl absolute bottom-4 right-4" />
        <p
          className={`text-lg text-cocoa italic leading-relaxed transition-opacity duration-300 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          &ldquo;{affirmations[index]}&rdquo;
        </p>
      </div>
      <button
        onClick={nextAffirmation}
        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sage-600 hover:text-sage-700 transition"
      >
        <FaSyncAlt className={fading ? "animate-spin" : ""} /> New affirmation
      </button>
    </div>
  );
};

export default AffirmationDisplay;