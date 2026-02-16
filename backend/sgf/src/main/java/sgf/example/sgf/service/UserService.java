package sgf.example.sgf.service;

import jakarta.validation.Valid;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sgf.example.sgf.dto.ChangePasswordDTO;
import sgf.example.sgf.dto.RegisterUserDTO;
import sgf.example.sgf.dto.UpdateUserDTO;
import sgf.example.sgf.entity.Role;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // autenticação do Spring Security
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuário não encontrado: " + email)
                );

        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().name());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singleton(authority)
        );
    }

    //(admin) deleta um User
    public void deleteUserById(Long id){

            if (!userRepository.existsById(id)){
                throw new RuntimeException("Usuário não encotrado!");
            }

            userRepository.deleteById(id);
        }

    //(admin) listar usuários
    public List<User> listUsers(){
        return userRepository.findAll();
    }

    // edita dados usuario
    public User updateUserData(String email, UpdateUserDTO dto){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuário não encontrado: " + email)
                );

        // Atualiza nome se vier preenchido
        if (dto.getName() != null && !dto.getName().isBlank()) {
            user.setName(dto.getName());
        }

        // Atualiza senha se vier preenchida
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        return userRepository.save(user);
    }

    // edita senha usuario
    public void changePassword(String email, ChangePasswordDTO dto){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Usuário não encontrado: " + email)
                );

        // verifica se a senha atual está correta
        if (!passwordEncoder.matches(dto.getCurrentPassword(), user.getPassword())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        // evita reutilizar mesma senha
        if (passwordEncoder.matches(dto.getNewPassword(), user.getPassword())) {
            throw new RuntimeException("A nova senha deve ser diferente da atual");
        }

        if (dto.getNewPassword().length() < 8) {
            throw new RuntimeException("Senha deve ter pelo menos 8 caracteres");
        }

        //criptografia da nova senha
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));

        userRepository.save(user);
    }

}