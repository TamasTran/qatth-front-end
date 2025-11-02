# QATTH Frontend - Setup Guide

## Prerequisites

- Node.js 18+ 
- npm or yarn
- n8n instance running (for webhook endpoints)
- Google Gemini API key (for AI features)

---

## Installation

### 1. Clone Repository
```bash
cd qatth-front-end
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup

Create `.env.local` file:
```env
# N8N Webhook Base URL
VITE_WEBHOOK_URL=http://localhost:1234/webhook

# Debug Mode (optional)
VITE_DEBUG=false
```

---

## N8N Workflow Setup

### 1. Import Workflow

1. Open n8n dashboard
2. Go to Workflows → Import
3. Upload the workflow JSON file: `Exe demo full`
4. Click "Import"

### 2. Configure Credentials

1. **Google Gemini API**
   - Go to Credentials
   - Create new "Google Gemini (PaLM) API account"
   - Add your Google API key
   - Name it: "Google Gemini(PaLM) Api account"

2. **Webhook URLs**
   - Ensure n8n is accessible at: `http://localhost:1234`
   - Webhook paths are auto-generated:
     - `/webhook/quiz`
     - `/webhook/answer-quiz`
     - `/webhook/cv-analysis`

### 3. Activate Workflow

1. Open the "Exe demo full" workflow
2. Click "Activate" button
3. Verify all webhook nodes show green checkmarks

---

## Development

### Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

Output will be in `dist/` folder

### Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
qatth-front-end/
├── src/
│   ├── components/
│   │   ├── AuthModal.tsx          # Login/Register modal
│   │   ├── Header.tsx             # Navigation header
│   │   └── home/                  # Home page components
│   ├── pages/
│   │   ├── CVScanner.tsx          # Main CV scanning page
│   │   ├── CVBuilder.tsx          # CV builder
│   │   ├── Chatbot.tsx            # AI chatbot
│   │   ├── Interview.tsx          # Interview practice
│   │   ├── Profile.tsx            # User profile
│   │   ├── Pricing.tsx            # Pricing page
│   │   ├── Recharge.tsx           # Payment page
│   │   └── jobs/                  # Job listings
│   ├── shell/
│   │   ├── AppLayout.tsx          # Main layout
│   │   └── ProtectedRoute.tsx     # Route protection
│   ├── store/
│   │   └── auth.ts                # Auth state management
│   ├── utils/
│   │   └── cv.ts                  # CV utilities
│   ├── config.ts                  # API configuration
│   ├── main.tsx                   # Entry point
│   └── index.css                  # Global styles
├── public/                        # Static assets
├── API_ENDPOINTS.md              # API documentation
├── N8N_INTEGRATION.md            # N8N integration guide
├── SETUP_GUIDE.md                # This file
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

---

## Key Features

### 1. CV Scanner
- Upload PDF CV
- Extract text automatically
- Generate 20-question technical quiz
- Analyze quiz answers
- Get personalized feedback

### 2. Authentication
- Modal-based login/register
- Local storage persistence
- Demo accounts available:
  - `free@qatth.com` / `123456` (Free plan)
  - `medium@qatth.com` / `123456` (Medium plan)
  - `pro@qatth.com` / `123456` (Pro plan)

### 3. AI Features
- Quiz generation based on CV
- Answer analysis
- Role recommendations
- Strength/weakness assessment

---

## API Integration

### CVScanner Workflow

```
1. User uploads PDF
   ↓
2. Frontend extracts text (pdfjs-dist)
   ↓
3. POST /quiz with CV text
   ↓
4. N8N generates 20 questions
   ↓
5. User answers questions
   ↓
6. POST /answer-quiz with answers
   ↓
7. N8N analyzes and provides feedback
   ↓
8. Display results to user
```

### Error Handling

- **30-second timeout** on all requests
- **Validation** of response structure
- **Fallback values** for missing fields
- **User-friendly error messages** in Vietnamese

---

## Troubleshooting

### Issue: "Lỗi khi xử lý CV"

**Causes:**
1. N8N workflow not running
2. Webhook URL incorrect
3. Google Gemini API not configured
4. CV text is empty

**Solutions:**
1. Check n8n is running: `http://localhost:1234`
2. Verify `VITE_WEBHOOK_URL` in `.env.local`
3. Check Google Gemini credentials in n8n
4. Ensure PDF is readable

### Issue: "Không thể tạo bài quiz"

**Causes:**
1. AI Agent failed to generate questions
2. Response format is invalid
3. Timeout occurred

**Solutions:**
1. Check n8n logs for AI Agent errors
2. Verify Structured Output Parser configuration
3. Increase timeout if needed (currently 30s)

### Issue: Build Fails

**Solutions:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear TypeScript cache
npm run build -- --force
```

---

## Performance Tips

1. **Code Splitting:** Already optimized with Vite
2. **Image Optimization:** Use WebP format for images
3. **Lazy Loading:** Components use React.lazy()
4. **Caching:** Browser cache for static assets
5. **Minification:** Automatic with Vite build

---

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Using Netlify CLI
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
```env
VITE_WEBHOOK_URL=https://your-n8n-instance.com/webhook
VITE_DEBUG=false
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run type-check` | Run TypeScript compiler |

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Security

- ✅ HTTPS recommended for production
- ✅ API keys stored in environment variables
- ✅ CORS headers configured in n8n
- ✅ Input validation on all forms
- ✅ XSS protection with React

---

## Support

For issues or questions:
1. Check `API_ENDPOINTS.md` for API details
2. Review `N8N_INTEGRATION.md` for workflow info
3. Check browser console for errors
4. Review n8n logs for backend issues

---

## License

QATTH © 2024
