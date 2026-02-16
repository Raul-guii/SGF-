package sgf.example.sgf.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import sgf.example.sgf.entity.Role;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.repository.UserRepository;

@Profile("dev")
@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {

        return args -> {

            System.out.println("Data executando...");

            userRepository.findByEmail("admin@sgf.com")
                    .orElseGet(() -> {
                        User admin = new User();
                        admin.setName("Admin");
                        admin.setEmail("admin@sgf.com");
                        admin.setPassword(passwordEncoder.encode("12345678"));
                        admin.setRole(Role.ADMIN);
                        admin.setCpf("00000000000");
                        admin.setPhone("11999999999");

                        return userRepository.save(admin);
                    });

        };
    }
}
