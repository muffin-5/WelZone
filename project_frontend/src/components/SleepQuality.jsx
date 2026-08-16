import { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FaMoon,
  FaBed,
  FaStar,
  FaCheckCircle,
  FaChartLine,
} from "react-icons/fa";

const SLEEP_OPTIONS = [
  { value: 1, emoji: "😴", label: "Terrible" },
  { value: 2, emoji: "🥱", label: "Poor" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😌", label: "Excellent" },
];

const STORAGE_KEY = "welzone_sleep_log";

const getTodayKey = () => new Date().toISOString().slice(0, 10);

const loadLog = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
};

const SleepQuality = ({ compact = false }) => {
  const [log, setLog] = useState(loadLog);
  const [selected, setSelected] = useState(null);
  const [saved, setSaved] = useState(false);
  const todayKey = getTodayKey();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(log));
  }, [log]);

  const handleRate = (value) => {
    setSelected(value);
    setLog((prev) => ({ ...prev, [todayKey]: value }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const weekEntries = useMemo(() => {
    const entries = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      entries.push({
        key,
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        value: log[key] || null,
      });
    }
    return entries;
  }, [log]);

  const stats = useMemo(() => {
    const values = Object.values(log);
    if (values.length === 0) return { avg: 0, nights: 0, best: 0 };
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return { avg: avg.toFixed(1), nights: values.length, best: Math.max(...values) };
  }, [log]);

  const todayValue = log[todayKey];

  return (
    <div className="welzone-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-extrabold text-cocoa flex items-center gap-2">
            <FaMoon className="text-peach-400" /> Sleep Quality
          </h3>
          <p className="text-sm text-stone">
            How did you sleep last night?
          </p>
        </div>
        {saved && (
          <span className="welzone-chip bg-sage-100 text-sage-700 animate-pop">
            <FaCheckCircle /> Saved
          </span>
        )}
      </div>

      {/* Rating buttons */}
      {!todayValue ? (
        <div className="grid grid-cols-5 gap-2">
          {SLEEP_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleRate(opt.value)}
              className={`flex flex-col items-center gap-1 rounded-2xl py-3 transition active:scale-95 ${
                selected === opt.value
                  ? "bg-sage-100 ring-2 ring-sage-400"
                  : "hover:bg-cream-200 bg-cream-50"
              }`}
            >
              <span className="text-3xl">{opt.emoji}</span>
              <span className="text-[11px] font-semibold text-stone">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center rounded-2xl bg-sage-50 py-6">
          <div className="text-5xl mb-2">
            {SLEEP_OPTIONS[todayValue - 1]?.emoji}
          </div>
          <p className="font-bold text-sage-800">
            {SLEEP_OPTIONS[todayValue - 1]?.label} sleep last night
          </p>
          <button
            onClick={() => {
              setLog((prev) => {
                const next = { ...prev };
                delete next[todayKey];
                return next;
              });
              setSelected(null);
            }}
            className="text-xs text-stone underline mt-2 hover:text-sage-700"
          >
            Update
          </button>
        </div>
      )}

      {/* Week strip */}
      {!compact && (
        <div className="mt-5">
          <p className="text-xs font-bold text-stone uppercase tracking-wide mb-2">
            Last 7 nights
          </p>
          <div className="flex gap-2">
            {weekEntries.map((entry) => (
              <div
                key={entry.key}
                className="flex-1 flex flex-col items-center gap-1 rounded-xl bg-cream-50 py-2"
              >
                <span className="text-[10px] font-semibold text-stone">
                  {entry.label}
                </span>
                <span className="text-lg">
                  {entry.value
                    ? SLEEP_OPTIONS[entry.value - 1]?.emoji
                    : "·"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats */}
      {!compact && stats.nights > 0 && (
        <div className="mt-5 grid grid-cols-3 gap-2">
          <StatTile
            icon={<FaBed className="text-sage-500" />}
            value={`${stats.nights}`}
            label="Nights logged"
          />
          <StatTile
            icon={<FaChartLine className="text-peach-400" />}
            value={`${stats.avg}/5`}
            label="Avg quality"
          />
          <StatTile
            icon={<FaStar className="text-yellow-400" />}
            value={`${stats.best}/5`}
            label="Best night"
          />
        </div>
      )}
    </div>
  );
};

const StatTile = ({ icon, value, label }) => (
  <div className="rounded-2xl bg-cream-50 p-3 text-center">
    <div className="flex justify-center mb-1">{icon}</div>
    <p className="font-extrabold text-cocoa text-sm">{value}</p>
    <p className="text-[11px] text-stone">{label}</p>
  </div>
);

StatTile.propTypes = {
  icon: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
};

SleepQuality.propTypes = {
  compact: PropTypes.bool,
};

export default SleepQuality;