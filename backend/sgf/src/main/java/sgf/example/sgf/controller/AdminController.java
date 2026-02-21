package sgf.example.sgf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sgf.example.sgf.dto.RegisterUserDTO;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.service.AuthService;
import sgf.example.sgf.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final AuthService authService;

    private final UserService userService;

    public AdminController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterUserDTO dto) {

        authService.registerUser(dto);

        return ResponseEntity.status(201).body("User created successfully");
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(userService.listUsers());
    }
}
