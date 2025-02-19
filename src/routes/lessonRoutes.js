
const express = require('express');
const { body, validationResult } = require('express-validator');
const lessonService = require('../services/lessonService');
const logger = require('../utils/logger');

const router = express.Router();

// Validation middleware
const validateLessonRequest = [
  body('gradeLevel').isString().notEmpty().trim(),
  body('subject').isString().notEmpty().trim(),
  body('interests').isArray().optional(),
  body('learningStyle').isString().optional(),
];

router.post('/generate', validateLessonRequest, async (req, res, next) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const lessonPlan = await lessonService.generateLesson(req.body);
    
    // Add caching headers
    res.set('Cache-Control', 'private, max-age=300'); // Cache for 5 minutes
    
    return res.json({
      success: true,
      data: lessonPlan
    });
  } catch (error) {
    logger.error('Error in lesson generation endpoint:', error);
    next(error);
  }
});

// Get lesson history (placeholder for future implementation)
router.get('/history', async (req, res, next) => {
  res.json({
    success: true,
    message: 'Lesson history feature coming soon'
  });
});

module.exports = router;