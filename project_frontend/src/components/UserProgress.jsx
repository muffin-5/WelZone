import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { FaChartLine, FaMoon, FaCalendarAlt } from "react-icons/fa";
import PageShell from "./PageShell";
import SleepQuality from "./SleepQuality";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

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
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("Id");

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user-moods/${userId}`
        );
        setMoodData(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching mood data:", error);
        setMoodData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMoodData();
  }, [userId]);

  const dates = moodData.map((mood) => {
    const d = convertArrayToDate(mood.moodSetAt);
    return d
      ? d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : "";
  });
  const moodValues = moodData.map(
    (mood) => moodMap[mood.moodId]?.yValue || 0
  );
  const moodEmojis = moodData.map((mood) => moodMap[mood.moodId]?.emoji || "❓");

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Mood Progress",
        data: moodValues,
        fill: true,
        backgroundColor: "rgba(99, 144, 91, 0.12)",
        borderColor: "#63905B",
        tension: 0.4,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: "#63905B",
        pointBorderWidth: 3,
        pointRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const emoji = moodEmojis[ctx.dataIndex];
            const name = moodMap[moodData[ctx.dataIndex]?.moodId]?.name || "";
            return `${emoji} ${name}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 6,
        ticks: {
          stepSize: 1,
          callback: (value) => {
            const labels = { 1: "😔", 2: "😞", 3: "😟", 4: "🙂", 5: "😊" };
            return labels[value] || value;
          },
        },
        grid: { color: "rgba(58, 49, 40, 0.06)" },
      },
      x: {
        grid: { display: false },
      },
    },
  };

  const avgMood = moodValues.length
    ? (moodValues.reduce((a, b) => a + b, 0) / moodValues.length).toFixed(1)
    : 0;

  return (
    <PageShell
      eyebrow="Wellness Insights"
      title="My Progress"
      subtitle="Track how your mood evolves over time and how well you've been resting."
    >
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatTile
          icon={<FaChartLine className="text-sage-500" />}
          value={`${moodData.length}`}
          label="Moods logged"
        />
        <StatTile
          icon={<FaCalendarAlt className="text-peach-400" />}
          value={avgMood}
          label="Avg mood (of 5)"
        />
        <StatTile
          icon={<FaMoon className="text-clay-400" />}
          value="Sleep"
          label="See sleep below"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 welzone-card p-6">
          <h3 className="text-lg font-extrabold text-cocoa mb-1">
            Mood over time
          </h3>
          <p className="text-sm text-stone mb-4">
            Higher points indicate happier moods.
          </p>
          <div className="h-80">
            {loading ? (
              <div className="flex items-center justify-center h-full text-stone">
                Loading your mood data...
              </div>
            ) : moodData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-stone">
                No mood entries yet. Log your mood on the dashboard to start
                building your chart.
              </div>
            ) : (
              <Line data={data} options={options} />
            )}
          </div>
        </div>

        {/* Sleep */}
        <SleepQuality />
      </div>

      {/* Mood history table */}
      {moodData.length > 0 && (
        <div className="welzone-card p-6 mt-8">
          <h3 className="text-lg font-extrabold text-cocoa mb-4">
            Mood history
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-stone border-b border-cream-200">
                  <th className="py-2.5 pr-4 font-bold">Date</th>
                  <th className="py-2.5 pr-4 font-bold">Mood</th>
                  <th className="py-2.5 font-bold">Emoji</th>
                </tr>
              </thead>
              <tbody>
                {[...moodData].reverse().map((mood, index) => {
                  const d = convertArrayToDate(mood.moodSetAt);
                  return (
                    <tr key={index} className="border-b border-cream-100">
                      <td className="py-3 pr-4 font-semibold text-cocoa">
                        {d
                          ? d.toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "–"}
                      </td>
                      <td className="py-3 pr-4">
                        {moodMap[mood.moodId]?.name || "Unknown Mood"}
                      </td>
                      <td className="py-3">
                        <span className="welzone-chip bg-sage-100 text-sage-700">
                          {moodMap[mood.moodId]?.emoji || "❓"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PageShell>
  );
};

const StatTile = ({ icon, value, label }) => (
  <div className="welzone-card p-5 flex items-center gap-4">
    <span className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center">
      {icon}
    </span>
    <div>
      <p className="text-2xl font-extrabold text-cocoa">{value}</p>
      <p className="text-xs text-stone">{label}</p>
    </div>
  </div>
);

StatTile.propTypes = {
  icon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

export default MoodProgress;