import React, { useState } from "react";

const SessionBooking = () => {
  const [slots, setSlots] = useState([
    {
      id: 1,
      counselor: "Dr. Smith",
      time: "10:00 AM - 11:00 AM",
      booked: false,
    },
    { id: 2, counselor: "Dr. John", time: "11:00 AM - 12:00 PM", booked: true },
    // Add more slots
  ]);

  const handleBooking = (slotId) => {
    // Here, make an API call to book/cancel session
    console.log(`Booking session for slot ID: ${slotId}`);
  };

  return (
    <div className="session-booking">
      <h2>Book a Session with Counselors</h2>
      <ul className="slots-list">
        {slots.map((slot) => (
          <li key={slot.id}>
            <p>
              {slot.counselor} - {slot.time}
            </p>
            <button
              onClick={() => handleBooking(slot.id)}
              className={slot.booked ? "cancel-btn" : "book-btn"}
            >
              {slot.booked ? "Cancel" : "Book"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SessionBooking;
