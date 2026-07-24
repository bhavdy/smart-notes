# 📝 Smart Notes Management System

A full-stack **Smart Notes Management System** built with Java 21 / Spring Boot 3 (backend) and React 18 / Vite (frontend), secured with JWT authentication, featuring a rich admin portal, note organization tools, reminders, labels, calendar view, and dark mode.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router v6, Axios |
| Styling | Vanilla CSS (Glassmorphism, Dark Mode, Animations) |
| Backend | Java 21, Spring Boot 3, Spring Security 6 |
| Auth | JWT (JSON Web Tokens) |
| Database | MySQL 8 |
| ORM | Spring Data JPA / Hibernate |
| Testing | JUnit 5, Mockito |
| Deployment | Docker, Docker Compose |

---

## 📁 Project Structure

```
akanksh-project/
├── frontend/          # React + Vite frontend
├── backend/           # Spring Boot 3 backend
├── docker-compose.yml
├── .env.example
├── README.md
└── DEPLOYMENT.md
```

---

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- Java 21 (JDK)
- Maven 3.9+
- MySQL 8 (or Docker)

### 1. Clone & Setup Environment
```bash
cp .env.example .env
# Edit .env with your credentials
```

### 2. Start with Docker (Recommended)
```bash
docker compose up --build
```
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html

### 3. Manual Setup

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@smartnotes.com | Admin@123 |
| User | user@smartnotes.com | User@123 |

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT token |
| GET | `/api/notes` | Get all user notes |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/{id}` | Update note |
| DELETE | `/api/notes/{id}` | Delete note |
| GET | `/api/admin/users` | Admin: list all users |

Full API docs available at `/swagger-ui.html` when running.

---

## ✨ Features

- 🔐 JWT Authentication & Role-based Authorization
- 📝 Rich Text Note Editor (Quill.js)
- 🏷️ Labels & Color Tags
- ⏰ Reminders with due dates
- 📅 Calendar View
- ⭐ Favorites, Archive & Trash
- 🔍 Full-text Search
- 🌙 Dark / Light Mode
- 👨‍💼 Admin Portal (User management, Reports, Logs)
- 📱 Fully Responsive Design

---

## 🧪 Running Tests

```bash
# Backend tests
cd backend && mvn test

# Frontend build check
cd frontend && npm run build
```
