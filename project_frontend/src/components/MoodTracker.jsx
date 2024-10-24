import React, { useState } from "react";

const MoodTracker = () => {
  const [mood, setMood] = useState("");

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const submitMood = () => {
    // Here, add the API call to submit the mood to the backend
    console.log(`Selected Mood: ${mood}`);
  };

  return (
    <div className="mood-tracker">
      <h2>How are you feeling today?</h2>
      <select value={mood} onChange={handleMoodChange} className="mood-select">
        <option value="">Select Mood</option>
        <option value="Happy">Happy</option>
        <option value="Anxious">Anxious</option>
        <option value="Angry">Angry</option>
        <option value="Demotivated">Demotivated</option>
        <option value="Worthless">Worthless</option>
        <option value="Sad">Sad</option>
      </select>
      <button onClick={submitMood} className="submit-btn">
        Submit
      </button>
    </div>
  );
};

export default MoodTracker;
