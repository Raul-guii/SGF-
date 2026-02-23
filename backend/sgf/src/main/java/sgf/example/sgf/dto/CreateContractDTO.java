package sgf.example.sgf.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CreateContractDTO {

    private String description;
    private BigDecimal valueMonthly;
    private Integer dueDay;
    private LocalDateTime dateStart;
    private LocalDateTime dateEnd;

    public CreateContractDTO(){}

    public CreateContractDTO(String description, BigDecimal valueMonthly, Integer dueDay, LocalDateTime dateStart, LocalDateTime dateEnd) {
        this.description = description;
        this.valueMonthly = valueMonthly;
        this.dueDay = dueDay;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
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

    public Integer getDueDay() {
        return dueDay;
    }

    public void setDueDay(Integer dueDay) {
        this.dueDay = dueDay;
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
}
