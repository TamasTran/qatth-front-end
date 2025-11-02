# QATTH Frontend - API Endpoints Documentation

## Overview
Frontend communicates with n8n workflow via 3 main webhook endpoints.

## Webhook Base URL
```
VITE_WEBHOOK_URL=http://localhost:1234/webhook
```

---

## 1. POST `/cv-analysis`
**Purpose:** Upload and extract CV file

### Request
```json
{
  "text": "CV content as text"
}
```

### Response
```json
{
  "file_content": "extracted text from PDF"
}
```

### Used By
- CVScanner.tsx (initial CV upload)

---

## 2. POST `/quiz`
**Purpose:** Generate 20-question technical quiz based on CV

### Request
```json
{
  "text": "CV content as text"
}
```

### Response
```json
{
  "test_title": "Technical Assessment - Frontend Developer",
  "questions": [
    {
      "id": 1,
      "difficulty": "easy",
      "question": "What is React?",
      "options": [
        { "key": "A", "value": "A JavaScript library" },
        { "key": "B", "value": "A CSS framework" },
        { "key": "C", "value": "A database" },
        { "key": "D", "value": "A server" }
      ],
      "correct_answer": "A",
      "explanation": "React is a JavaScript library for building user interfaces."
    }
    // ... 19 more questions (3 easy, 10 medium, 7 hard)
  ]
}
```

### Output Schema
```json
{
  "test_title": "string",
  "questions": [
    {
      "id": "number",
      "difficulty": "easy|medium|hard",
      "question": "string",
      "options": [
        { "key": "A", "value": "string" },
        { "key": "B", "value": "string" },
        { "key": "C", "value": "string" },
        { "key": "D", "value": "string" }
      ],
      "correct_answer": "A|B|C|D",
      "explanation": "string"
    }
  ]
}
```

**Note:** Frontend also supports legacy object format for options:
```json
"options": {
  "A": "string",
  "B": "string",
  "C": "string",
  "D": "string"
}
```

### Requirements
- Exactly 20 questions
- Difficulty distribution: 3 easy, 10 medium, 7 hard
- Questions based on CV skills/technologies
- Valid JSON schema

### Used By
- CVScanner.tsx (quiz generation)

---

## 3. POST `/answer-quiz`
**Purpose:** Analyze quiz answers and provide CV feedback

### Request
```json
{
  "cv": "Full CV text content",
  "answerquiz": "[{\"id\":1,\"question\":\"...\",\"user_answer\":\"A\",\"correct_answer\":\"A\",\"explanation\":\"...\"}]"
}
```

### Response
```json
{
  "summary": "Strong full-stack developer with 3+ years experience in React and Node.js.",
  "strengths": [
    {
      "area": "Frontend Development",
      "explanation": "Demonstrated proficiency in modern React patterns",
      "evidence": ["React 18", "TypeScript", "Tailwind CSS"]
    }
  ],
  "improvements": [
    {
      "area": "Backend Architecture",
      "explanation": "Limited experience with system design",
      "priority": "high",
      "suggested_actions": [
        "Complete AWS Solutions Architect course",
        "Build a microservices project"
      ]
    }
  ],
  "fit_for_roles": [
    {
      "title": "Senior Frontend Developer",
      "match_score": 0.85,
      "rationale": "Strong React skills and 3+ years experience"
    }
  ],
  "confidence": "high"
}
```

### Schema Details
- **summary**: 1-2 sentences about candidate profile
- **strengths**: 3-6 key strengths with evidence from CV and quiz
- **improvements**: 3-6 areas for improvement with priority (high/medium/low) and actionable suggestions
- **fit_for_roles**: 1-3 recommended roles with match scores (0.0-1.0)
- **confidence**: Assessment confidence level (high/medium/low)

### Used By
- CVScanner.tsx (analysis and feedback)

---

## Error Handling

### Frontend Validation
- **120-second timeout** on all requests (n8n AI Agent needs time for processing)
- Validates response structure
- Provides fallback values for missing fields
- Returns user-friendly error messages
- Detects timeout errors and provides helpful guidance

### Common Errors
| Status | Cause | Solution |
|--------|-------|----------|
| 500 | n8n workflow error | Check n8n logs |
| 408 | Request timeout | Increase timeout or check network |
| 400 | Invalid request format | Verify request body matches schema |

---

## Environment Variables

```env
# Webhook base URL (default: http://localhost:1234/webhook)
VITE_WEBHOOK_URL=http://localhost:1234/webhook

# Debug mode (optional)
VITE_DEBUG=false
```

---

## Testing

### Test with cURL

**Generate Quiz:**
```bash
curl -X POST http://localhost:1234/webhook/quiz \
  -H "Content-Type: application/json" \
  -d '{"text":"I am a React developer with 3 years experience..."}'
```

**Analyze Answers:**
```bash
curl -X POST http://localhost:1234/webhook/answer-quiz \
  -H "Content-Type: application/json" \
  -d '{
    "cv":"CV text here",
    "answerquiz":"[{\"id\":1,\"user_answer\":\"A\"}]"
  }'
```

---

## Notes
- All responses are JSON
- Requests must include proper Content-Type headers
- CV text should be extracted from PDF before sending
- Quiz questions are generated based on CV content
- Analysis considers both CV and quiz performance
