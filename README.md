# WebMorph — AI-Powered Adaptive Web Interface Platform

WebMorph is an intelligent business analytics platform that dynamically restructures its UI based on natural language user intent. Built with the MERN stack.

## Features
- Natural language intent detection (Google Gemini AI or built-in keyword fallback)
- Dynamic dashboard transformation with smooth animations
- 28 reusable analytics components
- 5 predefined business workflows (Transaction Investigation, Revenue Analysis, Customer Analysis, Product Performance, Regional Sales)
- Before/After comparison panel showing transformation diff
- Adaptive navigation that changes per task
- Workspace history and restoration
- User feedback system
- Dark/light theme
- Demo mode for automated walkthrough
- JWT authentication

## Tech Stack
Frontend: React + Vite, Tailwind CSS, Recharts, Framer Motion, Lucide React  
Backend: Node.js, Express.js, MongoDB + Mongoose, JWT, bcryptjs  
AI: Google Gemini 1.5 Flash (optional)

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

## Setup

### Backend
```bash
cd server
cp .env.example .env
# Edit .env: set MONGO_URI, JWT_SECRET, and optionally GEMINI_API_KEY
npm install
npm start
```

### Frontend
```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173

## Environment Variables
| Variable | Required | Description |
|---|---|---|
| PORT | No | Server port (default 5000) |
| MONGO_URI | Yes | MongoDB connection string |
| JWT_SECRET | Yes | Secret key for JWT signing |
| GEMINI_API_KEY | No | Google Gemini API key (falls back to keyword detection if absent) |
| CLIENT_URL | No | Frontend URL for CORS (default http://localhost:5173) |

## Demo Mode
After logging in, click the "Demo" button in the top bar to see an automated walkthrough of all 5 workspace transformations.

## Notes
- GEMINI_API_KEY is optional. Without it, the app uses keyword-based intent detection.
- The MongoDB Atlas connection string is pre-configured in server/.env for development.
- AI never executes arbitrary code; it only selects from approved component keys.
