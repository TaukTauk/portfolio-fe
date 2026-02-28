# Portfolio — Personal Portfolio Website

Tauk Tauk Lin's personal portfolio website built with Vue 3 and TypeScript.
Features an AI chat assistant powered by a RAG backend, dark/light mode, and project showcase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Vue 3 + TypeScript |
| Build Tool | Vite |
| UI Components | Vuetify 3 |
| Styling | Tailwind CSS |
| State Management | Pinia |
| Routing | Vue Router |
| Icons | Material Design Icons |
| HTTP | Fetch API |
| UUID | uuid |

---

## Features

- **AI Chat Assistant** — RAG-powered chat that answers questions about projects and background
  - Typewriter response animation
  - Follow-up question suggestions
  - Persistent chat history via localStorage
  - Session management with clear conversation option
- **Dark / Light Mode** — toggle with localStorage persistence
- **Project Showcase** — detailed project pages with tech stack, architecture, and GitHub links
- **Experience Section** — professional and 42 School project timeline
- **Contact Section** — links and availability status
- **Responsive Design** — mobile and desktop layouts
- **Security Headers** — CSP and security headers via vercel.json

---

## Project Structure

```
front_end/
├── public/
│   └── photos/              # Project images
├── src/
│   ├── assets/              # Global styles, fonts
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.vue
│   │   │   ├── ProjectsSection.vue
│   │   │   ├── ExperienceSection.vue
│   │   │   └── ContactSection.vue
│   │   └── ui/              # Reusable UI components
│   │       ├── AiChat.vue   # AI chat widget
│   │       ├── NavBar.vue
│   │       └── ...
│   ├── data/
│   │   └── projects.ts      # Project data
│   ├── stores/
│   │   ├── theme.ts         # Dark/light mode store
│   │   └── chat.ts          # Chat state + localStorage persistence
│   ├── views/
│   │   ├── HomeView.vue
│   │   └── ProjectDetail.vue
│   ├── router/
│   │   └── index.ts
│   ├── App.vue
│   └── main.ts
├── .env                     # Local environment variables
├── .env.production          # Production environment variables
├── vercel.json              # Vercel config + security headers
├── index.html
├── vite.config.ts
└── package.json
```

---

## Setup and Installation

### Prerequisites
- Node.js 18+
- Backend API running (see [portfolio-ai](../portfolio-ai/README.md))

### 1. Clone and install
```bash
git clone https://github.com/yourusername/portfolio.git
cd front_end
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_AI_API_URL=http://localhost:8000
VITE_API_KEY=your-backend-api-key
```

### 3. Run development server
```bash
npm run dev
```

Visit http://localhost:5173

### 4. Build for production
```bash
npm run build
```

---

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| `VITE_AI_API_URL` | Backend API base URL | `https://api.yourdomain.com` |
| `VITE_API_KEY` | API key for backend auth | `abc123...` |

> **Note:** `VITE_` prefixed variables are embedded in the JS bundle at build time. They are not secret — do not put sensitive credentials here. The API key provides basic access control, not secrets protection.

---

## Deployment to Vercel

### 1. Push to GitHub
Make sure your repository is on GitHub.

### 2. Import to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Set **Root Directory** to `front_end` (if frontend is in a subdirectory)
4. Framework preset will auto-detect as **Vite**

### 3. Set environment variables in Vercel
In Vercel project settings → Environment Variables, add:
```
VITE_AI_API_URL = https://api.yourdomain.com
VITE_API_KEY    = your-backend-api-key
```

### 4. Deploy
Vercel auto-deploys on every push to `main`.

### 5. Update backend CORS
After deploying, copy your Vercel deployment URL (e.g. `https://yourname.vercel.app`) and update the backend `.env`:
```env
ALLOWED_ORIGINS=https://yourname.vercel.app,https://yourdomain.com
```

Then restart the backend:
```bash
docker compose down && docker compose up -d
```

### vercel.json
Security headers and SPA routing are configured in `vercel.json` at the frontend root:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.yourdomain.com; font-src 'self' https://fonts.gstatic.com;"
        }
      ]
    }
  ]
}
```