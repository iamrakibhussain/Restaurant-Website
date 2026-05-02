# Savory Bites Full-Stack Restaurant Website

Savory Bites is now a professional full-stack restaurant project with a React multipage frontend, Express API backend, and PostgreSQL database schema for menu items, reservations, contact messages, testimonials, and gallery images.

## Tech Stack

- React + Vite
- React Router
- Express.js
- PostgreSQL with `pg`
- Workspace scripts for running client and server together

## Project Structure

```text
client/            React multipage frontend
server/            Express API and PostgreSQL access
database/          SQL schema and seed data
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create the backend environment file:

```bash
copy server\.env.example server\.env
```

3. Update `server/.env` with your PostgreSQL credentials.

4. Create a PostgreSQL database named `savory_bites`, then run:

```bash
npm run db:migrate
npm run db:seed
```

5. Start the full project:

```bash
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:5000/api`

## API Routes

- `GET /api/health`
- `GET /api/menu`
- `GET /api/testimonials`
- `GET /api/gallery`
- `POST /api/reservations`
- `POST /api/contact`

