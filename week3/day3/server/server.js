const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors')

dotenv.config({ path: __dirname + '/.env' });

const app = express();
app.use(cors({
  origin: "http://localhost:5173", 
  methods: ["GET", "POST", "PUT", "DELETE","OPTIONS"],
}));

console.log("MONGO_URI from env:", process.env.MONGO_URI);

connectDB();

app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);




// module.exports = app;

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
