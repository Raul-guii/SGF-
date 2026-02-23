package sgf.example.sgf.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import sgf.example.sgf.dto.CreateContractDTO;
import sgf.example.sgf.dto.UpdateContractDTO;
import sgf.example.sgf.entity.Contract;
import sgf.example.sgf.entity.User;
import sgf.example.sgf.service.ContractService;

import java.util.List;

@RestController
@RequestMapping("/contracts")
public class ContractController {

    private final ContractService contractService;

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    // Criar contrato
    @PostMapping("/user/{userId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Contract> createContract(
            @PathVariable Long userId,
            @RequestBody CreateContractDTO dto
    ) {
        Contract contract = contractService.createContract(userId, dto);
        return ResponseEntity.ok(contract);
    }

    // Atualizar contrato
    @PutMapping("/{contractId}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Contract> updateContract(
            @PathVariable Long contractId,
            @RequestBody UpdateContractDTO dto
    ) {
        Contract updated = contractService.updateContract(contractId, dto);
        return ResponseEntity.ok(updated);
    }

    // Cancelar contrato
    @PatchMapping("/{contractId}/cancel")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Void> cancelContract(@PathVariable Long contractId, @AuthenticationPrincipal UserDetails userDetails) {
        contractService.cancelContractWithValidation(contractId, userDetails);
        return ResponseEntity.noContent().build();
    }

    // Buscar por ID
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public ResponseEntity<Contract> getById(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        return ResponseEntity.ok(contractService.getByIdWithValidation(id, userDetails));
    }

    // Listar todos
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Contract>> findAll() {
        return ResponseEntity.ok(contractService.findAll());
    }
}

