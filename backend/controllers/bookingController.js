// bookingController.js
const Event = require('../models/eventModel');

// const getEventDetails = async (req, res) => {
//     try {
//       const event = await Event.findById(req.params.eventId);
//       if (!event) {
//         return res.status(404).json({ message: "Event not found" });
//       }
//       res.status(200).json(event);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching event", error });
//     }
//   };
  
//   const createBooking = async (req, res) => {
//     try {
//       const { eventId, tickets } = req.body;
//       const event = await Event.findById(eventId);
  
//       if (!event) return res.status(404).json({ message: "Event not found" });
  
//       if (event.availableTickets < tickets) {
//         return res.status(400).json({ message: "Not enough tickets available" });
//       }
  
//       event.bookedTickets += tickets;
//       event.availableTickets -= tickets;
//       event.revenue += event.price * tickets;
  
//       await event.save();
  
//       res.status(200).json({ message: "Booking successful", event });
//     } catch (error) {
//       res.status(500).json({ message: "Booking failed", error });
//     }
//   };
const createBooking = async (req, res) => {
    try {
      const { eventId, tickets } = req.body;
      const event = await Event.findById(eventId);
  
      if (!event) return res.status(404).json({ message: "Event not found" });
  
      if (event.availableTickets < tickets) {
        return res.status(400).json({ message: "Not enough tickets available" });
      }
  
      event.availableTickets -= tickets;
  
      await event.save();
  
      res.status(200).json({ message: "Booking successful", event });
    } catch (error) {
      console.error("Booking failed:", error);
      res.status(500).json({ message: "Booking failed", error });
    }
  };
  
  const getEventById = async (req, res) => {
    try {
      console.log("Requested event ID:", req.params.id);  // 👈 helps you trace
      const event = await Event.findById(req.params.id);
      if (!event) {
        console.log("Event not found!");
        return res.status(404).json({ message: "Event not found" });
      }
      console.log("Fetched Event:", event);
      res.json(event);
    } catch (error) {
      console.error("Server error fetching event:", error);
      res.status(500).json({ message: "Server error" });
    }
  };
  
module.exports = {
    // bookTicket,
    // getEventDetails,
    createBooking,
    getEventById,
};