package com.smartnotes.service;

import com.smartnotes.dto.*;
import com.smartnotes.entity.User;
import com.smartnotes.repository.UserRepository;
import com.smartnotes.security.JwtUtil;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock UserRepository userRepository;
    @Mock JwtUtil jwtUtil;
    @Mock AuthenticationManager authManager;

    @InjectMocks AuthService authService;

    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    @Test
    void register_successfullyCreatesUser() {
        RegisterRequest req = new RegisterRequest();
        req.setName("Test User");
        req.setEmail("test@example.com");
        req.setPassword("Test@123");

        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenAnswer(inv -> {
            User u = inv.getArgument(0);
            u.setId(1L);
            return u;
        });
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("mock_jwt");

        // Inject PasswordEncoder via reflection
        org.springframework.test.util.ReflectionTestUtils.setField(
                authService, "passwordEncoder", encoder);

        AuthResponse resp = authService.register(req);

        assertThat(resp).isNotNull();
        assertThat(resp.getEmail()).isEqualTo("test@example.com");
        assertThat(resp.getToken()).isEqualTo("mock_jwt");
        assertThat(resp.getRole()).isEqualTo("USER");
    }

    @Test
    void register_throwsWhenEmailAlreadyExists() {
        RegisterRequest req = new RegisterRequest();
        req.setEmail("existing@example.com");
        req.setPassword("pass123");

        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        assertThatThrownBy(() -> authService.register(req))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("already registered");
    }

    @Test
    void login_returnsTokenForValidCredentials() {
        LoginRequest req = new LoginRequest();
        req.setEmail("user@example.com");
        req.setPassword("User@123");

        User user = User.builder()
                .id(1L)
                .name("User")
                .email("user@example.com")
                .password(encoder.encode("User@123"))
                .role(User.Role.USER)
                .isActive(true)
                .build();

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(jwtUtil.generateToken(anyString(), anyString())).thenReturn("login_token");
        doNothing().when(authManager).authenticate(any());

        AuthResponse resp = authService.login(req);

        assertThat(resp.getToken()).isEqualTo("login_token");
        assertThat(resp.getEmail()).isEqualTo("user@example.com");
    }
}
