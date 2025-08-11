const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');
require('dotenv').config();

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({origin:'http://localhost:3000',credentials:true})); // Allow requests from your frontend URL

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('MongoDB connection failed:', err));

const eventRoutes = require('./routes/eventRoutes');
app.use('/api/events', eventRoutes);
const bookingRoutes = require('./routes/bookingRoutes');
app.use("/api",bookingRoutes); // Booking routes
// const firebaseAuth = require('./middleware/firebaseAuth');
// app.use(firebaseAuth); // Middleware to authenticate Firebase token
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);

app.get('/api/event/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
      const event = await Event.findById(eventId);
      if (!event) return res.status(404).json({ message: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: "Error fetching event details", error });
    }
  });
  