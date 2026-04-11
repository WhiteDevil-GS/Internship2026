# CRUD_Lab

Backend-only **Express + MongoDB + Mongoose** project demonstrating **MVC** structure and full **CRUD** for a `User` model (`name`, `email`, `password`, `role`).

## What this lab covers

- **Models** — Mongoose schema and validation
- **Controllers** — Async handlers with consistent JSON responses
- **Routes** — REST endpoints with `express-validator`
- **Middleware** — Centralized error handling and validation bridge

> **Note:** Passwords are stored as **plain text** here on purpose so the focus stays on CRUD patterns. For **bcrypt + JWT**, use `Secure_Login` and `Connect_Stack`.

## Prerequisites

- Node.js **18+**
- MongoDB running locally or a MongoDB Atlas URI

## Setup

```bash
cd CRUD_Lab
cp .env.example .env
# Edit .env — set MONGODB_URI and PORT if needed
npm install
```

## Run

```bash
# development (Node watch mode, Node 18+)
npm run dev

# production-style
npm start
```

Default URL: `http://localhost:4001`

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| POST | `/api/users` | Create user |
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get one user |
| PATCH | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Example: create user

```bash
curl -X POST http://localhost:4001/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Ada\",\"email\":\"ada@example.com\",\"password\":\"secret12\",\"role\":\"user\"}"
```

## Project layout

```
src/
  config/db.js
  models/User.js
  controllers/userController.js
  routes/userRoutes.js
  middleware/errorHandler.js
  middleware/validate.js
  app.js
  server.js
```
