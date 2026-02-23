package sgf.example.sgf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sgf.example.sgf.entity.Contract;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, Long> {

    List<Contract> findByUserId(Long user_id);
}
