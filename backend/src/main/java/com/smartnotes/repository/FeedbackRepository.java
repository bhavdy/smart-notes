package com.smartnotes.repository;

import com.smartnotes.entity.Feedback;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Page<Feedback> findAllByOrderByCreatedAtDesc(Pageable pageable);
}
