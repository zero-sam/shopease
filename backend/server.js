// server.js

const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./config/database');
const app = require('./app');

// Connect to MongoDB
connectDB();

// Start Express server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
