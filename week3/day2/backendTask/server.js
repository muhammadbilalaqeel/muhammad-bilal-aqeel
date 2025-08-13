const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const taskRoutes = require('./src/routes/taskRoutes');
const { swaggerUi, swaggerSpec } = require('./src/docs/swagger');

dotenv.config({ path: __dirname + '/.env' });


console.log("MONGO_URI from env:", process.env.MONGO_URI);

connectDB();

const app = express();
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));



module.exports = app;

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
