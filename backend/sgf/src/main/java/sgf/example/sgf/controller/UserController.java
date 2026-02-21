package sgf.example.sgf.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sgf.example.sgf.dto.ChangePasswordDTO;
import sgf.example.sgf.dto.UpdateUserDTO;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/me")
@CrossOrigin(origins = {"*"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<User> updateUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid UpdateUserDTO dto) {

        User updated = userService.updateUserData(userDetails.getUsername(), dto);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> changePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody @Valid ChangePasswordDTO dto) {

        userService.changePassword(userDetails.getUsername(), dto);
        return ResponseEntity.noContent().build();
    }

}
