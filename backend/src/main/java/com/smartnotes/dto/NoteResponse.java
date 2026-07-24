package com.smartnotes.dto;

import java.time.LocalDateTime;

public class NoteResponse {
    private Long id;
    private String title;
    private String content;
    private Long labelId;
    private String labelName;
    private String labelColor;
    private Boolean isPinned;
    private Boolean isArchived;
    private Boolean isDeleted;
    private Boolean isFavorite;
    private String color;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public NoteResponse() {}

    public NoteResponse(Long id, String title, String content, Long labelId, String labelName, String labelColor, Boolean isPinned, Boolean isArchived, Boolean isDeleted, Boolean isFavorite, String color, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.labelId = labelId;
        this.labelName = labelName;
        this.labelColor = labelColor;
        this.isPinned = isPinned;
        this.isArchived = isArchived;
        this.isDeleted = isDeleted;
        this.isFavorite = isFavorite;
        this.color = color;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Long getLabelId() { return labelId; }
    public void setLabelId(Long labelId) { this.labelId = labelId; }
    public String getLabelName() { return labelName; }
    public void setLabelName(String labelName) { this.labelName = labelName; }
    public String getLabelColor() { return labelColor; }
    public void setLabelColor(String labelColor) { this.labelColor = labelColor; }
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
        private Long labelId;
        private String labelName;
        private String labelColor;
        private Boolean isPinned;
        private Boolean isArchived;
        private Boolean isDeleted;
        private Boolean isFavorite;
        private String color;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;

        public Builder id(Long id) { this.id = id; return this; }
        public Builder title(String title) { this.title = title; return this; }
        public Builder content(String content) { this.content = content; return this; }
        public Builder labelId(Long labelId) { this.labelId = labelId; return this; }
        public Builder labelName(String labelName) { this.labelName = labelName; return this; }
        public Builder labelColor(String labelColor) { this.labelColor = labelColor; return this; }
        public Builder isPinned(Boolean isPinned) { this.isPinned = isPinned; return this; }
        public Builder isArchived(Boolean isArchived) { this.isArchived = isArchived; return this; }
        public Builder isDeleted(Boolean isDeleted) { this.isDeleted = isDeleted; return this; }
        public Builder isFavorite(Boolean isFavorite) { this.isFavorite = isFavorite; return this; }
        public Builder color(String color) { this.color = color; return this; }
        public Builder createdAt(LocalDateTime createdAt) { this.createdAt = createdAt; return this; }
        public Builder updatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; return this; }

        public NoteResponse build() {
            return new NoteResponse(id, title, content, labelId, labelName, labelColor, isPinned, isArchived, isDeleted, isFavorite, color, createdAt, updatedAt);
        }
    }
}
