package com.smartnotes.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
public class Note {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "label_id")
    private Label label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "is_pinned", nullable = false)
    private Boolean isPinned = false;

    @Column(name = "is_archived", nullable = false)
    private Boolean isArchived = false;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @Column(name = "is_favorite", nullable = false)
    private Boolean isFavorite = false;

    @Column(length = 20)
    private String color = "#FFFFFF";

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Note() {}

    public Note(Long id, String title, String content, Label label, User user, Boolean isPinned, Boolean isArchived, Boolean isDeleted, Boolean isFavorite, String color, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.label = label;
        this.user = user;
        this.isPinned = isPinned != null ? isPinned : false;
        this.isArchived = isArchived != null ? isArchived : false;
        this.isDeleted = isDeleted != null ? isDeleted : false;
        this.isFavorite = isFavorite != null ? isFavorite : false;
        this.color = color != null ? color : "#FFFFFF";
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    @PrePersist
    protected void onCreate() { createdAt = updatedAt = LocalDateTime.now(); }

    @PreUpdate
    protected void onUpdate() { updatedAt = LocalDateTime.now(); }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Label getLabel() { return label; }
    public void setLabel(Label label) { this.label = label; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public Boolean getIsPinned() { return isPinned; }
    public void setIsPinned(Boolean isPinned) { this.isPinned = isPinned; }
    public Boolean getIsArchived() { return isArchived; }
    public void setIsArchived(Boolean isArchived) { this.isArchived = isArchived; }
    public Boolean getIsDeleted() { return isDeleted; }
    public void setIsDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; }
    public Boolean getIsFavorite() { return isFavorite; }
    public void setIsFavorite(Boolean isFavorite) { this.isFavorite = isFavorite; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public static Builder builder() { return new Builder(); }

    public static class Builder {
        private Long id;
        private String title;
        private String content;
        private Label label;
        private User user;
        private Boolean isPinned = false;
        private Boolean isArchived = false;
        private Boolean isDeleted = false;
        private Boolean isFavorite = false;
        private String color = "#FFFFFF";
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder content(String content) { this.content = content; return this; }
        public Builder label(Label label) { this.label = label; return this; }
        public Builder user(User user) { this.user = user; return this; }
        public Builder isPinned(Boolean isPinned) { if (isPinned != null) this.isPinned = isPinned; return this; }
        public Builder isArchived(Boolean isArchived) { if (isArchived != null) this.isArchived = isArchived; return this; }
        public Builder isDeleted(Boolean isDeleted) { if (isDeleted != null) this.isDeleted = isDeleted; return this; }
        public Builder isFavorite(Boolean isFavorite) { if (isFavorite != null) this.isFavorite = isFavorite; return this; }
        public Builder color(String color) { if (color != null) this.color = color; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public Note build() {
            return new Note(id, title, content, label, user, isPinned, isArchived, isDeleted, isFavorite, color, createdAt, updatedAt);
        }
    }
}
