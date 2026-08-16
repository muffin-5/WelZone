import { useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaHeart } from "react-icons/fa";

const moodList = [
  { id: 1, name: "Happy", emoji: "😊", color: "bg-sage-100" },
  { id: 2, name: "Anxious", emoji: "😟", color: "bg-peach-50" },
  { id: 3, name: "Angry", emoji: "😠", color: "bg-peach-50" },
  { id: 4, name: "Demotivated", emoji: "😞", color: "bg-cream-200" },
  { id: 5, name: "Worthless", emoji: "😔", color: "bg-cream-200" },
  { id: 6, name: "Sad", emoji: "😢", color: "bg-sage-50" },
];

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("Id");

  const handleMoodClick = async (mood) => {
    try {
      await axios.post("http://localhost:8080/user-moods/set", null, {
        params: { userId: userId, moodId: mood.id },
      });
      setCurrentMood(mood);
      setSaved(true);
      setError("");
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Error setting mood:", error);
      setError("Failed to set mood. Please try again.");
    }
  };

  return (
    <div className="text-center">
      {saved && (
        <span className="welzone-chip bg-sage-100 text-sage-700 mb-3 animate-pop">
          <FaCheckCircle /> Mood logged
        </span>
      )}
      {error && (
        <p className="text-sm font-semibold text-peach-500 mb-3">{error}</p>
      )}

      {!currentMood ? (
        <>
          <p className="font-bold text-cocoa mb-4 flex items-center justify-center gap-2">
            <FaHeart className="text-peach-400" /> How are you feeling today?
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {moodList.map((mood) => (
              <button
                key={mood.id}
                onMouseEnter={() => setHoveredMood(mood.name)}
                onMouseLeave={() => setHoveredMood(null)}
                onClick={() => handleMoodClick(mood)}
                className={`w-16 h-16 rounded-2xl ${mood.color} flex items-center justify-center text-3xl transition-transform duration-200 transform hover:scale-110 hover:animate-shake hover:shadow-soft`}
                aria-label={mood.name}
              >
                {mood.emoji}
              </button>
            ))}
          </div>
          {hoveredMood && (
            <p className="text-sm font-semibold text-sage-700 mt-3">
              {hoveredMood}
            </p>
          )}
        </>
      ) : (
        <div className="text-center mt-2">
          <div className="inline-block p-6 rounded-3xl bg-sage-50">
            <div className="text-5xl mb-2 animate-pop">{currentMood.emoji}</div>
            <p className="font-bold text-sage-800">Today&apos;s mood: {currentMood.name}</p>
          </div>
          <button
            onClick={() => setCurrentMood(null)}
            className="block mx-auto mt-4 text-xs text-stone underline hover:text-sage-600"
          >
            Change mood
          </button>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;