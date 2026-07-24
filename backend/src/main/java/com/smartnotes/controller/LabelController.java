package com.smartnotes.controller;

import com.smartnotes.dto.ApiResponse;
import com.smartnotes.entity.*;
import com.smartnotes.repository.LabelRepository;
import com.smartnotes.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/labels")
public class LabelController {

    private final LabelRepository labelRepository;
    private final UserRepository userRepository;

    public LabelController(LabelRepository labelRepository, UserRepository userRepository) {
        this.labelRepository = labelRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Label>>> getAll(
            @AuthenticationPrincipal UserDetails user) {
        User u = userRepository.findByEmail(user.getUsername()).orElseThrow();
        return ResponseEntity.ok(ApiResponse.ok(labelRepository.findByUserId(u.getId())));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Label>> create(
            @AuthenticationPrincipal UserDetails user,
            @RequestBody Map<String, String> body) {
        User u = userRepository.findByEmail(user.getUsername()).orElseThrow();
        Label label = Label.builder()
                .name(body.get("name"))
                .color(body.getOrDefault("color", "#6C63FF"))
                .user(u)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("Label created", labelRepository.save(label)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> delete(
            @AuthenticationPrincipal UserDetails user, @PathVariable Long id) {
        labelRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.ok("Label deleted", null));
    }
}
