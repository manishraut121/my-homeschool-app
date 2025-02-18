// index.js
const express = require('express');
const app = express();

// Simple route for health-check and demo
app.get('/', (req, res) => {
  res.send('Hello from Homeschool Lesson App!');
});

// Future: Add your /generateLesson endpoint here
// Example placeholder for now:
app.post('/generateLesson', express.json(), (req, res) => {
  // You will integrate OpenAI calls later.
  const { gradeLevel, subject, interests } = req.body;
  // For now, just echo the inputs.
  res.json({ lessonPlan: `Lesson plan for Grade ${gradeLevel} in ${subject} with interests: ${interests}` });
});

// Cloud Run listens on port 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
