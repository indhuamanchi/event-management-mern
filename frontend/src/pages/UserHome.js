import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/homepage.css"; // Import external CSS

const HomePage = () => {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents =
    selectedGenre === "All"
      ? events
      : events.filter((event) => event.category === selectedGenre);

  return (
    <div className="homepage">
      <section className="hero">
        <h1>Discover & Book Exciting Events!</h1>
        <p>Concerts, comedy shows, tech meetups, and more — all in one place.</p>
      </section>

      <div className="filter-section">
        <label htmlFor="genre">Filter by Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Music">Music</option>
          <option value="Comedy">Comedy</option>
          <option value="Technology">Technology</option>
        </select>
      </div>

      <div className="event-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} className="event-card">
              <img
                src={`http://localhost:5000/${event.image}`}
                alt={event.name}
                className="event-image"
              />
              <h3>{event.name}</h3>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Price:</strong> ₹{event.price}</p>
              <p><strong>Tickets Left:</strong> {event.availableTickets}</p>
              <button
                className="book-btn"
                onClick={() => navigate(`/book/${event._id}`)}
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <div className="no-events">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
              alt="No Events"
            />
            <p>No events available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;