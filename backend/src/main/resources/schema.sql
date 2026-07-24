-- ============================================================
-- Smart Notes Management System — Database Schema
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)        NOT NULL,
    email       VARCHAR(150)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,
    role        ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
    avatar      VARCHAR(500),
    bio         VARCHAR(500),
    is_active   BOOLEAN             NOT NULL DEFAULT TRUE,
    created_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS labels (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(80)  NOT NULL,
    color       VARCHAR(20)  NOT NULL DEFAULT '#6C63FF',
    user_id     BIGINT       NOT NULL,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY uq_label_user (name, user_id)
);

CREATE TABLE IF NOT EXISTS notes (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    content     LONGTEXT,
    label_id    BIGINT,
    user_id     BIGINT       NOT NULL,
    is_pinned   BOOLEAN      NOT NULL DEFAULT FALSE,
    is_archived BOOLEAN      NOT NULL DEFAULT FALSE,
    is_deleted  BOOLEAN      NOT NULL DEFAULT FALSE,
    is_favorite BOOLEAN      NOT NULL DEFAULT FALSE,
    color       VARCHAR(20)           DEFAULT '#FFFFFF',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id)  REFERENCES users(id)  ON DELETE CASCADE,
    FOREIGN KEY (label_id) REFERENCES labels(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS reminders (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    note_id     BIGINT       NOT NULL,
    user_id     BIGINT       NOT NULL,
    remind_at   DATETIME     NOT NULL,
    message     VARCHAR(500),
    is_sent     BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (note_id)  REFERENCES notes(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id)  REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT       NOT NULL,
    action      VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id   BIGINT,
    description VARCHAR(500),
    ip_address  VARCHAR(45),
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feedback (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id     BIGINT       NOT NULL,
    subject     VARCHAR(200) NOT NULL,
    message     TEXT         NOT NULL,
    rating      TINYINT      CHECK (rating BETWEEN 1 AND 5),
    status      ENUM('PENDING','REVIEWED','RESOLVED') NOT NULL DEFAULT 'PENDING',
    created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ── Seed Data ─────────────────────────────────────────────
INSERT IGNORE INTO users (id, name, email, password, role, bio, is_active)
VALUES
  (1, 'Admin User',   'admin@smartnotes.com',
   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- Admin@123
   'ADMIN', 'System administrator', TRUE),
  (2, 'Jane Doe',     'user@smartnotes.com',
   '$2a$10$8eKaKz1qJRh4e/KV7cHqiOp5PzFr5XzGx0TxYXLLblqDnLEGBJjzq', -- User@123
   'USER',  'I love organizing my thoughts with Smart Notes!', TRUE);

INSERT IGNORE INTO labels (id, name, color, user_id) VALUES
  (1, 'Work',     '#6C63FF', 2),
  (2, 'Personal', '#FF6584', 2),
  (3, 'Ideas',    '#43C6AC', 2),
  (4, 'Study',    '#F7971E', 2);

INSERT IGNORE INTO notes (id, title, content, label_id, user_id, is_pinned, is_favorite)
VALUES
  (1, 'Welcome to SmartNotes! 🎉',
   '# Welcome!\n\nThis is your first note. You can:\n- Create and organize notes\n- Add labels and reminders\n- Use rich text formatting\n- Pin favorites\n\nEnjoy organizing your thoughts!',
   NULL, 2, TRUE, TRUE),
  (2, 'Project Kickoff Meeting',
   '## Meeting Notes\n\n**Date:** Today\n\n### Agenda\n1. Project overview\n2. Team introductions\n3. Timeline discussion\n\n### Action Items\n- [ ] Send project brief\n- [ ] Schedule follow-up',
   1, 2, FALSE, FALSE),
  (3, 'Book Reading List',
   '## Books to Read\n\n1. Clean Code - Robert Martin\n2. The Pragmatic Programmer\n3. Design Patterns\n4. Atomic Habits\n\n> "A reader lives a thousand lives before he dies."',
   2, 2, FALSE, TRUE),
  (4, 'App Idea - Smart Habit Tracker',
   '## Concept\n\nBuild a habit tracking app that uses AI to suggest personalized habits based on user goals.\n\n### Features\n- Daily check-ins\n- Progress visualization\n- AI recommendations\n- Social challenges',
   3, 2, FALSE, FALSE);
