package sgf.example.sgf.dto;

import sgf.example.sgf.entity.ContractStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class UpdateContractDTO {

    private BigDecimal valueMonthly;

    private Integer dueDay;

    private LocalDateTime dateEnd;

    private ContractStatus contractStatus;

    private String description;

    public UpdateContractDTO(){}

    public UpdateContractDTO(BigDecimal valueMonthly, Integer dueDay, LocalDateTime dateEnd, ContractStatus contractStatus, String description) {
        this.valueMonthly = valueMonthly;
        this.dueDay = dueDay;
        this.dateEnd = dateEnd;
        this.contractStatus = contractStatus;
        this.description = description;
    }

    public BigDecimal getValueMonthly() {
        return valueMonthly;
    }

    public void setValueMonthly(BigDecimal valueMonthly) {
        this.valueMonthly = valueMonthly;
    }

    public Integer getDueDay() {
        return dueDay;
    }

    public void setDueDay(Integer dueDay) {
        this.dueDay = dueDay;
    }

    public LocalDateTime getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(LocalDateTime dateEnd) {
        this.dateEnd = dateEnd;
    }

    public ContractStatus getContractStatus() {
        return contractStatus;
    }

    public void setContractStatus(ContractStatus contractStatus) {
        this.contractStatus = contractStatus;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
