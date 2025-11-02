// Configuration for QATTH Frontend
// Matches n8n workflow endpoints

const webhookUrl = import.meta.env.VITE_WEBHOOK_URL || 'http://localhost:1234/webhook';

export const config = {
  webhookUrl,
  apiEndpoints: {
    // POST /cv-analysis - Upload and extract CV
    cvAnalysis: '/cv-analysis',
    // POST /quiz - Generate 20-question quiz from CV
    quiz: '/quiz',
    // POST /answer-quiz - Analyze answers and provide feedback
    answerQuiz: '/answer-quiz',
  }
};

export const getApiUrl = (endpoint: string): string => {
  return `${webhookUrl}${endpoint}`;
};

export const debug = (message: string, data?: any) => {
  if (import.meta.env.VITE_DEBUG === 'true') {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};
