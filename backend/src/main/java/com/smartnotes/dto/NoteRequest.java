package com.smartnotes.dto;

import jakarta.validation.constraints.NotBlank;

public class NoteRequest {
    @NotBlank
    private String title;
    private String content;
    private Long labelId;
    private String color;
    private Boolean isPinned;
    private Boolean isFavorite;

    public NoteRequest() {}

    public NoteRequest(String title, String content, Long labelId, String color, Boolean isPinned, Boolean isFavorite) {
        this.title = title;
        this.content = content;
        this.labelId = labelId;
        this.color = color;
        this.isPinned = isPinned;
        this.isFavorite = isFavorite;
    }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public Long getLabelId() { return labelId; }
    public void setLabelId(Long labelId) { this.labelId = labelId; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public Boolean getIsPinned() { return isPinned; }
    public void setIsPinned(Boolean isPinned) { this.isPinned = isPinned; }
    public Boolean getIsFavorite() { return isFavorite; }
    public void setIsFavorite(Boolean isFavorite) { this.isFavorite = isFavorite; }
}
