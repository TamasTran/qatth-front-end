# Quick Start: N8N Integration

## Setup (5 minutes)

### 1. Configure Environment
Create `.env.local` in project root:
```env
VITE_WEBHOOK_URL=http://localhost:1234/webhook
VITE_DEBUG=true
```

### 2. Start N8N
```bash
# N8N should be running on http://localhost:1234
# Workflow: "Exe demo full" should be active
```

### 3. Start Frontend
```bash
npm run dev
# http://localhost:5173
```

---

## How It Works

### User Flow
1. **Upload CV** → PDF extracted client-side
2. **Generate Quiz** → POST /quiz → N8N generates 20 questions
3. **Answer Quiz** → User answers all 20 questions
4. **Get Analysis** → POST /answer-quiz → N8N analyzes and provides feedback
5. **View Results** → Shows strengths, improvements, suitable roles

---

## API Endpoints

| Endpoint | Method | Input | Output |
|----------|--------|-------|--------|
| `/quiz` | POST | `{text: "CV"}` | `{test_title, questions[]}` |
| `/answer-quiz` | POST | `{cv, answerquiz}` | `{summary, strengths[], improvements[], fit_for_roles[], confidence}` |
| `/cv-analysis` | POST | PDF file | Extracted text |

---

## Testing

### Test Quiz Generation
```bash
curl -X POST http://localhost:1234/webhook/quiz \
  -H "Content-Type: application/json" \
  -d '{"text":"Senior Frontend Developer with 5 years React experience"}'
```

### Expected Response
```json
{
  "test_title": "Advanced React & TypeScript Assessment",
  "questions": [
    {
      "id": 1,
      "difficulty": "easy",
      "question": "What is React?",
      "options": [
        {"key": "A", "value": "A JavaScript library"},
        {"key": "B", "value": "A CSS framework"},
        {"key": "C", "value": "A database"},
        {"key": "D", "value": "A server"}
      ],
      "correct_answer": "A",
      "explanation": "React is a JavaScript library for building UIs"
    }
  ]
}
```

---

## Debugging

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for these messages:
   - `Calling N8N Quiz Webhook: ...` - Request sent
   - `Raw N8N Response: ...` - Response received
   - `Processed Quiz Response: ...` - After processing

### Common Issues

**Issue**: "Dữ liệu quiz không hợp lệ"
- Check N8N workflow is active
- Check Google Gemini API key is set
- Check CV text is not empty

**Issue**: "Yêu cầu mất quá lâu (>120s)"
- Try with shorter CV
- Check N8N server is running
- Check internet connection

**Issue**: "Lỗi server (500)"
- Check N8N workflow logs
- Verify Google Gemini credentials
- Test with cURL

---

## Response Formats

### Quiz Questions
```typescript
interface Question {
  id: number;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: Array<{ key: 'A'|'B'|'C'|'D'; value: string }>;
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}
```

### Analysis
```typescript
interface Analysis {
  summary: string;
  strengths: Array<{
    area: string;
    explanation: string;
    evidence: string[];
  }>;
  improvements: Array<{
    area: string;
    explanation: string;
    priority: 'high' | 'medium' | 'low';
    suggested_actions: string[];
  }>;
  fit_for_roles: Array<{
    title: string;
    match_score: number; // 0.0 - 1.0
    rationale: string;
  }>;
  confidence: 'high' | 'medium' | 'low';
}
```

---

## File Structure

```
src/pages/CVScanner.tsx          # Main component
src/config.ts                     # Webhook configuration
N8N_WORKFLOW_GUIDE.md            # Detailed guide
N8N_FIX_SUMMARY.md               # Changes summary
QUICK_START_N8N.md               # This file
```

---

## Performance

- **Timeout**: 120 seconds per request
- **Quiz Generation**: ~30-60 seconds
- **Answer Analysis**: ~30-60 seconds
- **Response Size**: 50-150 KB

---

## Troubleshooting Checklist

- [ ] `.env.local` has `VITE_WEBHOOK_URL`
- [ ] N8N server is running
- [ ] N8N workflow "Exe demo full" is active
- [ ] Google Gemini API key is configured in N8N
- [ ] Frontend is running on http://localhost:5173
- [ ] Browser console shows no errors
- [ ] Test with cURL works

---

## Next Steps

1. ✅ Configure `.env.local`
2. ✅ Start N8N server
3. ✅ Start frontend dev server
4. ✅ Upload a CV to test
5. ✅ Check browser console for logs
6. ✅ Answer quiz questions
7. ✅ View analysis results

---

## Support

- **Documentation**: See `N8N_WORKFLOW_GUIDE.md`
- **Changes**: See `N8N_FIX_SUMMARY.md`
- **Logs**: Check browser DevTools Console
- **Testing**: Use cURL examples above
