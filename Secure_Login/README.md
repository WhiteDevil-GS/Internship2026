# Secure_Login

Backend API demonstrating **authentication**: **signup**, **login**, **bcrypt** password hashing, and **JWT** bearer tokens.

Built with **Express**, **Mongoose**, **express-validator**, and **dotenv**.

## Features

- `POST /api/auth/signup` — creates user (password hashed before save)
- `POST /api/auth/login` — returns JWT + safe user object
- `GET /api/auth/me` — **protected**; requires `Authorization: Bearer <token>`
- `CRUD /api/users` — same as CRUD_Lab but passwords are **always hashed** (educational: routes are open; lock them down in `Role_Guard` / `Connect_Stack`)

## Prerequisites

- Node.js **18+**
- MongoDB

## Setup

```bash
cd Secure_Login
cp .env.example .env
# Set MONGODB_URI and a strong JWT_SECRET
npm install
```

## Run

```bash
npm run dev
# or
npm start
```

Default URL: `http://localhost:4002`

## Example requests

**Signup**

```bash
curl -X POST http://localhost:4002/api/auth/signup -H "Content-Type: application/json" -d "{\"name\":\"Dev\",\"email\":\"dev@example.com\",\"password\":\"secret12\"}"
```

**Login**

```bash
curl -X POST http://localhost:4002/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"dev@example.com\",\"password\":\"secret12\"}"
```

**Me (replace TOKEN)**

```bash
curl http://localhost:4002/api/auth/me -H "Authorization: Bearer TOKEN"
```

## Security notes

- Never commit `.env`; use `.env.example` as a template.
- In production, use HTTPS, rotate secrets, and rate-limit auth routes.
