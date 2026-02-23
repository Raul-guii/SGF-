package sgf.example.sgf.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import sgf.example.sgf.dto.CreateContractDTO;
import sgf.example.sgf.dto.UpdateContractDTO;
import sgf.example.sgf.entity.Contract;
import sgf.example.sgf.entity.ContractStatus;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.repository.ContractRepository;
import sgf.example.sgf.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContractService {

    private final UserRepository userRepository;

    private final ContractRepository contractRepository;

    public ContractService(UserRepository userRepository, ContractRepository contractRepository) {
        this.userRepository = userRepository;
        this.contractRepository = contractRepository;
    }

    public Contract createContract(Long userId, CreateContractDTO dto) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Contract contract = new Contract();
        contract.setUser(user);
        contract.setDescription(dto.getDescription());
        contract.setValueMonthly(dto.getValueMonthly());
        contract.setDueDay(dto.getDueDay());
        contract.setDateStart(LocalDateTime.now());
        contract.setDateEnd(dto.getDateEnd());
        contract.setContractStatus(ContractStatus.ACTIVE);

        return contractRepository.save(contract);
    }

    public Contract updateContract(Long contractId, UpdateContractDTO dto) {

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        if (dto.getDescription() != null) {
            contract.setDescription(dto.getDescription());
        }

        if (dto.getValueMonthly() != null) {
            contract.setValueMonthly(dto.getValueMonthly());
        }

        if (dto.getDueDay() != null) {
            contract.setDueDay(dto.getDueDay());
        }

        if (dto.getDateEnd() != null) {
            contract.setDateEnd(dto.getDateEnd());
        }

        if (dto.getContractStatus() != null) {
            contract.changeStatus(dto.getContractStatus());
        }

        return contractRepository.save(contract);
    }

    public void cancelContract(Long contractId) {

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        contract.changeStatus(ContractStatus.CANCELLED);

        contractRepository.save(contract);
    }

    public Contract getById(Long id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));
    }

    public List<Contract> findAll(){
        return contractRepository.findAll();
    }

    public Contract getByIdWithValidation(Long id, UserDetails userDetails) {

        Contract contract = contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        boolean isAdmin = userDetails.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin &&
                !contract.getUser().getEmail().equals(userDetails.getUsername())) {

            throw new RuntimeException("Acesso negado");
        }

        return contract;
    }

    public void cancelContractWithValidation(Long contractId, UserDetails userDetails) {

        Contract contract = contractRepository.findById(contractId)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));

        boolean isAdmin = userDetails.getAuthorities()
                .stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isAdmin &&
                !contract.getUser().getEmail().equals(userDetails.getUsername())) {

            throw new RuntimeException("Acesso negado");
        }

        contract.changeStatus(ContractStatus.CANCELLED);
        contractRepository.save(contract);
    }


}

