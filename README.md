# eBudget Backend API

Node.js + Express backend for the eBudget Grocery Tracker app.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB Atlas (via Mongoose)
- **Auth:** JWT + bcryptjs
- **Hosting:** Render

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Create your .env file
cp .env.example .env
# Then edit .env with your real MongoDB URI and secrets

# 3. Run locally
npm run dev
```

## Deploy to Render

1. Push this repo to GitHub
2. Go to render.com > New > Web Service
3. Connect your GitHub repo
4. Set these settings:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Environment:** Node
5. Add environment variables from your .env file
6. Click Deploy

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/entries | Get user entries + budgets |
| PUT | /api/entries | Save user entries + budgets |
| GET | /api/admin/users | List all users (admin) |
| PATCH | /api/admin/approve/:id | Approve user (admin) |
| PATCH | /api/admin/reject/:id | Reject user (admin) |
| DELETE | /api/admin/user/:id | Delete user (admin) |
| GET | /api/health | Health check |

## Frontend

Place `eBudget.html` and `admin.html` in the `/public` folder.
They will be served automatically by the backend.
