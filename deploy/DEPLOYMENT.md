# WelZone – Free Deployment Guide

Stack: **Vercel** (frontend) + **Render** (Spring Boot backend, Docker) + **Aiven** (free MySQL 8).

Everything needed is in this repo:

| File | Purpose |
|---|---|
| `deploy/schema.sql` | Fresh MySQL schema (matches the code exactly) |
| `deploy/seed.sql` | Demo data (matches the code exactly) |
| `deploy/render.yaml` | Optional one-click Render service definition |
| `WelZoneApp/Dockerfile` | Multi-stage Docker build (Maven + JDK 25) |
| `project_frontend/vercel.json` | SPA rewrites for React Router on Vercel |
| `project_frontend/.env.example` | Frontend env var template |

> Important: `deploy/schema.sql` + `deploy/seed.sql` are the CORRECT versions. The old
> `WelZoneApp/mysql/*.sql` files are outdated (wrong table/column names) – do not use them.

---

## Step 1 – Push the deploy changes

Commit and push the new files (schema, seed, Dockerfile, config changes):

```bash
git add -A
git commit -m "Add free deployment setup (Vercel, Render, Aiven)"
git push origin main
```

---

## Step 2 – Create the free MySQL database (Aiven)

1. Go to https://console.aiven.io/ and sign up.
2. **Create a new service** → **MySQL** → pick the free **Hobbyist** plan (free forever, 5 GB).
3. Wait for the service to be `RUNNING`.
4. Open **Service settings** → **Advanced configuration**:
   - Add `max_connections` = `50` (Hobbyist default can be low).
5. In the service **Overview**, copy:
   - **Host** (e.g. `mysql-xxxxxxxx.aivencloud.com`)
   - **Port** (e.g. `15493`)
6. **Databases & users**: the default `defaultdb` is fine; create a user + password (or use the
   admin user). Keep a note of the username/password.

7. Load the schema + seed. Use your MySQL client with `--ssl-mode=REQUIRED`:

```bash
mysql --ssl-mode=REQUIRED -h HOST -P PORT -u USER -p < deploy/schema.sql
mysql --ssl-mode=REQUIRED -h HOST -P PORT -u USER -p < deploy/seed.sql
```

(`schema.sql` creates the `welzoneapp` database itself – if you instead use Aiven's `defaultdb`,
edit `schema.sql` and remove the `CREATE DATABASE` + `USE` lines.)

---

## Step 3 – Deploy the backend (Render)

1. Go to https://render.com/ and sign up.
2. **New** → **Web Service** → connect the `muffin-5/WelZone` GitHub repo.
3. Render detects the project – configure:
   - **Name**: `welzone-backend`
   - **Root Directory**: `WelZoneApp`
   - **Environment**: `Docker`
   - **Dockerfile**: `Dockerfile` (Render finds it in the root directory)
   - **Instance Type**: Free
   - **Health Check Path**: `/`
4. Add these **Environment Variables**:
   - `DB_URL` = `jdbc:mysql://HOST:PORT/welzoneapp?ssl-mode=REQUIRED&useSSL=true&serverTimezone=UTC`
   - `DB_USERNAME` = your Aiven MySQL user
   - `DB_PASSWORD` = your Aiven MySQL password
   - `JWT_SECRET` = a long random string (e.g. from `openssl rand -hex 32`)
   - `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app` (add your Vercel URL, comma-separated for more)
5. **Create Web Service** → wait for the first build (5–10 min on free tier).
6. Copy the backend URL (e.g. `https://welzone-backend.onrender.com`).

> Free-tier caveat: Render spins the service down after ~15 min idle. The first request
> after idle takes ~1 min to wake it back up. This is fine for a resume demo.

---

## Step 4 – Deploy the frontend (Vercel)

1. Go to https://vercel.com/ and sign up (or continue with GitHub).
2. **Add New Project** → import `muffin-5/WelZone`.
3. In **Root Directory**, select `project_frontend`.
4. Vercel auto-detects Vite:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add the environment variable (Production):
   - `VITE_API_URL` = `https://welzone-backend.onrender.com` (your Render URL)
6. **Deploy**. Copy the app URL (e.g. `https://welzone-project.vercel.app`).
7. Update the backend env var:
   - `CORS_ALLOWED_ORIGINS` = your Vercel URL → Render **deploys automatically** on save.

---

## Step 5 – Verify

- Open your Vercel URL → you should see the landing page.
- Log in as a user: `alice` / `password123` (or register a new account).
- Log in as a counselor: `dr_maya` / `password123`.
- Book a session, chat, etc. – all traffic goes to your Render backend + Aiven DB.

---

## Useful commands / notes

- Backend health check: `GET https://welzone-backend.onrender.com/` → `{"status":"ok"}`.
- The JWT interceptor blocks everything except `POST /api/users/login`,
  `POST /api/counselors/login`, `POST /api/users/register`, `POST /api/counselors`,
  `OPTIONS` preflight, and `GET /`.
- Passwords are stored in plaintext in the DB (matches the code's `WHERE username = ? AND password = ?`).
- Updating the backend: push to `main` → Render auto-redeploys. Updating frontend: push to `main` → Vercel auto-redeploys (rebuild with the new `VITE_API_URL` if it changed).
