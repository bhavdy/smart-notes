# 🚢 Deployment Guide — Smart Notes Management System

---

## Option 1: Docker Compose (Recommended)

### Prerequisites
- Docker 24+
- Docker Compose v2

### Steps

```bash
# 1. Copy environment config
cp .env.example .env

# 2. Edit credentials in .env
notepad .env

# 3. Build and start all services
docker compose up --build -d

# 4. Check logs
docker compose logs -f

# 5. Stop services
docker compose down
```

**Access:**
- Frontend → http://localhost:3000
- Backend API → http://localhost:8080/api
- Swagger UI → http://localhost:8080/swagger-ui.html

---

## Option 2: Manual Deployment

### Database Setup

```sql
CREATE DATABASE smart_notes;
CREATE USER 'notes_user'@'localhost' IDENTIFIED BY 'notes_pass';
GRANT ALL PRIVILEGES ON smart_notes.* TO 'notes_user'@'localhost';
FLUSH PRIVILEGES;
```

Then run `backend/src/main/resources/schema.sql` to initialize tables.

### Backend

```bash
cd backend
# Configure application.properties or set environment variables
mvn clean package -DskipTests
java -jar target/smart-notes-backend-1.0.0.jar
```

### Frontend

```bash
cd frontend
npm install
npm run build
# Serve the dist/ folder with nginx or any static server
npx serve dist
```

---

## Option 3: Cloud Deployment

### Backend (Railway / Render / AWS EC2)
1. Build Docker image: `docker build -t smart-notes-backend ./backend`
2. Push to Docker Hub or ECR
3. Deploy with environment variables set

### Frontend (Vercel / Netlify)
1. Set `VITE_API_BASE_URL` to your deployed backend URL
2. Run `npm run build`
3. Deploy `dist/` folder

---

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `MYSQL_DATABASE` | Database name | `smart_notes` |
| `MYSQL_USER` | DB username | `notes_user` |
| `MYSQL_PASSWORD` | DB password | `notes_pass` |
| `JWT_SECRET` | JWT signing secret (min 32 chars) | — |
| `JWT_EXPIRATION_MS` | Token expiry in ms | `86400000` (24h) |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8080/api` |

---

## Health Checks

```bash
# Backend health
curl http://localhost:8080/api/health

# Frontend
curl http://localhost:3000
```
