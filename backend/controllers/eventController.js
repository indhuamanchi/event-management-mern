const Event = require("../models/eventModel");
const path = require("path");

const createEvent = async (req, res) => {
  try {
    const { name, category, price, totalTickets, location, organizerId } = req.body;

    const imagePath = req.file ? path.join("uploads", req.file.filename) : "";

    const newEvent = new Event({
      name,
      category,
      price,
      totalTickets,
      availableTickets: totalTickets,
      location,
      image: imagePath,
      organizerId,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event created", event: newEvent });
  } catch (error) {
    console.error("Error adding event:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
  }
};

const getEventsByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const events = await Event.find({ organizerId });
    res.json(events);
  } catch (error) {
    console.error("Error fetching organizer events:", error);
    res.status(500).json({ message: "Failed to fetch organizer events" });
  }
};
const deleteEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const deletedEvent = await Event.findByIdAndDelete(eventId);
  
      if (!deletedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  const updateEvent = async (req, res) => {
    try {
      const eventId = req.params.id;
      const updatedData = req.body;
  
      if (req.file) {
        updatedData.image = path.join("uploads", req.file.filename);
      }
  
      const updatedEvent = await Event.findByIdAndUpdate(eventId, updatedData, { new: true });
  
      if (!updatedEvent) {
        return res.status(404).json({ message: "Event not found" });
      }
  
      res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
      console.error("Error updating event:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

module.exports = {
  createEvent,
  getEvents,
  getEventsByOrganizer,
    deleteEvent,
    updateEvent,
};
