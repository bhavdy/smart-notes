package com.smartnotes.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reminders")
public class Reminder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "note_id", nullable = false)
    private Note note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "remind_at", nullable = false)
    private LocalDateTime remindAt;

    @Column(length = 500)
    private String message;

    @Column(name = "is_sent", nullable = false)
    private Boolean isSent = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Reminder() {}

    public Reminder(Long id, Note note, User user, LocalDateTime remindAt, String message, Boolean isSent, LocalDateTime createdAt) {
        this.id = id;
        this.note = note;
        this.user = user;
        this.remindAt = remindAt;
        this.message = message;
        this.isSent = isSent != null ? isSent : false;
        this.createdAt = createdAt;
    }

    @PrePersist
    protected void onCreate() { createdAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Note getNote() { return note; }
    public void setNote(Note note) { this.note = note; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public LocalDateTime getRemindAt() { return remindAt; }
    public void setRemindAt(LocalDateTime remindAt) { this.remindAt = remindAt; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public Boolean getIsSent() { return isSent; }
    public void setIsSent(Boolean isSent) { this.isSent = isSent; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private Note note;
        private User user;
        private LocalDateTime remindAt;
        private String message;
        private Boolean isSent = false;
        private LocalDateTime createdAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder note(Note note) { this.note = note; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder remindAt(LocalDateTime remindAt) { this.remindAt = remindAt; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder isSent(Boolean isSent) { if (isSent != null) this.isSent = isSent; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }

        public Reminder build() {
            return new Reminder(id, note, user, remindAt, message, isSent, createdAt);
        }
    }
}
