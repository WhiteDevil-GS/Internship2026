# Connect_Stack — Frontend

React 18 (hooks) + **Vite** + **Tailwind CSS** + **Framer Motion** + **React Router** + **Axios**.

## Features

- Login / Signup with client-side validation and API error display
- JWT stored in `localStorage`; Axios interceptor attaches `Authorization`
- Protected routes (`/dashboard`) and admin-only routes (`/admin`)
- Dark / light theme (Tailwind `class` strategy + `localStorage`)

## Setup

```bash
cd Connect_Stack/frontend
cp .env.example .env
# VITE_API_URL should match the backend (default http://localhost:5000)
npm install
npm run dev
```

Open **http://localhost:5173** (ensure the backend is running with matching `CLIENT_ORIGIN`).

## Build

```bash
npm run build
npm run preview   # optional local preview of production build
```

## Project layout

```
src/
  api/client.js          # Axios instance + interceptors
  context/AuthContext.jsx
  context/ThemeContext.jsx
  components/Layout.jsx
  components/ProtectedRoute.jsx
  components/AdminRoute.jsx
  pages/Home.jsx
  pages/Login.jsx
  pages/Signup.jsx
  pages/Dashboard.jsx
  pages/AdminPanel.jsx
  App.jsx
  main.jsx
```
