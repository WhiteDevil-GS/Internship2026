# Role_Guard

Extends **Secure_Login** with **role-based authorization**:

- JWT verification middleware (`protect`)
- `requireRole('admin' | 'user' | ...)` for fine-grained access
- **Admin-only** routes under `/api/admin/*`

## Admin API (requires `Authorization: Bearer <admin_jwt>`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/admin/stats` | User counts by role |
| GET | `/api/admin/users` | List users (`?role=user` optional) |
| DELETE | `/api/admin/users/:id` | Delete a user |

Regular users receive **403 Forbidden** on these routes.

## Create an admin account

Signups default to `role: "user"`. Promote an account using the seed script:

Add to `.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=yourStrongPassword
ADMIN_NAME=Site Admin
```

Then:

```bash
cd Role_Guard
npm install
npm run seed:admin
```

## Setup & run

```bash
cd Role_Guard
cp .env.example .env
# Add JWT_SECRET, MONGODB_URI, and optionally ADMIN_* for seeding
npm install
npm run dev
```

Default URL: `http://localhost:4003`

## Test flow

1. `POST /api/auth/signup` as a normal user → JWT with `role: user`
2. Call `GET /api/admin/stats` with that token → **403**
3. Run `npm run seed:admin`, then `POST /api/auth/login` as admin → JWT with `role: admin`
4. `GET /api/admin/stats` → **200** with counts

## Project highlights

- `src/middleware/auth.js` — JWT validation
- `src/middleware/role.js` — RBAC guard
- `src/routes/adminRoutes.js` — chained `protect` + `requireRole('admin')`
