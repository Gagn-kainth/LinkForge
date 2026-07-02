# LinkForge

A self-hosted URL shortener with click tracking, QR codes, and email/password
accounts. Paste a long link, get a short one back. Sign up to save every link
you create to your own dashboard — with click counts that stay live and a
delete button for links you no longer need.

```
https://a-very-long-url.example.com/with/nested/paths?and=params   →   linkforgebygg.vercel.app/aB3xQ9pL
```

**Live demo:** [linkforgebygg.vercel.app](https://linkforgebygg.vercel.app/)

## Features

- **Shorten any URL** into a random 8-character code — works with or without an account
- **Email/password accounts** — sign up, log in, stay logged in across visits
- **Personal dashboard** — logged-in users see only the links they created
- **Click tracking** that updates automatically when you switch back to the tab, no manual refresh needed
- **Delete your own links**, with a confirmation prompt before removal
- **QR codes** generated client-side for every short link
- **One-click copy** for short links

## Tech stack

| | |
|---|---|
| **Frontend** | React (Vite), React Router, plain CSS, [`qrcode.react`](https://www.npmjs.com/package/qrcode.react) |
| **Backend** | Node.js, Express, JWT auth (`jsonwebtoken`, `bcryptjs`) |
| **Database** | MongoDB (via Mongoose) |
| **Short-code generation** | [`nanoid`](https://www.npmjs.com/package/nanoid) |
| **Deployment** | Vercel (frontend) · Render (backend) · MongoDB Atlas (database) |

## Project structure

```
linkforge/
├── backend/
│   ├── controllers/
│   │   ├── url.js           # shorten, redirect, analytics, list/delete my links
│   │   └── auth.js          # signup, login, session check
│   ├── middleware/auth.js   # requireAuth / optionalAuth (JWT verification)
│   ├── models/
│   │   ├── url.js           # short link schema (optionally linked to a user)
│   │   └── user.js          # account schema (email + hashed password)
│   ├── routes/
│   │   ├── url.js
│   │   └── auth.js
│   ├── connect.js
│   └── index.js
└── frontend/
    └── src/
        ├── api.js                  # every backend call lives here
        ├── context/AuthContext.jsx # logged-in user, login/signup/logout
        ├── hooks/useShortener.js   # shortener state, data fetching, delete, auto-refresh
        ├── pages/                  # HomePage, LoginPage, SignupPage
        └── components/             # Hero, ShortenForm, ResultCard, LinkLog, Navbar, AuthForm
```

See [`HOW-IT-WORKS.md`](./HOW-IT-WORKS.md) for a line-by-line breakdown of the
shortening flow, and [`AUTH-AND-DEPLOYMENT.md`](./AUTH-AND-DEPLOYMENT.md) for
how the auth system works and full deploy instructions.

## Getting started locally

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [MongoDB](https://www.mongodb.com/try/download/community) running locally on the default port (`27017`)

### 1. Clone and install

```bash
git clone https://github.com/<your-username>/linkforge.git
cd linkforge
```

### 2. Backend

```bash
cd backend
cp .env.example .env
# open .env and set JWT_SECRET to any long random string
npm install
npm run dev
```

Starts the API on `http://localhost:8001`.

### 3. Frontend

In a separate terminal:

```bash
cd frontend
npm install
npm run dev
```

Opens the app on `http://localhost:5173`.

## Deploying it live

Full step-by-step instructions (MongoDB Atlas + Render + Vercel) are in
[`AUTH-AND-DEPLOYMENT.md`](./AUTH-AND-DEPLOYMENT.md). The live demo above is
deployed exactly that way.

## API reference

### Links

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/url` | optional | Create a short link. Body: `{ "url": "https://..." }` → `{ "id": "aB3xQ9pL" }`. If logged in, the link is saved to your account. |
| `GET` | `/url/mine` | required | List your own short links, newest first |
| `DELETE` | `/url/:shortId` | required | Delete one of your own links. 404 if it doesn't exist or isn't yours. |
| `GET` | `/url/:shortId` | none | Redirect to the original URL and log a visit |
| `GET` | `/url/analytics/:shortId` | none | Get total clicks and visit history for one link |

### Auth

| Method | Route | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/signup` | none | Body: `{ "email", "password" }` → `{ "token", "user" }` |
| `POST` | `/auth/login` | none | Body: `{ "email", "password" }` → `{ "token", "user" }` |
| `GET` | `/auth/me` | required | Confirms a saved token is still valid, returns the current user |

Send the token from signup/login as `Authorization: Bearer <token>` on any
authenticated request.

## Roadmap

- [ ] Per-link analytics view (clicks over time) — backend endpoint already exists
- [ ] Custom short codes
- [ ] Password reset flow
- [ ] Google sign-in

## License

[ISC](./LICENSE)
