// backend/src/routes/lessonRoutes.js
const express = require('express');
const router = express.Router();
const { generateLesson } = require('../services/lessonService');

// GET /api/lessons/grades
router.get('/grades', (req, res) => {
  const grades = ['K', '1', '2', '3', '4', '5', '6', '7', '8'];
  res.json(grades);
});

// GET /api/lessons/subjects
router.get('/subjects', (req, res) => {
  const subjects = ['Math', 'Science', 'English', 'History', 'Art'];
  res.json(subjects);
});

// POST /api/lessons/generate
router.post('/generate', async (req, res) => {
  try {
    const { grade, subject, interests, learningStyle, duration } = req.body;
    const lesson = await generateLesson({ grade, subject, interests, learningStyle, duration });
    res.json(lesson);
  } catch (error) {
    console.error('Error generating lesson:', error);
    res.status(500).json({ error: 'Failed to generate lesson' });
  }
});

module.exports = router;
