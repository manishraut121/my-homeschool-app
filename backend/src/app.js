// backend/src/app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const lessonRoutes = require('./routes/lessonRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use lesson routes
app.use('/api/lessons', lessonRoutes);

// Basic health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

module.exports = app;
