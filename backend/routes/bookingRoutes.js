const express = require("express");
const router = express.Router();
const { createBooking ,getEventById } = require("../controllers/bookingController");

router.post("/create", createBooking);
// router.get("/event/:eventId", getEventDetails);
router.get("/event/:id", getEventById);

module.exports = router;
