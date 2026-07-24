package com.smartnotes.controller;

import com.smartnotes.dto.*;
import com.smartnotes.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<Page<NoteResponse>>> getAll(
            @AuthenticationPrincipal UserDetails user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "updatedAt") String sort) {
        return ResponseEntity.ok(ApiResponse.ok(
                noteService.getAllNotes(user.getUsername(), page, size, sort)));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<NoteResponse>> create(
            @AuthenticationPrincipal UserDetails user,
            @Valid @RequestBody NoteRequest req) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Note created", noteService.createNote(user.getUsername(), req)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<NoteResponse>> getOne(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.getNote(user.getUsername(), id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<NoteResponse>> update(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long id,
            @Valid @RequestBody NoteRequest req) {
        return ResponseEntity.ok(ApiResponse.ok("Note updated",
                noteService.updateNote(user.getUsername(), id, req)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        noteService.deleteNote(user.getUsername(), id);
        return ResponseEntity.ok(ApiResponse.ok("Note moved to trash", null));
    }

    @PatchMapping("/{id}/archive")
    public ResponseEntity<ApiResponse<NoteResponse>> archive(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.archiveNote(user.getUsername(), id)));
    }

    @PatchMapping("/{id}/pin")
    public ResponseEntity<ApiResponse<NoteResponse>> pin(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.pinNote(user.getUsername(), id)));
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<ApiResponse<NoteResponse>> favorite(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.favoriteNote(user.getUsername(), id)));
    }

    @GetMapping("/archived")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> archived(
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.getArchivedNotes(user.getUsername())));
    }

    @GetMapping("/trash")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> trash(
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.getTrashedNotes(user.getUsername())));
    }

    @GetMapping("/favorites")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> favorites(
            @AuthenticationPrincipal UserDetails user) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.getFavoriteNotes(user.getUsername())));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> search(
            @AuthenticationPrincipal UserDetails user, @RequestParam String q) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.searchNotes(user.getUsername(), q)));
    }
}
