package com.smartnotes.service;

import com.smartnotes.dto.*;
import com.smartnotes.entity.*;
import com.smartnotes.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class NoteService {

    private final NoteRepository noteRepository;
    private final UserRepository userRepository;
    private final LabelRepository labelRepository;

    public NoteService(NoteRepository noteRepository, UserRepository userRepository, LabelRepository labelRepository) {
        this.noteRepository = noteRepository;
        this.userRepository = userRepository;
        this.labelRepository = labelRepository;
    }

    public Page<NoteResponse> getAllNotes(String email, int page, int size, String sort) {
        User user = getUser(email);
        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.DESC, sort.equals("title") ? "title" : "updatedAt"));
        return noteRepository.findByUserIdAndIsDeletedFalseAndIsArchivedFalse(user.getId(), pageable)
                .map(this::toResponse);
    }

    public NoteResponse createNote(String email, NoteRequest req) {
        User user = getUser(email);
        Label label = req.getLabelId() != null
                ? labelRepository.findById(req.getLabelId()).orElse(null) : null;
        Note note = Note.builder()
                .title(req.getTitle())
                .content(req.getContent())
                .user(user)
                .label(label)
                .color(req.getColor() != null ? req.getColor() : "#FFFFFF")
                .isPinned(req.getIsPinned() != null && req.getIsPinned())
                .isFavorite(req.getIsFavorite() != null && req.getIsFavorite())
                .build();
        return toResponse(noteRepository.save(note));
    }

    public NoteResponse updateNote(String email, Long id, NoteRequest req) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setTitle(req.getTitle());
        note.setContent(req.getContent());
        if (req.getLabelId() != null) {
            note.setLabel(labelRepository.findById(req.getLabelId()).orElse(null));
        }
        if (req.getColor() != null) note.setColor(req.getColor());
        if (req.getIsPinned() != null) note.setIsPinned(req.getIsPinned());
        if (req.getIsFavorite() != null) note.setIsFavorite(req.getIsFavorite());
        return toResponse(noteRepository.save(note));
    }

    public void deleteNote(String email, Long id) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setIsDeleted(true);
        noteRepository.save(note);
    }

    public NoteResponse archiveNote(String email, Long id) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setIsArchived(!note.getIsArchived());
        return toResponse(noteRepository.save(note));
    }

    public NoteResponse pinNote(String email, Long id) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setIsPinned(!note.getIsPinned());
        return toResponse(noteRepository.save(note));
    }

    public NoteResponse favoriteNote(String email, Long id) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        note.setIsFavorite(!note.getIsFavorite());
        return toResponse(noteRepository.save(note));
    }

    public List<NoteResponse> getArchivedNotes(String email) {
        User user = getUser(email);
        return noteRepository.findByUserIdAndIsArchivedTrueAndIsDeletedFalse(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<NoteResponse> getTrashedNotes(String email) {
        User user = getUser(email);
        return noteRepository.findByUserIdAndIsDeletedTrue(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<NoteResponse> getFavoriteNotes(String email) {
        User user = getUser(email);
        return noteRepository.findByUserIdAndIsFavoriteTrueAndIsDeletedFalse(user.getId())
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<NoteResponse> searchNotes(String email, String query) {
        User user = getUser(email);
        return noteRepository.searchNotes(user.getId(), query)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public NoteResponse getNote(String email, Long id) {
        User user = getUser(email);
        Note note = noteRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Note not found"));
        return toResponse(note);
    }

    private User getUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    private NoteResponse toResponse(Note note) {
        return NoteResponse.builder()
                .id(note.getId())
                .title(note.getTitle())
                .content(note.getContent())
                .labelId(note.getLabel() != null ? note.getLabel().getId() : null)
                .labelName(note.getLabel() != null ? note.getLabel().getName() : null)
                .labelColor(note.getLabel() != null ? note.getLabel().getColor() : null)
                .isPinned(note.getIsPinned())
                .isArchived(note.getIsArchived())
                .isDeleted(note.getIsDeleted())
                .isFavorite(note.getIsFavorite())
                .color(note.getColor())
                .createdAt(note.getCreatedAt())
                .updatedAt(note.getUpdatedAt())
                .build();
    }
}
