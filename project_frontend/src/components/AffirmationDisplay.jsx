import React, { useEffect, useState } from "react";

// List of positive affirmations
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
  const [randomAffirmation, setRandomAffirmation] = useState("");

  // Generate a random affirmation on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setRandomAffirmation(affirmations[randomIndex]);
  }, []);

  return (
    <div className="affirmation-display bg-gray-100 p-6 rounded-lg shadow-md max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Your Daily Affirmation
      </h2>
      <p className="text-center text-lg text-gray-700 italic">
        "{randomAffirmation}"
      </p>
    </div>
  );
};

export default AffirmationDisplay;
