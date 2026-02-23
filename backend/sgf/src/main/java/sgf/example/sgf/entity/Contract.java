package sgf.example.sgf.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "contracts")
public class Contract {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;

    private String description;

    @Column(nullable = false)
    private BigDecimal valueMonthly;

    @Column(nullable = false)
    private LocalDateTime dateStart;

    @Column(nullable = false)
    private LocalDateTime dateEnd;

    @Column(nullable = false)
    private Integer dueDay;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ContractStatus contractStatus;

    public Contract(){}

    public Contract(Long id, String description, BigDecimal valueMonthly, LocalDateTime dateStart, LocalDateTime dateEnd, Integer dueDay, User user, ContractStatus contractStatus) {
        this.id = id;
        this.description = description;
        this.valueMonthly = valueMonthly;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
        this.dueDay = dueDay;
        this.user = user;
        this.contractStatus = contractStatus;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getValueMonthly() {
        return valueMonthly;
    }

    public void setValueMonthly(BigDecimal valueMonthly) {
        this.valueMonthly = valueMonthly;
    }

    public LocalDateTime getDateStart() {
        return dateStart;
    }

    public void setDateStart(LocalDateTime dateStart) {
        this.dateStart = dateStart;
    }

    public LocalDateTime getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDateTime dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Integer getDueDay() {
        return dueDay;
    }

    public void setDueDay(Integer dueDay) {
        this.dueDay = dueDay;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public ContractStatus getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(ContractStatus contractStatus) {
        this.contractStatus = contractStatus;
    }

    public void changeStatus(ContractStatus newStatus) {

        if (this.contractStatus == ContractStatus.CANCELLED){
            throw new IllegalStateException("Contrato cancelado não pode ser alterado");
        }

        this.contractStatus = newStatus;
    }
}