// app.js

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');


const app = express();

app.use(express.json());            // For parsing application/json


// Security middleware
app.use(helmet());

// CORS
app.use(cors());

// Request parsing
app.use(express.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,                  // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Logging (optional, recommended for dev)
app.use(morgan('dev'));


//product
app.use('/api/products', productRoutes);

app.use('/api/orders', orderRoutes);


// -- ROUTES GO HERE --
app.use('/api/auth', authRoutes);
// 404 fallback (Always last)
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route Not Found' });
});

//order


module.exports = app;
