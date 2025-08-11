const express = require("express");
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createEvent,
  getEvents,
  getEventsByOrganizer,
    deleteEvent,
    updateEvent,
    // bookTicket,
} = require("../controllers/eventController");

router.post('/addevent', upload.single('image'), createEvent);
router.get("/", getEvents);
router.get("/organizer/:organizerId", getEventsByOrganizer);
router.delete("/:id", deleteEvent);
router.put("/:id", upload.single('image'), updateEvent);
// router.post("/book/:id", bookTicket);

module.exports = router;
