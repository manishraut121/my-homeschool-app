// src/app.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const compression = require('compression');

const lessonRoutes = require('./routes/lessonRoutes');
const healthRoutes = require('./routes/healthRoutes');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Parsing middleware
app.use(express.json());
app.use(compression());

// Request logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/health', healthRoutes);
app.use('/api/v1/lessons', lessonRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;

// index.js (root)
const app = require('./src/app');
const logger = require('./src/utils/logger');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});