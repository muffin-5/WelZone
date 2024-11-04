import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

// Convert date array to a JavaScript Date object
const convertArrayToDate = (dateArray) => {
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

// Map moods to y-axis values and emoji icons
const moodMap = {
  1: { name: "Happy", yValue: 5, emoji: "😊" },
  2: { name: "Anxious", yValue: 3, emoji: "😟" },
  3: { name: "Angry", yValue: 2, emoji: "😠" },
  4: { name: "Demotivated", yValue: 2, emoji: "😞" },
  5: { name: "Worthless", yValue: 1, emoji: "😔" },
  6: { name: "Sad", yValue: 1, emoji: "😢" },
};

const MoodProgress = () => {
  const [moodData, setMoodData] = useState([]);
  const userId = localStorage.getItem("Id"); // Retrieve userId from local storage

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-moods/${userId}`
        );
        setMoodData(response.data);
      } catch (error) {
        console.error("Error fetching mood data:", error);
      }
    };

    fetchMoodData();
  }, [userId]);

  // Prepare data for the chart
  const dates = moodData.map((mood) =>
    new Date(convertArrayToDate(mood.moodSetAt)).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  );
  const moodValues = moodData.map((mood) => moodMap[mood.moodId]?.yValue || 0);

  // Chart configuration
  const data = {
    labels: dates,
    datasets: [
      {
        label: "Mood Progress",
        data: moodValues,
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  return (
    <div className="mood-progress-container max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Mood Progress</h2>
      <div className="chart-container relative mb-6">
        <Line data={data} />
      </div>

      {/* Table to display date-wise moods */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Mood</th>
              <th className="py-2 px-4 border-b">Emoji</th>
            </tr>
          </thead>
          <tbody>
            {moodData.map((mood, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {new Date(
                    convertArrayToDate(mood.moodSetAt)
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-2 px-4 border-b">
                  {moodMap[mood.moodId]?.name || "Unknown Mood"}
                </td>
                <td className="py-2 px-4 border-b">
                  {moodMap[mood.moodId]?.emoji || "❓"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-center text-gray-500 mt-4">
        Higher points on the graph indicate happier moods.
      </p>
    </div>
  );
};

export default MoodProgress;
