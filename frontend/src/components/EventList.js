import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure firebaseConfig.js exports the 'db' instance
import { collection, getDocs } from "firebase/firestore";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const eventList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventList);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Upcoming Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.name}</h3>
              <p>Genre: {event.genre}</p>
              <p>Location: {event.location}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
