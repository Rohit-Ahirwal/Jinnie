# Jinnie

<p align="center">
  AI-powered software engineering assistant that helps developers understand, analyze, and work with their codebases.
</p>

---

## Overview

Jinnie is an AI software engineering assistant designed to help developers understand their projects faster.

Instead of manually searching through large codebases, Jinnie connects with your GitHub repositories and provides an intelligent interface to explore, analyze, and interact with your code.

The goal of Jinnie is to make software development easier by giving developers a deeper understanding of their own codebases.

---

## Current Features

### 🔐 Authentication

- Secure user authentication
- User session management
- Protected application routes

---

### GitHub Integration

- Connect GitHub account securely
- Fetch user's repositories
- View available repositories
- Search repositories
- Select repository for analysis

---

### Repository Management

- Repository selection workflow
- Repository connection system
- Repository dashboard
- Repository status tracking

---

### Dashboard

- Repository overview
- Repository statistics
- Connected repository cards
- Responsive dashboard layout

---

### UI / Experience

- Modern responsive interface
- Dark mode support
- Smooth animations with Framer Motion
- Component-based UI architecture

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

### Backend

- FastAPI
- Python
- PostgreSQL

### Authentication

- Clerk

### Integrations

- GitHub OAuth API

---

## Architecture

```
Jinnie

Frontend
  |
  | API Requests
  |
FastAPI Backend
  |
  |
PostgreSQL Database
  |
  |
GitHub API
```

---

## Project Structure

```
jinnie/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/

├── backend/
│   ├── routers/
│   ├── models/
│   ├── schemas/
│   └── services/

└── README.md
```

---

## Development Setup

### Requirements

- Node.js
- Python 3.12+
- PostgreSQL
- GitHub OAuth Application

---

## Environment Variables

### Frontend

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

---

### Backend

Create `.env`

```env
DATABASE_URL=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
CLERK_SECRET_KEY=
```

---

## Running Locally

### Frontend

```bash
cd apps/web

npm install

npm run dev
```

---

### Backend

```bash
cd apps/api

pip install -r requirements.txt

fastapi dev
```

---

## Roadmap

### Repository Intelligence

- [ ] Clone connected repositories
- [ ] Analyze project structure
- [ ] Understand dependencies
- [ ] Generate codebase maps

### AI Code Assistant

- [ ] Chat with your repository
- [ ] Explain code
- [ ] Find files and functions
- [ ] Suggest improvements

### Code Intelligence

- [ ] Semantic code search
- [ ] Dependency analysis
- [ ] Architecture understanding
- [ ] Issue detection

### Developer Experience

- [ ] Background analysis jobs
- [ ] Real-time analysis progress
- [ ] Team collaboration
- [ ] More integrations

---

## Contributing

Contributions, ideas, and feedback are welcome.

If you want to contribute:

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push your branch

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

---

## License

This project is currently under development.
License information will be added later.

---

## Author

Built with ❤️ while exploring AI, software engineering, and developer tools.