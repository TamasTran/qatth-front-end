# N8N Workflow Integration Guide

## Workflow Overview
**Workflow Name:** Exe demo full  
**Workflow ID:** AWKsnTyDyFm4hrbM

This document describes how the QATTH frontend integrates with the n8n workflow.

---

## Workflow Architecture

### 3 Main Webhook Endpoints

```
┌─────────────────────────────────────────────────────────────┐
│                    QATTH Frontend                           │
│                    (React + TypeScript)                     │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   POST /quiz   POST /answer-quiz POST /cv-analysis
        │            │            │
        └────────────┼────────────┘
                     │
        ┌────────────▼────────────┐
        │   N8N Workflow Nodes    │
        └────────────────────────┘
```

---

## Endpoint Details

### 1. POST `/quiz` - Generate Technical Quiz

**Webhook Node:** "Generate Quiz"  
**Webhook ID:** d2541504-7cc6-4d85-b84d-89134a9b5003

**Flow:**
```
Generate Quiz (webhook)
    ↓
AI Generate Quiz (LangChain Agent)
    ↓
Structured Output Parser
    ↓
Google Gemini Chat Model1
    ↓
Respond to Webhook
```

**Input:**
```json
{
  "text": "CV content extracted from PDF"
}
```

**Output Schema:**
```json
{
  "test_title": "string",
  "questions": [
    {
      "id": "number",
      "difficulty": "easy|medium|hard",
      "question": "string",
      "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
      },
      "correct_answer": "A|B|C|D",
      "explanation": "string"
    }
  ]
}
```

**AI Prompt:**
- Generate exactly 20 questions
- Distribution: 3 easy, 10 medium, 7 hard
- Questions based on CV skills/technologies
- Return STRICT JSON only

---

### 2. POST `/answer-quiz` - Analyze Quiz Answers

**Webhook Node:** "Webhook1"  
**Webhook ID:** 9b7aae78-6793-4b0c-b9a4-70eec5c712c6

**Flow:**
```
Webhook1 (webhook)
    ↓
AI Agent (LangChain Agent)
    ↓
Structured Output Parser1
    ↓
Google Gemini Chat Model
    ↓
Respond to Webhook2
```

**Input:**
```json
{
  "cv": "Full CV text",
  "answerquiz": "[{\"id\":1,\"question\":\"...\",\"user_answer\":\"A\",\"correct_answer\":\"A\",\"explanation\":\"...\"}]"
}
```

**Output Schema:**
```json
{
  "summary": "string",
  "strengths": [
    {
      "area": "string",
      "explanation": "string",
      "evidence": ["string"]
    }
  ],
  "improvements": [
    {
      "area": "string",
      "explanation": "string",
      "priority": "high|medium|low",
      "suggested_actions": ["string"]
    }
  ],
  "fit_for_roles": [
    {
      "title": "string",
      "match_score": 0.0,
      "rationale": "string"
    }
  ],
  "confidence": "high|medium|low"
}
```

**AI Prompt:**
- Analyze CV (30%) and quiz performance (70%)
- Provide 3-6 strengths with evidence
- Provide 3-6 improvements with priority and actions
- Suggest 1-3 fitting roles with match scores
- Return STRICT JSON only

---

### 3. POST `/cv-analysis` - Extract CV

**Webhook Node:** "Upload cv"  
**Webhook ID:** 1d660ab8-cc74-4e9c-b993-042870900ae9

**Flow:**
```
Upload cv (webhook)
    ↓
Extract from File (PDF extraction)
    ↓
Respond to Webhook1
```

**Input:**
```json
{
  "text": "CV text content"
}
```

**Output:**
```json
{
  "file_content": "extracted text"
}
```

---

## Frontend Implementation

### CVScanner.tsx Integration

**Step 1: Upload CV**
```typescript
// Extract text from PDF
const text = await extractTextFromPDF(file);
setCvText(text);

// Call /quiz endpoint
await analyzeCVAndGenerateQuiz(text);
```

