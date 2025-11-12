# N8N Integration Fix Summary

## Date: November 12, 2025

## Overview
Updated CVScanner.tsx to properly integrate with N8N workflow "Exe demo full" with enhanced debugging and error handling.

---

## Changes Made

### 1. Enhanced Quiz Generation (`analyzeCVAndGenerateQuiz`)

**File**: `src/pages/CVScanner.tsx` (lines 127-222)

**Improvements**:
- ✅ Added detailed console logging for webhook URL and request body
- ✅ Improved error messages with HTTP status codes
- ✅ Added logging for response unwrapping steps
- ✅ Better error handling for timeout scenarios
- ✅ Cleaner URL construction logic

**Key Changes**:
```typescript
// Before: Simple URL construction
const quizResponse = await fetch(
  `${webhookBaseUrl.endsWith('/') ? webhookBaseUrl.slice(0, -1) : webhookBaseUrl}/quiz`,
  ...
);

// After: Cleaner with logging
const baseUrl = webhookBaseUrl.endsWith('/') ? webhookBaseUrl.slice(0, -1) : webhookBaseUrl;
const quizUrl = `${baseUrl}/quiz`;

console.log('Calling N8N Quiz Webhook:', quizUrl);
console.log('Request body:', { text: cvContent.substring(0, 100) + '...' });
```

---

### 2. Enhanced Answer Submission (`handleSubmitQuiz`)

**File**: `src/pages/CVScanner.tsx` (lines 233-350)

**Improvements**:
- ✅ Added webhook URL validation
- ✅ Added detailed console logging for webhook URL and request body
- ✅ Improved error messages with HTTP status codes
- ✅ Added logging for response unwrapping steps
- ✅ Better error handling for timeout scenarios
- ✅ Cleaner URL construction logic

**Key Changes**:
```typescript
// Added webhook URL validation
if (!webhookBaseUrl) {
  throw new Error('Vui lòng cấu hình VITE_WEBHOOK_URL trong file .env.local');
}

// Added detailed logging
const baseUrl = webhookBaseUrl.endsWith('/') ? webhookBaseUrl.slice(0, -1) : webhookBaseUrl;
const answerQuizUrl = `${baseUrl}/answer-quiz`;

console.log('Calling N8N Answer Quiz Webhook:', answerQuizUrl);
console.log('Request body:', {
  cv: cvText.substring(0, 100) + '...',
  answerquiz: JSON.stringify(answerQuiz).substring(0, 100) + '...',
});
```

---

### 3. New Documentation

**File**: `N8N_WORKFLOW_GUIDE.md`

Comprehensive guide covering:
- N8N workflow architecture
- 3 webhook endpoints with request/response formats
- Frontend integration flow
- Environment configuration
- Error handling and troubleshooting
- Testing with cURL
- Debugging tips
- Performance considerations

---

## N8N Workflow Endpoints

### 1. POST /quiz
- **Input**: `{ "text": "CV content" }`
- **Output**: Quiz with 20 questions (3 easy, 10 medium, 7 hard)
- **Format**: Array of questions with options as array of objects

### 2. POST /answer-quiz
- **Input**: `{ "cv": "CV content", "answerquiz": "[...]" }`
- **Output**: Analysis with strengths, improvements, fit_for_roles, confidence
- **Format**: Structured analysis object

### 3. POST /cv-analysis
- **Input**: PDF file
- **Output**: Extracted text
- **Note**: Not used in current implementation (client-side extraction)

---

## Response Format

### Quiz Response
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

### Analysis Response
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

---

## Debugging Features

### Console Logging
All N8N interactions are logged to browser console:

```
✓ Calling N8N Quiz Webhook: http://localhost:1234/webhook/quiz
✓ Request body: { text: "Senior Frontend Developer..." }
✓ Raw N8N Response: { test_title: "...", questions: [...] }
✓ Processed Quiz Response: { test_title: "...", questions: [...] }
```

### Error Messages
- Timeout errors: "Yêu cầu mất quá lâu (>120s)..."
- Invalid data: "Dữ liệu quiz không hợp lệ..."
- Server errors: "Lỗi server (500): ..."

### Browser DevTools
1. Open DevTools (F12)
2. Go to Console tab
3. Look for "Calling N8N" messages
4. Check "Raw N8N Response" for actual data

---

## Configuration

### Environment Variables
Create `.env.local`:
```env
VITE_WEBHOOK_URL=http://localhost:1234/webhook
VITE_DEBUG=true
```

### Webhook URLs
- Quiz: `http://localhost:1234/webhook/quiz`
- Answer: `http://localhost:1234/webhook/answer-quiz`
- CV Analysis: `http://localhost:1234/webhook/cv-analysis`

---

## Testing

### With cURL
```bash
# Test quiz generation
curl -X POST http://localhost:1234/webhook/quiz \
  -H "Content-Type: application/json" \
  -d '{"text":"Senior Frontend Developer with 5 years experience"}'

# Test answer analysis
curl -X POST http://localhost:1234/webhook/answer-quiz \
  -H "Content-Type: application/json" \
  -d '{
    "cv":"Senior Frontend Developer",
    "answerquiz":"[{\"id\":1,\"question\":\"What is React?\",\"user_answer\":\"A\",\"correct_answer\":\"A\"}]"
  }'
```

---

## Build Status

✅ **SUCCESS**
- TypeScript compilation: OK
- Vite build: OK
- No errors or warnings
- Ready for deployment

---

## Backward Compatibility

✅ All changes are backward compatible:
- Existing response parsing still works
- Error handling improved but not changed
- No breaking changes to interfaces
- Supports both array and object option formats

---

## Performance

- **Timeout**: 120 seconds per request
- **Quiz Response**: ~50-100 KB
- **Analysis Response**: ~20-50 KB
- **Network**: Requires stable internet connection

---

## Next Steps

1. ✅ Deploy updated CVScanner.tsx
2. ✅ Test with N8N workflow
3. ✅ Monitor browser console for logs
4. ✅ Verify quiz generation works
5. ✅ Verify answer analysis works
6. ✅ Check error handling

---

## Support

For issues:
1. Check browser console for error messages
2. Review N8N workflow logs
3. Test webhook with cURL
4. Verify environment variables
5. Check Google Gemini API credentials
