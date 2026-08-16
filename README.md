# WelZone – Mental Wellness Counselling Platform

A full-stack mental-wellness platform that connects users with professional counsellors. Users book one-on-one sessions, chat with counsellors, track their mood and sleep, take wellness courses, and read counsellor-authored blogs. Counsellors manage availability, review bookings, and deliver guided content.

> **Live demo:** https://wel-zone.vercel.app
> **User login:** `alice` / `password123` · **Counsellor login:** `dr_maya` / `password123`

---

## Table of Contents

- [Highlights](#highlights)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Features](#features)
- [Getting Started](#getting-started)
- [Demo Accounts](#demo-accounts)
- [Database Schema](#database-schema)
- [API Overview](#api-overview)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Security](#security)
- [Performance & Reliability](#performance--reliability)
- [Roadmap](#roadmap)

---

## Highlights

- **Two-role system** – Users and Counsellors with separate dashboards, flows, and access control (enforced on both client and server).
- **JWT-based stateless authentication** – signed HS384 tokens with a custom Spring MVC interceptor (no bloated security framework).
- **Real booking lifecycle** – counsellors create availability slots; users book, cancel, attend, and rate sessions.
- **18 relational tables** – carefully normalized schema with FK constraints, ON DELETE CASCADE rules, and audit logging.
- **Deployed to production** on free tiers: Vercel + Render (Docker) + Aiven MySQL.

---

## Tech Stack

### Frontend
| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Styling | Tailwind CSS 3 (custom design system) |
| Routing | React Router 6 (protected routes per role) |
| HTTP | Axios (central JWT interceptor) |
| Charts | Chart.js + react-chartjs-2 |

### Backend
| Layer | Technology |
|---|---|
| Runtime | Java 25 |
| Framework | Spring Boot 4.1 |
| Data Access | Spring JDBC (`JdbcTemplate`) – explicit SQL, no ORM |
| Auth | JWT (jjwt 0.12.6), custom `HandlerInterceptor` |
| Real-time | Spring WebSocket |
| Build | Maven |

### Infrastructure
| Layer | Technology |
|---|---|
| Database | MySQL 8 (utf8mb4) |
| Frontend host | Vercel |
| Backend host | Render (Docker) |
| Database host | Aiven (free tier) |

---

## Architecture

```
┌────────────────────────────┐         ┌──────────────────────────────────────────┐
│  React SPA (Vercel)        │  HTTPS  │  Spring Boot API (Render)                │
│                            │────────▶│                                          │
│  • ProtectedRoute guard    │  JWT    │  Controllers → Services → Repositories   │
│  • Axios auth interceptor  │ Bearer  │  (JdbcTemplate) → MySQL 8 (Aiven)        │
│  • Tailwind design system  │◀────────│  JwtAuthInterceptor guards all routes    │
└────────────────────────────┘         └──────────────────────────────────────────┘
```

- **Three-tier**: Presentation (React SPA) → Business/API (Spring Boot REST) → Data (MySQL).
- **Stateless auth**: the backend never stores sessions; every request is validated by a JWT in the `Authorization` header.
- **Explicit SQL**: repositories hand-write parameterized SQL – giving full control over joins, projections (e.g. slot + user + counsellor denormalized DTOs), and FK cascade behavior.

---

## Features

### Users
- Register / log in with JWT session
- Browse counsellors, view profiles, specializations, ratings
- Book / cancel counselling sessions from counsellor availability slots
- Secure chat with the counsellor for a booked session
- Mood tracking with daily check-ins and progress charts
- Sleep-quality logging and affirmation content
- Enroll in wellness courses
- Read counsellor blogs (reading time tracked)
- Submit session feedback with ratings

### Counsellors
- Role-specific dashboard with live stats (booked / open / total slots)
- Create availability slots; view all slots with the booking user's details
- Delete slots (cascades chat, feedback, and session logs)
- Secure chat with members who booked
- Author blogs and manage courses

### Platform-wide
- JWT auth + role-based route protection on both client and server
- Audit logging of key actions
- Consistent design system (sage/peach palette, custom cards, toasts)
- Responsive layouts

---

## Getting Started

### Prerequisites
- JDK 25 (required – the project compiles with `release 25`)
- Maven (or use the included `mvnw` wrapper)
- Node.js 18+
- MySQL 8 (local instance)

### 1. Set up the database

```sql
-- Create and populate the database
source deploy/schema.sql   -- creates `welzoneapp` DB + 18 tables
source deploy/seed.sql     -- demo users, counsellors, slots, courses
```

### 2. Run the backend

```bash
cd WelZoneApp
mvn spring-boot:run
# or: ./mvnw spring-boot:run
```

The API starts at `http://localhost:8080`. Default DB credentials are configurable via env vars (see below).

### 3. Run the frontend

```bash
cd project_frontend
npm install
npm run dev
```

The app is served at `http://localhost:5174`.

### Environment variables (all optional – sensible defaults exist)

| Variable | Default | Purpose |
|---|---|---|
| `DB_URL` | `jdbc:mysql://localhost:3306/welzoneapp` | JDBC connection string |
| `DB_USERNAME` | `root` | DB user |
| `DB_PASSWORD` | – | DB password |
| `JWT_SECRET` | dev fallback | HMAC secret for token signing |
| `JWT_EXPIRATION_MS` | `86400000` (24h) | Token lifetime |
| `PORT` | `8080` | Server port |
| `CORS_ALLOWED_ORIGINS` | localhost dev origins | Comma-separated allowed origins |
| `VITE_API_URL` (frontend) | `http://localhost:8080` | Backend base URL |

---

## Demo Accounts

| Role | Username | Password |
|---|---|---|
| User | `alice` | `password123` |
| User | `bob` | `password123` |
| User | `carol` | `password123` |
| Counsellor | `dr_maya` | `password123` |
| Counsellor | `dr_rahul` | `password123` |

---

## Database Schema

18 tables, normalized with foreign keys. Highlights:

- `users` / `counselors` – the two actor tables.
- `slots` – counsellor availability + booking state (`counselor_id`, `user_id`, `start_time`, `end_time`, `booked`). The **core join table** for the booking lifecycle.
- `session_logs`, `chat_messages`, `feedback` – hang off `slots.id` (a slot *is* a session).
- `courses`, `course_enrollments`, `qualifications`, `moods`, `daily_mood_log`, `user_mood`, `blog_posts`, `blog_readings`, `comments`.
- `audit_logs` – append-only action log, joined to `feedback_log` / `course_log` / `daily_mood_log`.

Full DDL lives in [`deploy/schema.sql`](deploy/schema.sql).

---

## API Overview

All routes (except login/register/health) require `Authorization: Bearer <token>`.

| Method | Path | Description |
|---|---|---|
| POST | `/api/users/login` | User login → JWT |
| POST | `/api/counselors/login` | Counsellor login → JWT |
| POST | `/api/users/register` | User registration |
| POST | `/api/counselors` | Counsellor registration |
| GET | `/api/users/id/{id}` | User profile |
| GET | `/api/counselors/id/{id}` | Counsellor profile |
| GET | `/slots/available` | Open slots (all counsellors) |
| GET | `/slots/available/{counselorId}` | Open slots for one counsellor |
| GET | `/slots/booked/{counselorId}` | Booked slots for a counsellor |
| GET | `/slots/bookedbyme/{userId}` | Slots booked by a user |
| GET | `/slots/all/{counselorId}` | All slots + booking user details |
| POST | `/slots/create` | Create availability slot |
| POST | `/slots/book/{slotId}/user/{userId}` | Book a slot |
| POST | `/slots/cancel/{slotId}` | Cancel a booking |
| DELETE | `/slots/{slotId}` | Delete slot (cascades children) |
| GET | `/chat/messages/{sessionId}` | Chat history for a session |
| POST | `/chat/send` | Send a chat message |
| GET | `/courses` / `/enrollments/{userId}` | Courses & enrollment |
| GET | `/blogs/all` | Blog posts |
| GET | `/api/feedback/{sessionId}` | Feedback for a session |
| POST | `/api/feedback` | Submit feedback |
| GET | `/user-moods/{userId}` | Mood history |
| GET | `/` | Health check |

---

## Deployment

The project is configured for a fully free production deployment:

| Component | Host | Details |
|---|---|---|
| Frontend | Vercel | Vite SPA, `VITE_API_URL` env var, SPA rewrites |
| Backend | Render | Docker (multi-stage Maven + JDK 25 → JRE 25) |
| Database | Aiven | Free MySQL 8 |

Production URLs are injected via environment variables – no code changes needed. See [`deploy/DEPLOYMENT.md`](deploy/DEPLOYMENT.md) for the full step-by-step guide and [`deploy/render.yaml`](deploy/render.yaml) for the service definition.

> Note: Render's free tier sleeps after ~15 min of inactivity; the first request after idle takes ~1 min to wake the service.

---

## Project Structure

```
WelZone-main/
├── deploy/                     # Deployment artifacts
│   ├── schema.sql              # Fresh DDL (source of truth)
│   ├── seed.sql                # Demo data
│   ├── render.yaml             # Render service definition
│   └── DEPLOYMENT.md           # Deploy guide (Vercel + Render + Aiven)
├── WelZoneApp/                 # Spring Boot backend
│   ├── Dockerfile              # Multi-stage build
│   └── src/main/java/com/dbms/WelZoneApp/
│       ├── controller/         # REST endpoints
│       ├── service/            # Business logic
│       ├── repository/         # JdbcTemplate data access
│       ├── model/              # Domain + DTO models
│       ├── config/             # CORS, JWT interceptor, WebSocket
│       └── util/               # JWT signing/validation
└── project_frontend/           # React + Vite frontend
    └── src/
        ├── components/         # Page components
        └── main.jsx            # App entry + axios JWT interceptor
```

---

## Security

- **JWT authentication**: HS384-signed tokens (`sub` = user id, `role` claim, 24h expiry). Validated by a custom `HandlerInterceptor` before every non-public route – 401 JSON on missing/invalid/expired tokens.
- **Parameterized SQL** (`JdbcTemplate`) – no string-concatenated queries, immune to SQL injection.
- **Client-side route guarding** via `ProtectedRoute` with role checks, plus server-side enforcement (defense in depth).
- **CORS** restricted to an explicit allow-list from env config.
- Secrets (DB credentials, JWT secret) supplied via environment variables, never committed.

---

## Performance & Reliability

- **Purpose-built queries**: multi-table `JOIN` projections return denormalized DTOs (slot + user + counsellor) in a single query instead of N+1 round-trips.
- **Indexed foreign keys** on every join column.
- **Graceful degradation**: chat falls back to HTTP polling every 5s; frontend components handle empty/error states.
- **Lazy wake**: free-tier hosting sacrifices cold-start latency for zero cost – acceptable for a demo/portfolio.

---

## Roadmap

- [ ] WebSocket push for chat (replace polling with server-push)
- [ ] OAuth 2.0 (Google sign-in) alongside JWT email/password
- [ ] Video-call integration for live sessions
- [ ] Password hashing (bcrypt) and password reset flow
- [ ] Rate limiting and request throttling
- [ ] Pagination + caching for blogs and courses

---

## License

Course project – educational use.