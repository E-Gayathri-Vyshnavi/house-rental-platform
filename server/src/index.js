import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');


// Models (Ensure these paths match your folder structure)
const User = require('./models/User');
const Property = require('./models/Property');

const app = express();
const server = http.createServer(app);

// 1. Socket.io Setup for Real-time Chat
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Your Next.js frontend URL
        methods: ["GET", "POST"]
    }
});

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Database Connection
// This uses the connection string for your Mumbai cluster
const MONGO_URI = "mongodb://vyshu_admin:vyshu123@ac-to4zamv-shard-00-00.lhf2oou.mongodb.net:27017,ac-to4zamv-shard-00-01.lhf2oou.mongodb.net:27017,ac-to4zamv-shard-00-02.lhf2oou.mongodb.net:27017/?ssl=true&replicaSet=atlas-nu96d8-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected (Mumbai Cluster)"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 4. AUTHENTICATION ROUTES ---

// Registration
app.post('/api/register', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: "Email already registered" });

        const newUser = new User({ email, password, role });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server error during registration" });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (user) {
            // Send back user details so frontend can store them in localStorage
            res.json({ 
                success: true, 
                user: { id: user._id, email: user.email, role: user.role } 
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server error during login" });
    }
});

// --- 5. PROPERTY ROUTES (With Advanced Filtering) ---

// Get all properties with filters
app.get('/api/properties', async (req, res) => {
    try {
        const { location, category, maxPrice } = req.query;
        let filter = {};

        // Case-insensitive location search
        if (location) {
            filter.location = { $regex: location, $options: 'i' };
        }

        // Category filter (House, Villa, PG, etc.)
        if (category && category !== "All") {
            filter.category = category;
        }

        // Price filter (Less than or equal to)
        if (maxPrice) {
            filter.price = { $lte: Number(maxPrice) };
        }

        const properties = await Property.find(filter).sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch properties" });
    }
});

// Post a new property (Landlord only)
app.post('/api/properties', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json({ message: "Property posted successfully!" });
    } catch (err) {
        res.status(400).json({ error: "Error posting property" });
    }
});

// --- 6. REAL-TIME CHAT LOGIC ---

io.on('connection', (socket) => {
    console.log('User connected to Chat:', socket.id);

    socket.on('join_room', (data) => {
        socket.join(data.room);
        console.log(`User joined room: ${data.room}`);
    });

    socket.on('send_message', (data) => {
        // data: { room, sender, message, time }
        io.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// --- 7. START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
const BookingSchema = new mongoose.Schema({
  propertyId: mongoose.Schema.Types.ObjectId,
  userId: String,
  userName: String,
  userPhone: String,
  bookingDate: String,
  amount: Number,
  status: { type: String, default: 'Pending' }
});

const Booking = mongoose.model('Booking', BookingSchema);

app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});