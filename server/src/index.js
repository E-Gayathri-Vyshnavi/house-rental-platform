import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

// Models - Using import (Make sure your model files use 'export default')
import User from './models/User.js';
import Property from './models/Property.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// 1. Socket.io Setup
const io = new Server(server, {
    cors: {
        origin: "*", // Allows connection from Vercel
        methods: ["GET", "POST"]
    }
});

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Static Folder for Images (The Fix for local uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 4. Database Connection
const MONGO_URI = "mongodb://vyshu_admin:vyshu123@ac-to4zamv-shard-00-00.lhf2oou.mongodb.net:27017,ac-to4zamv-shard-00-01.lhf2oou.mongodb.net:27017,ac-to4zamv-shard-00-02.lhf2oou.mongodb.net:27017/?ssl=true&replicaSet=atlas-nu96d8-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected (Mumbai Cluster)"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 5. BOOKING SCHEMA & MODEL ---
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

// --- 6. ROUTES ---

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
        res.status(500).json({ error: "Server error" });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, user: { id: user._id, email: user.email, role: user.role } });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Login error" });
    }
});

// Get Properties (Cloudinary and Filters)
app.get('/api/properties', async (req, res) => {
    try {
        const { location, category, maxPrice } = req.query;
        let filter = {};
        if (location) filter.location = { $regex: location, $options: 'i' };
        if (category && category !== "All") filter.category = category;
        if (maxPrice) filter.price = { $lte: Number(maxPrice) };

        const properties = await Property.find(filter).sort({ createdAt: -1 });
        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: "Fetch error" });
    }
});

// Post Property
app.post('/api/properties', async (req, res) => {
    try {
        const newProperty = new Property(req.body);
        await newProperty.save();
        res.status(201).json({ message: "Property posted!" });
    } catch (err) {
        res.status(400).json({ error: "Post error" });
    }
});

// Create Booking
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- 7. CHAT LOGIC ---
io.on('connection', (socket) => {
    socket.on('join_room', (data) => socket.join(data.room));
    socket.on('send_message', (data) => io.to(data.room).emit('receive_message', data));
});

// --- 8. START SERVER ---
const PORT = process.env.PORT || 10000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});