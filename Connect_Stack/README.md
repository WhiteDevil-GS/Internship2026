# Connect_Stack (Full MERN)

End-to-end app: **Express + MongoDB + JWT + RBAC** API and **React** SPA.

## Quick start

### 1. MongoDB

Run MongoDB locally or use Atlas. Note the connection string.

### 2. Backend

```bash
cd Connect_Stack/backend
cp .env.example .env
# Set MONGODB_URI, JWT_SECRET, CLIENT_ORIGIN
npm install
npm run dev
```

API: **http://localhost:5000**

Create an admin (optional, for `/admin` UI):

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourStrongPassword
```

```bash
npm run seed:admin
```

### 3. Frontend

```bash
cd Connect_Stack/frontend
cp .env.example .env
npm install
npm run dev
```

App: **http://localhost:5173**

## What to demo

1. Register a normal user → Dashboard shows profile from `/api/users/me/profile`.
2. Log in as seeded admin → Admin panel loads stats + user table.
3. Toggle theme; try protected routes while logged out.

See `backend/README.md` and `frontend/README.md` for API and UI details.
