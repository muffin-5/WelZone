import React, { useState } from "react";
import axios from "axios";

// Mapping moods to IDs and corresponding emoji icons
const moodList = [
  { id: 1, name: "Happy", emoji: "😊" },
  { id: 2, name: "Anxious", emoji: "😟" },
  { id: 3, name: "Angry", emoji: "😠" },
  { id: 4, name: "Demotivated", emoji: "😞" },
  { id: 5, name: "Worthless", emoji: "😔" },
  { id: 6, name: "Sad", emoji: "😢" },
];

const MoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [hoveredMood, setHoveredMood] = useState(null);

  const userId = localStorage.getItem("Id"); // Retrieve userId from local storage

  const handleMoodClick = async (mood) => {
    try {
      // API call to set the user's mood
      await axios.post("http://localhost:8080/user-moods/set", null, {
        params: {
          userId: userId,
          moodId: mood.id,
        },
      });
      alert("Mood set successfully!");
      setCurrentMood(mood); // Update the current mood after submission
    } catch (error) {
      console.error("Error setting mood:", error);
      alert("Failed to set mood. Please try again.");
    }
  };

  return (
    <div className="mood-tracker text-center">
      <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>
      {!currentMood ? (
        <div className="flex justify-center gap-4 flex-wrap">
          {moodList.map((mood) => (
            <div
              key={mood.id}
              className="relative"
              onMouseEnter={() => setHoveredMood(mood.name)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              <button
                onClick={() => handleMoodClick(mood)}
                className="text-4xl transition-transform duration-200 transform hover:scale-125 hover:animate-shake"
              >
                {mood.emoji}
              </button>
              {hoveredMood === mood.name && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm px-2 py-1 rounded shadow-lg">
                  {mood.name}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-6">
          <p className="text-lg font-medium">Current Mood:</p>
          <div className="text-5xl mt-2">{currentMood.emoji}</div>
          <p className="text-gray-500 mt-2">{currentMood.name}</p>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;
