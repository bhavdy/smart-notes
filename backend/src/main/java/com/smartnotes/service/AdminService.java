package com.smartnotes.service;

import com.smartnotes.entity.*;
import com.smartnotes.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final NoteRepository noteRepository;
    private final ActivityLogRepository activityLogRepository;
    private final FeedbackRepository feedbackRepository;

    public AdminService(UserRepository userRepository, NoteRepository noteRepository,
                        ActivityLogRepository activityLogRepository, FeedbackRepository feedbackRepository) {
        this.userRepository = userRepository;
        this.noteRepository = noteRepository;
        this.activityLogRepository = activityLogRepository;
        this.feedbackRepository = feedbackRepository;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new LinkedHashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalNotes", noteRepository.count());
        stats.put("activeUsers", userRepository.countByIsActive(true));
        stats.put("adminCount", userRepository.countByRole(User.Role.ADMIN));
        return stats;
    }

    public Page<User> getAllUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()));
    }

    public User toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        user.setIsActive(!user.getIsActive());
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public Page<ActivityLog> getActivityLogs(int page, int size) {
        return activityLogRepository.findAllByOrderByCreatedAtDesc(
                PageRequest.of(page, size));
    }

    public Page<Feedback> getFeedback(int page, int size) {
        return feedbackRepository.findAllByOrderByCreatedAtDesc(
                PageRequest.of(page, size));
    }
}
