// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser =require('cookie-parser');
const { logUserRegistration } = require('./logger');

const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidatesRoutes');
const voteRoutes = require('./routes/voteRoutes');
const electionRoutes=require('./routes/electionRoutes');
const editprofileRoutes=require('./routes/editprofileRoutes');
const messageRoutes =require('./routes/messageRoutes');


const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    allowedHeaders: ['Content-Type', 'Authorization','x-auth-token'],
    credentials:true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/elections',electionRoutes);
app.use('/api/user',editprofileRoutes);
app.use('/api/message',messageRoutes);

app.post('/api/log-registration', (req, res) => {
    const { userId, dateTime, location } = req.body;

    logUserRegistration(userId, dateTime, location);
    res.status(200).send('Logged registration successfully.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