**Step 2: Generate Quiz**
```typescript
const quizResponse = await fetch(
  `${webhookBaseUrl}/quiz`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: cvContent }),
    signal: AbortSignal.timeout(30000),
  }
);
```

**Step 3: Submit Answers**
```typescript
const analysisResponse = await fetch(
  `${webhookBaseUrl}/answer-quiz`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cv: cvText,
      answerquiz: JSON.stringify(answerQuiz),
    }),
    signal: AbortSignal.timeout(30000),
  }
);
```

---

## Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                      User Action                             │
│                   Upload CV (PDF)                            │
└────────────────────────┬─────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Extract Text from PDF         │
        │  (Frontend - pdfjs-dist)       │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  POST /quiz                    │
        │  {text: cvContent}             │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  N8N: Generate Quiz            │
        │  - AI Agent (Gemini)           │
        │  - Validate JSON               │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Display Quiz (20 questions)   │
        │  - 3 easy, 10 medium, 7 hard   │
        └────────────────┬───────────────┘
                         │
                    User Answers
                         │
                         ▼
        ┌────────────────────────────────┐
        │  POST /answer-quiz             │
        │  {cv, answerquiz}              │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  N8N: Analyze Results          │
        │  - AI Agent (Gemini)           │
        │  - Score calculation           │
        │  - Role matching               │
        └────────────────┬───────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │  Display Analysis Results      │
        │  - Strengths & Evidence        │
        │  - Improvements & Actions      │
        │  - Fitting Roles               │
        │  - Quiz Score                  │
        └────────────────────────────────┘
```

---

## Error Handling

### Frontend Validation
- **Timeout:** 30 seconds per request
- **Response Validation:** Check schema compliance
- **Fallback Values:** Provide defaults for missing fields
- **Error Messages:** User-friendly Vietnamese messages

### N8N Error Handling
- **Structured Output Parser:** Auto-fixes JSON format
- **LangChain Agent:** Retries on failure
- **Webhook Response:** Always returns 200 with data

---

## Testing Checklist

- [ ] N8N workflow is running
- [ ] Webhook URLs are accessible
- [ ] Google Gemini API credentials configured
- [ ] VITE_WEBHOOK_URL environment variable set
- [ ] Frontend can extract PDF text
- [ ] Quiz generation returns 20 questions
- [ ] Quiz questions have correct difficulty distribution
- [ ] Analysis includes all required fields
- [ ] Error handling shows meaningful messages
- [ ] Timeout works after 30 seconds

---

## Troubleshooting

### Quiz Generation Fails
**Symptoms:** "Không thể tạo bài quiz"  
**Solutions:**
1. Check n8n workflow is active
2. Verify Google Gemini API credentials
3. Check CV text is not empty
4. Review n8n logs for AI Agent errors

### Analysis Returns Empty Fields
**Symptoms:** Missing strengths/improvements  
**Solutions:**
1. Check CV and quiz data are complete
2. Verify Structured Output Parser is configured
3. Review n8n logs for AI Agent output
4. Check Google Gemini API response

### Timeout Errors
**Symptoms:** "Request timeout"  
**Solutions:**
1. Check n8n server is responsive
2. Increase timeout if needed (currently 30s)
3. Check network connectivity
4. Review n8n workflow performance

---

## Configuration

### Environment Variables
```env
# .env or .env.local
VITE_WEBHOOK_URL=http://localhost:1234/webhook
VITE_DEBUG=false
```

### N8N Workflow Settings
- **Execution Order:** v1
- **Active:** true
- **Credentials:** Google Gemini API configured

---

## Future Improvements

1. **Caching:** Cache quiz results for same CV
2. **Async Processing:** Use n8n queues for large files
3. **Analytics:** Track quiz performance metrics
4. **Customization:** Allow custom quiz templates
5. **Multi-language:** Support multiple languages
