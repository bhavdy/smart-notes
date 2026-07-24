package com.smartnotes.repository;

import com.smartnotes.entity.Note;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Page<Note> findByUserIdAndIsDeletedFalseAndIsArchivedFalse(Long userId, Pageable pageable);

    List<Note> findByUserIdAndIsArchivedTrueAndIsDeletedFalse(Long userId);

    List<Note> findByUserIdAndIsDeletedTrue(Long userId);

    List<Note> findByUserIdAndIsFavoriteTrueAndIsDeletedFalse(Long userId);

    List<Note> findByUserIdAndIsPinnedTrueAndIsDeletedFalse(Long userId);

    Optional<Note> findByIdAndUserId(Long id, Long userId);

    @Query("SELECT n FROM Note n WHERE n.user.id = :userId AND n.isDeleted = false " +
           "AND (LOWER(n.title) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "OR LOWER(n.content) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<Note> searchNotes(@Param("userId") Long userId, @Param("q") String query);

    long countByUserIdAndIsDeletedFalse(Long userId);
    long countByUserIdAndIsArchivedTrue(Long userId);
    long countByUserIdAndIsFavoriteTrue(Long userId);
}
