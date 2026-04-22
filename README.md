# 🎭 FEA WebApp — AI Content & Emotion Tailoring Platform

> A full-stack web application that combines AI-powered content generation with real-time facial expression analysis to deliver a dynamically personalised user experience.

## 📖 Overview

FEA WebApp (Facial Expression Analysis) bridges the gap between content generation and emotional intelligence. By detecting a user's real-time facial expressions via webcam, the application dynamically tailors the content it presents — ensuring every interaction feels relevant, engaging, and emotionally resonant.

Whether you're building an adaptive learning tool, a mood-aware media platform, or an emotionally intelligent UI prototype, this project serves as a robust foundation.

---

## ✨ Features

- **AI Content Generation** — Produces creative, contextually relevant content using advanced AI models.
- **Real-Time Emotion Detection** — Analyses live facial expressions through the browser webcam feed to infer the user's current emotional state.
- **Adaptive Content Tailoring** — Combines emotion signals with content generation to serve output that matches the user's mood and preferences in real time.
- **Responsive UI** — A clean, interactive React frontend optimised for a seamless user experience across devices.
- **REST API Backend** — A lightweight Express server handles AI model interactions, routing, and data processing.

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, CSS |
| Backend | Node.js, Express |
| AI / ML | Proprietary models for content generation & emotion detection |
| Deployment | Vercel (frontend) |

---

## 📁 Project Structure

```
project-fea-webapp/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page-level views
│   │   └── App.js        # Root component
│   └── package.json
├── server/               # Node.js / Express backend
│   ├── routes/           # API route handlers
│   ├── controllers/      # Business logic
│   └── index.js          # Server entry point
├── package.json          # Root dependencies / scripts
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) v16 or higher
- [npm](https://www.npmjs.com/) v8 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/xCamelot2001/project-fea-webapp.git
   cd project-fea-webapp
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

4. **Install server dependencies**

   ```bash
   cd ../server
   npm install
   ```

### Running Locally

From the project root, start both the client and server concurrently:

```bash
npm run dev
```

Or start them separately:

```bash
# Terminal 1 — Backend
cd server
npm start

# Terminal 2 — Frontend
cd client
npm start
```

The app will be available at `http://localhost:3000` by default.

---

## 🌐 Deployment

The frontend is deployed on **Vercel**. You can view the live application here:

🔗 [https://project-fea-webapp-xcamelot2001s-projects.vercel.app](https://project-fea-webapp-xcamelot2001s-projects.vercel.app)

To deploy your own fork, connect the repository to [Vercel](https://vercel.com) and set the root directory to `client`.

---

## 🤝 Contributing

Contributions are welcome! To get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please ensure your code follows the existing style and that any new features are appropriately documented.

---

## 📄 Licence

This project is open source.

---

## 👤 Author

**Hossein Masjedi** ([@xCamelot2001](https://github.com/xCamelot2001))

---

*Built with ❤️ and a lot of React hooks.*
