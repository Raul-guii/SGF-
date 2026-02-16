package sgf.example.sgf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sgf.example.sgf.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);
    Optional<User> findById(Long id);
    public boolean existsByEmail(String email);
    void deleteById(Long id);
    public boolean existsByCpf(String cpf);
}
