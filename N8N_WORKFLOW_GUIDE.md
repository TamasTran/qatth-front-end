# N8N Workflow Integration Guide

## Overview

The QATTH frontend integrates with N8N workflow "Exe demo full" which provides AI-powered CV analysis and technical quiz generation.

## N8N Workflow Architecture

### 3 Main Webhook Endpoints

#### 1. **POST /quiz** - Generate Technical Quiz
- **Purpose**: Generate a 20-question technical quiz based on CV content
- **Input**: CV text
- **Request Format**:
```json
{
  "text": "CV content here..."
}
```

- **Output Format**:
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

- **N8N Flow**:
  1. Webhook receives POST request with CV text
  2. AI Generate Quiz node (Google Gemini Chat Model) creates 20 questions
  3. Structured Output Parser ensures JSON compliance
  4. Response node returns JSON to frontend

- **Question Distribution**:
  - 3 Easy questions
  - 10 Medium questions
  - 7 Hard questions

---

#### 2. **POST /answer-quiz** - Analyze Quiz Answers
- **Purpose**: Analyze user's quiz answers and provide career feedback
- **Input**: CV text + User answers
- **Request Format**:
```json
{
  "cv": "CV content here...",
  "answerquiz": "[{\"id\":1,\"question\":\"...\",\"user_answer\":\"A\",\"correct_answer\":\"B\",\"explanation\":\"...\"}]"
}
```

- **Output Format**:
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

- **N8N Flow**:
  1. Webhook receives POST request with CV and answers
  2. AI Agent node (Google Gemini Chat Model) analyzes data
  3. Structured Output Parser ensures JSON compliance
  4. Response node returns analysis to frontend

- **Analysis Details**:
  - **Strengths**: 3-6 key strengths with evidence from CV (30%) and quiz performance (70%)
  - **Improvements**: 3-6 areas for improvement with priority levels and actionable suggestions
  - **Fit for Roles**: 1-3 recommended job titles with match scores (0.0-1.0)
  - **Confidence**: High/Medium/Low based on data quality

---

#### 3. **POST /cv-analysis** - Extract CV Content
- **Purpose**: Extract text from uploaded PDF file
- **Input**: PDF file
- **Output**: Extracted text content
- **Note**: Frontend handles PDF extraction client-side using pdf.js, so this endpoint is not used in current implementation

---

## Frontend Implementation

### CVScanner.tsx Integration

#### Step 1: Upload CV
```typescript
// User uploads PDF file
// Frontend extracts text using pdf.js
// Automatically calls analyzeCVAndGenerateQuiz()
```

#### Step 2: Generate Quiz
```typescript
// Calls POST /quiz with CV text
const quizResponse = await fetch(`${baseUrl}/quiz`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: cvContent }),
  signal: AbortSignal.timeout(120000), // 120 second timeout
});
```

**Response Handling**:
- Unwraps array-wrapped responses: `[{...}]` → `{...}`
- Unwraps output property: `{output: {...}}` → `{...}`
- Validates question structure
- Displays 20 questions with options

#### Step 3: Submit Answers
```typescript
// User answers all 20 questions
// Calls POST /answer-quiz with CV and answers
const analysisResponse = await fetch(`${baseUrl}/answer-quiz`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cv: cvText,
    answerquiz: JSON.stringify(answerQuiz),
  }),
  signal: AbortSignal.timeout(120000), // 120 second timeout
});
```

#### Step 4: Display Results
- Shows summary of candidate profile
- Lists strengths with evidence
- Lists improvements with priorities
- Recommends suitable job roles
- Shows quiz performance

---

## Environment Configuration

### Required Environment Variables

Create `.env.local` file in project root:

```env
VITE_WEBHOOK_URL=http://localhost:1234/webhook
VITE_DEBUG=true
```

**Variables**:
- `VITE_WEBHOOK_URL`: Base URL of N8N webhook (without trailing slash)
- `VITE_DEBUG`: Enable debug logging (optional)

