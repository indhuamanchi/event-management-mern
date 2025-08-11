import React, { useState, useEffect } from "react";
import axios from "axios";

const OrgHome = () => {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editEventId, setEditEventId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "Music",
    price: "",
    totalTickets: "",
    location: "",
    photo: null,
    previewUrl: ""
  });

  const fetchEvents = async () => {
    try {
      const organizerId = localStorage.getItem("organizerId");
      if (!organizerId) {
        console.error("Organizer ID not found in localStorage");
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/events/organizer/${organizerId}`);
      setEvents(response.data);
    } catch (err) {
      console.error("Error fetching events for organizer", err);
    }
  };

  useEffect(() => {
    fetchEvents();

    // Re-fetch events if booking just completed (e.g., from user homepage)
    const bookingStatus = localStorage.getItem("bookingStatus");
    if (bookingStatus === "done") {
      fetchEvents();
      localStorage.removeItem("bookingStatus");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: file, previewUrl }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "Music",
      price: "",
      totalTickets: "",
      location: "",
      photo: null,
      previewUrl: ""
    });
    // setShowForm(false);
    setIsEditMode(false);
    setEditEventId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const organizerId = localStorage.getItem("organizerId");
    if (!organizerId) return alert("Organizer ID not found!");

    const eventData = new FormData();
    eventData.append("name", formData.name);
    eventData.append("category", formData.category);
    eventData.append("price", formData.price);
    eventData.append("totalTickets", formData.totalTickets);
    eventData.append("location", formData.location);
    if (formData.photo) {
      eventData.append("image", formData.photo);
    }
    eventData.append("organizerId", organizerId);

    try {
      if (isEditMode && editEventId) {
        await axios.put(`http://localhost:5000/api/events/${editEventId}`, eventData);
        alert("✅ Event updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/events/addevent", eventData);
        alert("✅ Event added successfully!");
      }

      fetchEvents(); // Refresh list
      resetForm();
    } catch (err) {
      console.error("❌ Error submitting event:", err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (eventId, index) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${eventId}`);
      const updatedEvents = [...events];
      updatedEvents.splice(index, 1);
      setEvents(updatedEvents);
      alert("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      alert("Failed to delete event!");
    }
  };

  const handleUpdateClick = (event) => {
    setIsEditMode(true);
    setEditEventId(event._id);
    setShowForm(true);
    setFormData({
      name: event.name,
      category: event.category,
      price: event.price,
      totalTickets: event.totalTickets,
      location: event.location,
      photo: null,
      previewUrl: `http://localhost:5000/${event.image}`
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Organizer's Dashboard</h1>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={() => {
            setShowForm(true);
            // setIsEditMode(false);
            // setEditEventId(true);
            resetForm();
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "150px",
          }}
        >
          Add Event
        </button>
      </div>

      {showForm && (
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            marginBottom: "30px"
          }}
        >
          <h2>{isEditMode ? "Update Event" : "New Event"}</h2>
          <form onSubmit={handleSubmit}>
            <label>Event Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <option value="Music">Music</option>
              <option value="Comedy">Comedy</option>
              <option value="Technology">Technology</option>
            </select>

            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Ticket Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Total Tickets:</label>
            <input
              type="number"
              name="totalTickets"
              value={formData.totalTickets}
              onChange={handleInputChange}
              required
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <label>Event Photo:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{ marginBottom: "10px" }}
            />

            {formData.previewUrl && (
              <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                <img
                  src={formData.previewUrl}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "10px" }}
                />
              </div>
            )}

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginRight: "10px"
              }}
            >
              {isEditMode ? "Update Event" : "Add Event"}
            </button>

            <button
              type="button"
              onClick={resetForm}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                // width: "150px",
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div style={{display: "flex", flexWrap:"wrap",}}>
        {events.map((event, index) => (
          <div
            key={index}
            style={{
              width: "40%",
              // display: "flex",
              // flexDirection: "row",
              
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "20px",
              boxSizing: "border-box",
              marginRight: "50px",
              marginLeft: "50px"
              
            }}
          >
            <div style={{ flex: "2" }}>
              <h3>{event.name}</h3>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Ticket Price:</strong> ₹{event.price}</p>
              <p><strong>Total Tickets:</strong> {event.totalTickets}</p>
              <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
              <p><strong>Booked Tickets:</strong> {event.totalTickets - event.availableTickets}</p>
              <p><strong>Total Revenue:</strong> ₹{event.price*(event.totalTickets - event.availableTickets)}</p>
              <p><strong>Organizer ID:</strong> {event.organizerId}</p>
              <img
                src={`http://localhost:5000/${event.image}`}
                alt="Event"
                style={{ width: "25%", borderRadius: "10px" }}
              />
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleUpdateClick(event)}
                  style={{
                    padding: "5px 10px",
                    marginRight: "10px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100px",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(event._id, index)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    width: "100px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrgHome;
