# Avquint Task App

This repository contains a full-stack task management application with:
- **Frontend**: `client` — Next.js 16 app with authentication, task creation, editing, search, and filters.
- **Backend**: `server` — Express.js API with MongoDB, JWT authentication, and task CRUD endpoints.

## Repository Layout

- `client/`
  - Next.js application using the App Router.
  - Contains `src/app` UI components, pages, context provider, and client-side auth handling.
  - Uses `axios` to call the backend API.
- `server/`
  - Express API server in ESM mode.
  - Uses `mongoose` for MongoDB, `bcryptjs` for password hashing, and `jsonwebtoken` for JWT.
  - Contains auth routes and task routes.

## Requirements

- Node.js 18+ (recommended)
- npm
- MongoDB database

## Setup

### 1. Backend

1. Create a `.env` file in `server/` with at least:

```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

2. Install dependencies and start the server:

```bash
cd server
npm install
npm run dev
```

The backend will run on `http://localhost:5000` by default.

### 2. Frontend

1. Install dependencies and start the client:

```bash
cd client
npm install
npm run dev
```

2. Open the app in your browser at `http://localhost:3000`.

### Optional frontend env variables

If your backend runs on a custom host or port, set:

```env
NEXT_PUBLIC_API_BASE=http://localhost:5000
NEXT_PUBLIC_API_TOKEN=
```

## Usage

- The app opens to the `/register` page by default.
- After registering, users are redirected to the dashboard.
- The dashboard includes task search, filters, add/edit task flow, and logout.
- The task endpoints are protected by JWT, so login/register is required.

## Scripts

### Client

From `client/`:

- `npm run dev` — start Next.js in development mode
- `npm run build` — build for production
- `npm run start` — start the production server

### Server

From `server/`:

- `npm run dev` — start Express with `nodemon`
- `npm run start` — start Express normally

## Notes

- Login and registration store the JWT token in `localStorage`.
- The backend uses `authRoutes` and `taskRoutes` under `/api/auth` and `/api/tasks`.
- Task filtering and search are handled on the client via context state.

## Troubleshooting

- If the client cannot reach the server, verify `NEXT_PUBLIC_API_BASE` and the server port.
- If registration/login fails, confirm `MONGO_URI` and `JWT_SECRET` are set correctly.

## License

This project does not include a license file.
