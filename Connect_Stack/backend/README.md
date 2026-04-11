# Connect_Stack — Backend

Production-style **REST API** combining:

- **CRUD** for `User` (with ownership / admin rules)
- **JWT authentication** (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`)
- **RBAC** — `/api/admin/*` is **admin-only**

## Environment

Copy `.env.example` to `.env` and set:

- `MONGODB_URI`
- `JWT_SECRET` (long random string)
- `CLIENT_ORIGIN` — match your Vite dev server (default includes `http://localhost:5173`)

## Scripts

```bash
npm install
npm run dev        # http://localhost:5000
npm run seed:admin # after setting ADMIN_EMAIL / ADMIN_PASSWORD in .env
```

## Key routes

| Area | Method | Path | Access |
|------|--------|------|--------|
| Auth | POST | `/api/auth/register` | Public |
| Auth | POST | `/api/auth/login` | Public |
| Auth | GET | `/api/auth/me` | Bearer JWT |
| Users | GET | `/api/users/me/profile` | Bearer JWT |
| Users | GET | `/api/users` | Admin |
| Users | POST | `/api/users` | Admin |
| Users | GET/PATCH | `/api/users/:id` | Self or admin |
| Users | DELETE | `/api/users/:id` | Admin |
| Admin | GET | `/api/admin/stats` | Admin |
| Admin | GET | `/api/admin/users` | Admin |
| Admin | DELETE | `/api/admin/users/:id` | Admin |

The React app in `../frontend` expects this API at `VITE_API_URL` (see frontend `.env.example`).