### N8N Webhook URLs

Based on `VITE_WEBHOOK_URL=http://localhost:1234/webhook`:

- Quiz Generation: `http://localhost:1234/webhook/quiz`
- Answer Analysis: `http://localhost:1234/webhook/answer-quiz`
- CV Extraction: `http://localhost:1234/webhook/cv-analysis`

---

## Error Handling

### Timeout Errors
- **Timeout**: 120 seconds per request
- **Reason**: Google Gemini AI needs time to process complex CV analysis
- **User Message**: "Yêu cầu mất quá lâu (>120s). Vui lòng kiểm tra n8n server hoặc thử lại với CV ngắn hơn."

### Response Validation
- Validates quiz has exactly 20 questions
- Validates each question has required fields
- Validates analysis has summary field
- Provides default values for missing fields

### Common Issues

#### Issue: "Dữ liệu quiz không hợp lệ"
**Cause**: N8N returned invalid response format
**Solution**:
1. Check N8N workflow is active
2. Check Google Gemini API credentials
3. Check CV text is not empty
4. Review browser console for raw response

#### Issue: "Yêu cầu mất quá lâu"
**Cause**: N8N processing took too long
**Solution**:
1. Try with shorter CV (< 2000 characters)
2. Check N8N server is running
3. Check Google Gemini API rate limits
4. Increase timeout in CVScanner.tsx if needed

#### Issue: "Lỗi server (500)"
**Cause**: N8N workflow error
**Solution**:
1. Check N8N workflow logs
2. Verify Google Gemini API key is valid
3. Check N8N node connections
4. Test webhook with cURL

---

## Testing with cURL

### Test Quiz Generation
```bash
curl -X POST http://localhost:1234/webhook/quiz \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Senior Frontend Developer with 5 years experience in React, TypeScript, and Node.js"
  }'
```

### Test Answer Analysis
```bash
curl -X POST http://localhost:1234/webhook/answer-quiz \
  -H "Content-Type: application/json" \
  -d '{
    "cv": "Senior Frontend Developer with 5 years experience",
    "answerquiz": "[{\"id\":1,\"question\":\"What is React?\",\"user_answer\":\"A\",\"correct_answer\":\"A\",\"explanation\":\"React is a JS library\"}]"
  }'
```

---

## Debugging

### Enable Console Logging
The frontend logs all N8N interactions:

```typescript
console.log('Calling N8N Quiz Webhook:', quizUrl);
console.log('Raw N8N Response:', responseData);
console.log('Processed Quiz Response:', responseData);
```

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for "Calling N8N" messages
4. Check "Raw N8N Response" for actual data structure

### Common Log Messages
- `Calling N8N Quiz Webhook: ...` - Request being sent
- `Raw N8N Response: ...` - Actual response from N8N
- `Unwrapping array response` - Response was wrapped in array
- `Unwrapping output property` - Response had output property
- `Invalid questions structure: ...` - Validation failed

---

## Performance Considerations

### Timeout Settings
- Current: 120 seconds (2 minutes)
- Recommended: Keep at 120s for complex CVs
- Can increase to 180s if needed for very long CVs

### Response Size
- Quiz: ~50-100 KB (20 questions with explanations)
- Analysis: ~20-50 KB (strengths, improvements, roles)

### Network Requirements
- Stable internet connection required
- Google Gemini API must be accessible
- N8N server must be running and accessible

---

## Future Enhancements

1. **Caching**: Cache quiz results for same CV
2. **Batch Processing**: Process multiple CVs in parallel
3. **Custom Questions**: Allow users to add custom questions
4. **Export Results**: Export analysis as PDF/Word
5. **Comparison**: Compare multiple candidates
6. **Analytics**: Track quiz performance trends

---

## Support

For issues or questions:
1. Check browser console for error messages
2. Review N8N workflow logs
3. Test webhook with cURL
4. Check environment variables
5. Verify Google Gemini API credentials
