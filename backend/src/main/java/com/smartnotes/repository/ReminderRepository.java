package com.smartnotes.repository;

import com.smartnotes.entity.Reminder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReminderRepository extends JpaRepository<Reminder, Long> {
    List<Reminder> findByUserIdOrderByRemindAtAsc(Long userId);
    List<Reminder> findByUserIdAndIsSentFalse(Long userId);
}
