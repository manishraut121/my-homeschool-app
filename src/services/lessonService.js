const { VertexAI } = require('@google-cloud/vertexai');
const logger = require('../utils/logger');
const { getLessonPrompt } = require('../utils/prompts');

class LessonService {
  constructor() {
    this.vertexAI = new VertexAI({
      project: process.env.PROJECT_ID,
      location: 'us-central1',
    });
    this.model = 'gemini-pro';
  }

  async generateLesson(params) {
    try {
      const { gradeLevel, subject, interests, learningStyle } = params;
      
      const generativeModel = this.vertexAI.preview.getGenerativeModel({
        model: this.model,
        generation_config: {
          max_output_tokens: 1024,
          temperature: 0.4,
        },
      });

      const prompt = getLessonPrompt(gradeLevel, subject, interests, learningStyle);
      const result = await generativeModel.generateContent(prompt);
      
      return this.formatLessonPlan(result.response.text());
    } catch (error) {
      logger.error('Error generating lesson:', error);
      throw new Error('Failed to generate lesson plan');
    }
  }

  formatLessonPlan(rawPlan) {
    try {
      // Add structure to the raw AI response
      return {
        title: 'Custom Lesson Plan',
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.0',
        },
        content: rawPlan,
        sections: this.extractSections(rawPlan)
      };
    } catch (error) {
      logger.error('Error formatting lesson plan:', error);
      return { content: rawPlan };
    }
  }

  extractSections(rawPlan) {
    // Extract and organize sections from the raw plan
    const sections = [];
    // Implementation details...
    return sections;
  }
}

module.exports = new LessonService();