import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

// Function to convert an array to a Date object
const convertArrayToDate = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 5) {
    throw new Error("Invalid date array");
  }

  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute);
};

const BookSession = () => {
  const [slots, setSlots] = useState([]); // Available slots
  const [bookedSlots, setBookedSlots] = useState([]); // Booked slots
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch available slots and booked slots on component mount
  useEffect(() => {
    const fetchSlots = async () => {
      const userId = localStorage.getItem("Id"); // Get userId from local storage
      try {
        // Fetch available slots
        const availableSlotsResponse = await axios.get(
          "http://localhost:8080/slots/available"
        );
        setSlots(
          Array.isArray(availableSlotsResponse.data)
            ? availableSlotsResponse.data
            : []
        );

        // Fetch booked slots for the user
        const bookedSlotsResponse = await axios.get(
          `http://localhost:8080/slots/bookedbyme/${userId}`
        );
        setBookedSlots(
          Array.isArray(bookedSlotsResponse.data)
            ? bookedSlotsResponse.data
            : []
        );
      } catch (error) {
        console.error("Error fetching slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  // Book a slot
  const bookSlot = async (slotId) => {
    const userId = localStorage.getItem("Id");
    try {
      const response = await axios.post(
        `http://localhost:8080/slots/book/${slotId}/user/${userId}`
      );
      if (response.status === 200) {
        // Remove the booked slot from the available list
        setSlots(slots.filter((slot) => slot.slotId !== slotId));
        alert("Slot booked successfully!");
      }
    } catch (error) {
      alert("Slot booking failed.");
      console.error("Error booking slot:", error);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (slots.length === 0 && bookedSlots.length === 0)
    return (
      <p className="text-center text-gray-600">
        No available or booked slots at the moment. Please check back later.
      </p>
    );

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700">
          Available Slots
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {slots.map((slot) => (
            <div
              key={slot.slotId} // Unique key for each slot
              className="bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {slot.counselorName}
                </h2>
                <div className="text-sm text-gray-600 mb-2">
                  <p>⭐ Rating: {slot.rating}/5</p>
                  <p>💼 Experience: {slot.experience} years</p>
                  <p>📜 Specialization: {slot.specialization}</p>
                  <p>🎓 Qualification: {slot.qualification}</p>
                </div>
                <div className="text-sm text-gray-700">
                  <p>
                    ⏰ Slot:{" "}
                    {convertArrayToDate(slot.startTime).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}{" "}
                    -{" "}
                    {convertArrayToDate(slot.endTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
              <button
                onClick={() => bookSlot(slot.slotId)}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Book Slot
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-extrabold text-center mb-8 text-blue-700 mt-12">
          Your Booked Slots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bookedSlots.map((slot) => (
            <div
              key={slot.id} // Unique key for each booked slot
              className="bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl p-6"
            >
              <div className="mb-4">
                <div className="text-sm text-gray-700">
                  <p>
                    ⏰ Slot:{" "}
                    {convertArrayToDate(slot.startTime).toLocaleString(
                      "en-US",
                      {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }
                    )}{" "}
                    -{" "}
                    {convertArrayToDate(slot.endTime).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <button
                    onClick={() => navigate(`./${slot.id}`)}
                    className="bg-blue-600 text-white mt-4 px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookSession;
