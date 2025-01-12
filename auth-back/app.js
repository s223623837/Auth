const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDBs connected'))
    .catch((err) => console.log('MongoDB connection error:', err))
    .finally(()=>{console.log(process.env.MONGODB_URI)})
    ;

// Server setup
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
