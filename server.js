require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Root Route (for testing Render deployment)
app.get('/', (req, res) => {
  res.send('Aizaliq Studios Backend is running 🚀');
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/pay', require('./routes/payment'));
app.use('/api/admin', require('./routes/admin'));

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
