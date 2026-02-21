package sgf.example.sgf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import sgf.example.sgf.dto.LoginDTO;
import sgf.example.sgf.dto.RegisterUserDTO;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.service.AuthService;
import sgf.example.sgf.service.UserService;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO dto) {

        String token = authService.loginUser(dto.getEmail(), dto.getPassword());

        return ResponseEntity.ok(Map.of("token", token));
    }
}
