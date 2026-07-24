# 🚀 SmartNotes — Project Run Guide

## 📁 Project Directory Structure

```
d:\projects\akanksh project\
│
├── 📁 backend\                        ← Spring Boot 3 (Java 21)
│   ├── 📁 src\main\java\com\smartnotes\
│   │   ├── 📄 SmartNotesApplication.java   ← MAIN entry point
│   │   ├── 📁 entity\                      ← Database models
│   │   ├── 📁 controller\                  ← REST APIs
│   │   ├── 📁 service\                     ← Business logic
│   │   ├── 📁 repository\                  ← Database queries
│   │   └── 📁 security\                    ← JWT Auth
│   ├── 📁 src\main\resources\
│   │   ├── 📄 application.properties       ← DB connection config
│   │   └── 📄 schema.sql                   ← Tables + seed data
│   └── 📄 pom.xml                          ← Maven dependencies
│
├── 📁 frontend\                       ← React 18 + Vite
│   ├── 📁 src\
│   │   ├── 📄 App.jsx                      ← Main routing
│   │   ├── 📁 pages\public\               ← Landing, Login, Register...
│   │   ├── 📁 pages\user\                 ← Dashboard, Notes...
│   │   ├── 📁 pages\admin\               ← Admin panel
│   │   ├── 📁 components\                 ← Navbar, Sidebar...
│   │   ├── 📁 context\                    ← Auth, Theme
│   │   └── 📁 services\                   ← API calls
│   ├── 📄 index.html
│   ├── 📄 package.json
│   └── 📄 vite.config.js
│
├── 📄 docker-compose.yml
├── 📄 README.md
└── 📄 .env.example
```

---

## ✅ Prerequisites — Install These First

| Tool | Download Link | Check Command |
|------|--------------|---------------|
| Java 21 (JDK) | https://adoptium.net | `java --version` |
| Maven 3.9+ | https://maven.apache.org | `mvn --version` |
| Node.js 18+ | https://nodejs.org | `node --version` |
| MySQL 8 | Already installed ✅ | `mysql --version` |
| Eclipse IDE | https://eclipse.org | — |

---

## 🗄️ STEP 1 — Database Setup (MySQL Workbench)

Run this in **MySQL Workbench**:

```sql
CREATE DATABASE IF NOT EXISTS smart_notes;
```

> ✅ Already done! Tables created automatically when Spring Boot starts.

---

## ⚙️ STEP 2 — Run the Backend

### Option A — Eclipse (Recommended)
```
1. Eclipse → File → Import
2. Maven → Existing Maven Projects → Next
3. Root Directory → Browse → d:\projects\akanksh project\backend
4. Click Finish
5. Wait for Maven to download dependencies...
6. Find: src/main/java/com/smartnotes/SmartNotesApplication.java
7. Right-click → Run As → Spring Boot App
```

### Option B — Command Line (CMD)
```bash
cd "d:\projects\akanksh project\backend"
mvn spring-boot:run
```

### ✅ Success Message:
```
Tomcat started on port(s): 8080
Started SmartNotesApplication in 4.2 seconds
```

---

## 🌐 STEP 3 — Run the Frontend

```bash
cd "d:\projects\akanksh project\frontend"

npm install       ← First time only

npm run dev       ← Start dev server
```

### ✅ Success Message:
```
VITE v8.1.5  ready in 862 ms
➜  Local:   http://localhost:5173/
```

---

## 🌍 STEP 4 — Open in Browser

| Page | URL |
|------|-----|
| 🏠 Home | http://localhost:5173 |
| 🔐 Login | http://localhost:5173/login |
| 📊 Dashboard | http://localhost:5173/dashboard |
| 👑 Admin Panel | http://localhost:5173/admin |
| 📖 Swagger Docs | http://localhost:8080/swagger-ui.html |
| ⚙️ API Health | http://localhost:8080/api/health |

---

## 🔐 Login Credentials

| Role | Email | Password |
|------|-------|----------|
| 👤 User | user@smartnotes.com | User@123 |
| 👑 Admin | admin@smartnotes.com | Admin@123 |

---

## 🔧 All Commands Quick Reference

```bash
# ── FRONTEND ──────────────────────────────────
cd "d:\projects\akanksh project\frontend"
npm install          # Install packages (first time)
npm run dev          # Start dev server → localhost:5173
npm run build        # Build for production

# ── BACKEND ───────────────────────────────────
cd "d:\projects\akanksh project\backend"
mvn spring-boot:run          # Run app
mvn clean package            # Build JAR
mvn test                     # Run tests
mvn clean package -DskipTests  # Build without tests

# ── MYSQL ─────────────────────────────────────
CREATE DATABASE IF NOT EXISTS smart_notes;
USE smart_notes;
SHOW TABLES;
SELECT id, name, email, role FROM users;
```

---

## ❌ Common Errors & Fixes

### ❌ MySQL not connecting
```
Fix: Check application.properties
  spring.datasource.url=jdbc:mysql://localhost:3306/smart_notes
  spring.datasource.username=root
  spring.datasource.password=root
```

### ❌ Port 8080 already in use
```bash
netstat -ano | findstr :8080
taskkill /PID XXXX /F
```

### ❌ Eclipse red errors after import
```
Right-click project → Maven → Update Project
✅ Force Update of Snapshots/Releases → OK
```

---

## 📊 Summary

| Layer | Technology | Port |
|-------|-----------|------|
| 🌐 Frontend | React 18 + Vite | **5173** |
| ⚙️ Backend | Spring Boot 3 + Java 21 | **8080** |
| 🗄️ Database | MySQL 8 | **3306** |
| 🔐 Auth | JWT Token | — |
| 📖 API Docs | Swagger UI | **8080** |




┌─────────────────────────────────────────────────────┐
│  TERMINAL 1 (Frontend)                              │
│  PS D:\projects\akanksh project>  cd frontend       │
│  PS D:\projects\akanksh project\frontend> npm run dev│
│                                                     │
│  ✅  Local: http://localhost:5173/                  │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│  TERMINAL 2 (Backend)                               │
│  PS D:\projects\akanksh project>  cd backend        │
│  PS D:\projects\akanksh project\backend> mvn spring-boot:run │
│                                                     │
│  ✅  Tomcat started on port(s): 8080                │
└─────────────────────────────────────────────────────┘