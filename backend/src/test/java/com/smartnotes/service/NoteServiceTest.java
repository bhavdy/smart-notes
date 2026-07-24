package com.smartnotes.service;

import com.smartnotes.dto.*;
import com.smartnotes.entity.*;
import com.smartnotes.repository.*;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class NoteServiceTest {

    @Mock NoteRepository noteRepository;
    @Mock UserRepository userRepository;
    @Mock LabelRepository labelRepository;

    @InjectMocks NoteService noteService;

    private User testUser;

    @BeforeEach
    void setup() {
        testUser = User.builder()
                .id(1L)
                .name("Test User")
                .email("test@example.com")
                .role(User.Role.USER)
                .isActive(true)
                .build();
    }

    @Test
    void createNote_savesAndReturnsNoteResponse() {
        NoteRequest req = new NoteRequest();
        req.setTitle("My Test Note");
        req.setContent("Test content here");

        Note saved = Note.builder()
                .id(1L)
                .title("My Test Note")
                .content("Test content here")
                .user(testUser)
                .isPinned(false)
                .isArchived(false)
                .isDeleted(false)
                .isFavorite(false)
                .color("#FFFFFF")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(noteRepository.save(any(Note.class))).thenReturn(saved);

        NoteResponse resp = noteService.createNote("test@example.com", req);

        assertThat(resp).isNotNull();
        assertThat(resp.getTitle()).isEqualTo("My Test Note");
        assertThat(resp.getId()).isEqualTo(1L);
    }

    @Test
    void deleteNote_setsIsDeletedTrue() {
        Note note = Note.builder().id(1L).user(testUser).isDeleted(false).isPinned(false)
                .isArchived(false).isFavorite(false).build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(noteRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(note));
        when(noteRepository.save(any(Note.class))).thenReturn(note);

        noteService.deleteNote("test@example.com", 1L);

        assertThat(note.getIsDeleted()).isTrue();
        verify(noteRepository).save(note);
    }

    @Test
    void pinNote_togglesIsPinned() {
        Note note = Note.builder().id(1L).user(testUser).isPinned(false)
                .isDeleted(false).isArchived(false).isFavorite(false).build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(noteRepository.findByIdAndUserId(1L, 1L)).thenReturn(Optional.of(note));
        when(noteRepository.save(any(Note.class))).thenReturn(note);

        NoteResponse resp = noteService.pinNote("test@example.com", 1L);

        assertThat(note.getIsPinned()).isTrue();
    }

    @Test
    void getAllNotes_returnsPagedResults() {
        Page<Note> page = new PageImpl<>(List.of());
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(noteRepository.findByUserIdAndIsDeletedFalseAndIsArchivedFalse(
                eq(1L), any(Pageable.class))).thenReturn(page);

        Page<NoteResponse> result = noteService.getAllNotes("test@example.com", 0, 12, "updatedAt");

        assertThat(result).isNotNull();
        assertThat(result.getContent()).isEmpty();
    }
}
