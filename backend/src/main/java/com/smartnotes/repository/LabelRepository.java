package com.smartnotes.repository;

import com.smartnotes.entity.Label;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabelRepository extends JpaRepository<Label, Long> {
    List<Label> findByUserId(Long userId);
    boolean existsByNameAndUserId(String name, Long userId);
}
