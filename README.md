# 📹 Voxta — Real-Time Messaging & Video Calling App

**Voxta** is a modern, full-stack web application that enables **real-time chat**, **1-on-1 video calls**, and **screen sharing**, built for scalability and collaboration. Designed with 32 unique UI themes and a multilingual approach, Voxta is ideal for global language exchange and virtual meetups.

---

## 🌟 Highlights

- 🌐 Real-time Messaging with Typing Indicators & Reactions
- 📹 1-on-1 and Group Video Calls with Screen Sharing & Recording
- 🔐 JWT Authentication & Protected Routes
- 🌍 Language Exchange Platform with 32 Unique UI Themes
- ⚡ Tech Stack: React + Express + MongoDB + TailwindCSS + TanStack Query
- 🧠 Global State Management with Zustand
- 🚨 Robust Error Handling (Frontend & Backend)
- 🚀 Free Deployment (Vercel + Render Ready)
- 🎯 Built with Scalable Technologies like [Stream](https://getstream.io/)
- ⏳ And much more!

---

## 🧪 Environment Variables Setup

Create a `.env` file in both `backend/` and `frontend/`:

### 📦 Backend (`/backend/.env`)
```env
PORT=5001
MONGO_URI=your_mongo_uri
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
JWT_SECRET_KEY=your_jwt_secret
NODE_ENV=development
````

### 💻 Frontend (`/frontend/.env`)

```env
VITE_STREAM_API_KEY=your_stream_api_key
```

---

## ⚙️ Getting Started

### 🔧 Backend Setup

```bash
cd backend
npm install
npm run dev
```

Make sure your MongoDB URI and Stream credentials are configured in the `.env` file.

---

### 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will start on `http://localhost:5173` by default.

---

## 🛠️ Tech Stack

| Layer     | Technologies                                      |
| --------- | ------------------------------------------------- |
| Frontend  | React, Vite, TailwindCSS, Zustand, TanStack Query |
| Backend   | Node.js, Express, JWT, MongoDB (Mongoose)         |
| Real-time | WebSockets, Stream Chat, WebRTC                   |
| Dev Tools | ESLint, PostCSS, Vite, dotenv                     |

---

## 📁 Project Structure

```
voxta-video-call-main/
├── backend/
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       ├── middleware/
│       └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   └── vite.config.js
```

---

## 🌐 Live Demo

👉 [**Remova App Live**](https://voxta-28o4.onrender.com/)

---

## 👤 Author

Built by [@borugaddaebenezer](https://github.com/borugaddaebenezer)

---

> [LinkedIn](www.linkedin.com/in/ebenezer-borugadda-5481242b6) • [Portfolio](https://yourportfolio.com)
