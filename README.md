# 🎙️ SpeechScribe — Speech to Text App

A web application that converts spoken audio into written text in real-time using AI.

## 🌐 Live Demo
- **Frontend:** https://speech-to-text-app-liard-alpha.vercel.app
- **Backend:** https://speech-to-text-backend-f19n.onrender.com

## ✨ Features
- 🎤 Real-time voice recording
- 📝 AI-powered speech to text (Deepgram)
- 💾 Save transcripts to database
- 📋 View transcript history
- 🔐 User authentication
- 📥 Export transcripts as .txt
- 🗑️ Delete transcripts

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- Tailwind CSS
- Supabase Auth

### Backend
- Flask (Python)
- Deepgram API
- Supabase Database

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.12+
- Supabase account
- Deepgram account

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Environment Variables

#### Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://127.0.0.1:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

#### Backend (.env)
DEEPGRAM_API_KEY=your_deepgram_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_secret_key

## 📁 Project Structure

Speech_to_Text_app/
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── RecorderPanel.jsx
│   │   │   └── TranscriptPanel.jsx
│   │   ├── history/
│   │   │   └── page.jsx
│   │   ├── login/
│   │   │   └── page.jsx
│   │   ├── AuthGuard.jsx
│   │   ├── supabaseClient.js
│   │   └── page.jsx
│   └── package.json
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Procfile
└── README.md

## 👩‍💻 Developer
Built by **Shruti Sutar** as a DevOps & Full Stack learning project.

## 📄 License
MIT License