import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  FaChevronLeft,
  FaChevronRight,
  FaCalendarCheck,
  FaVideo,
} from "react-icons/fa";

const convertArrayToDate = (dateValue) => {
  if (typeof dateValue === "string") {
    return new Date(dateValue);
  }
  if (!Array.isArray(dateValue) || dateValue.length < 5) return null;
  const [year, month, day, hour, minute] = dateValue;
  return new Date(year, month - 1, day, hour, minute);
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const SessionCalendar = ({ sessions = [], title = "Session Calendar" }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(
    `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
  );

  const sessionsByDate = useMemo(() => {
    const map = {};
    sessions.forEach((session) => {
      const start = convertArrayToDate(session.startTime);
      if (!start) return;
      const key = `${start.getFullYear()}-${start.getMonth()}-${start.getDate()}`;
      if (!map[key]) map[key] = [];
      map[key].push({ ...session, parsedStart: start });
    });
    return map;
  }, [sessions]);

  const selectedSessions = sessionsByDate[selectedDate] || [];
  const selectedLabel = useMemo(() => {
    const [y, m, d] = selectedDate.split("-").map(Number);
    return `${MONTHS[m]} ${d}, ${y}`;
  }, [selectedDate]);

  const monthSessionsCount = useMemo(
    () =>
      Object.keys(sessionsByDate).filter((key) =>
        key.startsWith(
          `${viewDate.getFullYear()}-${viewDate.getMonth()}`
        )
      ).length,
    [sessionsByDate, viewDate]
  );

  const changeMonth = (delta) => {
    setViewDate(
      new Date(viewDate.getFullYear(), viewDate.getMonth() + delta, 1)
    );
  };

  const renderGrid = () => {
    const firstDay = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    const startOffset = firstDay.getDay();
    const daysInMonth = new Date(
      viewDate.getFullYear(),
      viewDate.getMonth() + 1,
      0
    ).getDate();

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const rows = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }

    return rows;
  };

  return (
    <div className="welzone-card p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-extrabold text-cocoa">{title}</h3>
          <p className="text-sm text-stone">
            {monthSessionsCount} session{monthSessionsCount !== 1 ? "s" : ""}{" "}
            this month
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 rounded-full hover:bg-sage-100 text-sage-700 transition"
            aria-label="Previous month"
          >
            <FaChevronLeft />
          </button>
          <span className="font-bold text-cocoa min-w-[120px] text-center">
            {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
          </span>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 rounded-full hover:bg-sage-100 text-sage-700 transition"
            aria-label="Next month"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Weekday header */}
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold text-stone/70 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {renderGrid().map((row, i) =>
          row.map((day, j) => {
            if (!day) return <div key={`${i}-${j}`} />;
            const key = `${viewDate.getFullYear()}-${viewDate.getMonth()}-${day}`;
            const isToday =
              today.getFullYear() === viewDate.getFullYear() &&
              today.getMonth() === viewDate.getMonth() &&
              today.getDate() === day;
            const isSelected = key === selectedDate;
            const hasSession = Boolean(sessionsByDate[key]?.length);

            return (
              <button
                key={`${i}-${j}`}
                onClick={() => setSelectedDate(key)}
                className={`relative flex flex-col items-center justify-center rounded-2xl py-2 min-h-[48px] text-sm transition ${
                  isSelected
                    ? "bg-sage-500 text-white font-bold shadow-glow"
                    : isToday
                    ? "bg-sage-100 text-sage-800 font-bold"
                    : "hover:bg-cream-200 text-cocoa"
                }`}
              >
                {day}
                {hasSession && (
                  <span
                    className={`mt-0.5 w-1.5 h-1.5 rounded-full ${
                      isSelected ? "bg-white" : "bg-peach-400"
                    }`}
                  />
                )}
              </button>
            );
          })
        )}
      </div>

      {/* Selected day sessions */}
      <div className="mt-5 pt-4 border-t border-cream-200">
        <h4 className="font-bold text-cocoa mb-3 flex items-center gap-2">
          <FaCalendarCheck className="text-sage-500" />
          {selectedLabel}
        </h4>
        {selectedSessions.length === 0 ? (
          <p className="text-sm text-stone">
            No sessions booked on this day. Take a well-deserved rest 🌿
          </p>
        ) : (
          <ul className="space-y-2.5">
            {selectedSessions.map((session, idx) => {
              const start = session.parsedStart;
              const end = convertArrayToDate(session.endTime);
              const personName = session.counselorName || session.userName;
              return (
                <li
                  key={session.slotId ?? session.id ?? idx}
                  className="flex items-center gap-3 rounded-2xl bg-sage-50 px-4 py-3"
                >
                  <span className="p-2 rounded-xl bg-sage-200 text-sage-700">
                    <FaVideo />
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-sage-800">
                      {personName
                        ? `Session with ${personName}`
                        : "Counseling session"}
                    </p>
                    <p className="text-xs text-stone">
                      {start.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {end
                        ? end.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </p>
                  </div>
                  <span className="welzone-chip bg-sage-200 text-sage-800 text-xs">
                    Booked
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

SessionCalendar.propTypes = {
  sessions: PropTypes.array,
  title: PropTypes.string,
};

export default SessionCalendar;